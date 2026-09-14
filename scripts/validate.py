#!/usr/bin/env python3
"""Traceability validator for the CameraMatics product brain.

Every rule below is a human judgement about what good looks like, written down
so a machine can enforce it. The machine has no view on whether a rule is worth
having; that part did not delegate. See canon C-26.

Usage:
    python3 scripts/validate.py            # check, exit 1 on failure
    python3 scripts/validate.py --write    # also regenerate docs/traceability.md
"""
from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
BRAIN = ROOT / "brain"
REG = BRAIN / "registers"

ID_RE = re.compile(r"^(A|R|M|Q|C)-\d{2,3}$|^US-\d{3}$|^ADR-\d{4}$")
LINK_RE = re.compile(r"\[\[([^\]]+)\]\]")
GWT_RE = re.compile(r"\*\*Given\*\*", re.I)
BANNED_AC = ["intuitive", "seamless", "user-friendly", "works correctly",
             "appropriate", "as needed", "easy to use"]

failures: list[str] = []
warnings: list[str] = []


def fail(rule: str, msg: str) -> None:
    failures.append(f"[{rule}] {msg}")


def warn(msg: str) -> None:
    warnings.append(f"[warn] {msg}")


def load_register(name: str, key: str) -> list[dict]:
    path = REG / f"{name}.yaml"
    if not path.exists():
        fail("C-15", f"missing register: {path.relative_to(ROOT)}")
        return []
    data = yaml.safe_load(path.read_text()) or {}
    return data.get(key, []) or []


def frontmatter(path: Path) -> tuple[dict, str]:
    text = path.read_text()
    if not text.startswith("---"):
        return {}, text
    _, fm, body = text.split("---", 2)
    try:
        return (yaml.safe_load(fm) or {}), body
    except yaml.YAMLError as exc:
        fail("schema", f"{path.relative_to(ROOT)}: unparseable frontmatter ({exc})")
        return {}, body


def main(write: bool) -> int:
    assumptions = load_register("assumptions", "assumptions")
    metrics = load_register("metrics", "metrics")
    risks = load_register("risks", "risks")
    questions = load_register("questions", "questions")

    known: dict[str, str] = {}

    # ---- C-14: IDs are permanent, unique, and correctly shaped -------------
    for label, items in (("assumption", assumptions), ("metric", metrics),
                         ("risk", risks), ("question", questions)):
        for item in items:
            iid = item.get("id", "")
            if not ID_RE.match(iid):
                fail("C-14", f"{label} has malformed id: {iid!r}")
            if iid in known:
                fail("C-14", f"duplicate id {iid} ({label} and {known[iid]})")
            known[iid] = label

    adr_files = sorted((BRAIN / "decisions").glob("ADR-*.md"))
    story_files = sorted((BRAIN / "requirements").glob("US-*.md"))
    for path in adr_files + story_files:
        fm, _ = frontmatter(path)
        iid = fm.get("id", "")
        if not ID_RE.match(str(iid)):
            fail("C-14", f"{path.name}: malformed or missing id {iid!r}")
        elif iid in known:
            fail("C-14", f"duplicate id {iid} ({path.name} and {known[iid]})")
        else:
            known[iid] = path.name

    # document ids (PRD, STACK, CANON...) are addressable too
    for path in sorted(ROOT.rglob("*.md")):
        fm, _ = frontmatter(path)
        did = fm.get("id")
        if did and did not in known:
            known[did] = path.name

    # canon rule ids are declarations, not register entries
    canon = (BRAIN / "canon.md").read_text()
    for cid in re.findall(r"\*\*(C-\d{2})\b", canon):
        known.setdefault(cid, "canon")

    # ---- C-13: outcome and behaviour metrics need a counter ---------------
    for m in metrics:
        if m.get("layer") in ("outcome", "behaviour") and not m.get("counters"):
            fail("C-13", f"{m.get('id')} is a {m.get('layer')} metric with no counter-metric")

    # ---- C-12: every risk carries a mitigation or an open question --------
    for r in risks:
        if not r.get("mitigation") and not r.get("questions"):
            fail("C-12", f"{r.get('id')} has neither mitigation nor open question")

    # ---- C-10 / C-11: requirements ----------------------------------------
    referenced: set[str] = set()
    metric_to_stories: dict[str, list[str]] = defaultdict(list)

    for path in story_files:
        fm, body = frontmatter(path)
        sid = fm.get("id", path.name)
        if not fm.get("metrics"):
            fail("C-10", f"{sid} links to no metric — a requirement that moves nothing is a preference")
        if not fm.get("phase"):
            fail("C-10", f"{sid} has no phase")
        elif fm["phase"] not in ("v1", "v1.1", "later"):
            fail("C-10", f"{sid} has unknown phase {fm['phase']!r}")
        if not GWT_RE.search(body):
            fail("C-10", f"{sid} has no Given/When/Then acceptance criterion")
        if "Out of scope for this story" not in body:
            fail("C-10", f"{sid} does not state what it excludes")

        ac_section = body.split("## Out of scope")[0].lower()
        for word in BANNED_AC:
            if word in ac_section:
                fail("C-11", f"{sid} uses untestable language in acceptance criteria: {word!r}")

        for mid in fm.get("metrics", []) or []:
            metric_to_stories[mid].append(sid)

    # ---- provenance (C-23 / C-24) -----------------------------------------
    brain_docs = [p for p in BRAIN.rglob("*.md") if p.name != "README.md"] + adr_files
    for path in sorted(set(brain_docs)):
        fm, _ = frontmatter(path)
        if not fm:
            continue
        if "adversarial_pass" not in fm and fm.get("id") not in ("CANON", "JLOG"):
            fail("C-24", f"{path.relative_to(ROOT)}: no adversarial_pass field — "
                         "an unreviewed artefact and a reviewed one are different objects")

    # ---- cross-references and links ---------------------------------------
    all_md = sorted(ROOT.rglob("*.md"))
    stems = {p.stem for p in all_md}
    stems |= {p.stem for p in ROOT.rglob("*.yaml")}
    stems |= {str(p.relative_to(BRAIN).with_suffix("")) for p in BRAIN.rglob("*.md")}
    stems |= {str(p.relative_to(BRAIN).with_suffix("")) for p in BRAIN.rglob("*.yaml")}
    stems |= {p.name for p in ROOT.rglob("*") if p.is_dir()}
    # a link may address an ADR or story by id with a path prefix
    CODE_RE = re.compile(r"`[^`]*`")

    for path in all_md:
        if "reviews/" in str(path.relative_to(ROOT)):
            continue  # a review quotes broken things on purpose
        fm, body = frontmatter(path)
        for key in ("assumptions", "metrics", "risks", "questions", "decisions"):
            for ref in fm.get(key, []) or []:
                referenced.add(ref)
                if ref not in known:
                    fail("C-15", f"{path.name}: frontmatter {key} references unknown id {ref}")
        for link in LINK_RE.findall(CODE_RE.sub("", body)):
            target = link.split("#")[0].strip().lstrip("./")
            while target.startswith("../"):
                target = target[3:]
            if not target:
                continue
            tail = target.rstrip("/").split("/")[-1]
            if ID_RE.match(tail):
                target = tail
            if ID_RE.match(target):
                referenced.add(target)
                if target not in known:
                    fail("C-15", f"{path.name}: dangling id link [[{link}]]")
            elif target in known:
                referenced.add(target)
            else:
                t = target.rstrip("/")
                if t not in stems and t.split("/")[-1] not in stems:
                    fail("C-15", f"{path.name}: dangling file link [[{link}]]")

    # registers reference each other too
    for coll in (assumptions, metrics, risks, questions):
        for item in coll:
            for key in ("assumptions", "metrics", "risks", "questions", "decisions", "counters"):
                for ref in item.get(key, []) or []:
                    referenced.add(ref)
                    if ref not in known:
                        fail("C-15", f"{item.get('id')}: references unknown id {ref}")
            blob = yaml.safe_dump(item)
            for link in LINK_RE.findall(blob):
                target = link.split("#")[0].strip()
                if ID_RE.match(target):
                    referenced.add(target)
                    if target not in known:
                        fail("C-15", f"{item.get('id')}: dangling id link [[{link}]]")

    # ---- C-15: no orphans --------------------------------------------------
    for a in assumptions:
        if a.get("id") not in referenced:
            fail("C-15", f"{a.get('id')} is an orphan — no artefact depends on it")
    for m in metrics:
        if m.get("id") not in referenced:
            fail("C-15", f"{m.get('id')} is an orphan — nothing moves it and nothing reports it")

    # ---- traceability matrix ----------------------------------------------
    if write:
        lines = ["# Traceability matrix", "",
                 "*Generated by `scripts/validate.py`. Do not edit by hand.*", "",
                 f"{len(assumptions)} assumptions · {len(metrics)} metrics · "
                 f"{len(risks)} risks · {len(questions)} open questions · "
                 f"{len(adr_files)} decisions · {len(story_files)} stories", "",
                 "## Metric → stories that move it", "",
                 "| Metric | Layer | Stories | Counter-metrics |", "|---|---|---|---|"]
        for m in metrics:
            mid = m.get("id")
            sids = ", ".join(metric_to_stories.get(mid, [])) or "—"
            counters = ", ".join(m.get("counters", []) or []) or "—"
            lines.append(f"| {mid} {m.get('name')} | {m.get('layer')} | {sids} | {counters} |")
        lines += ["", "## Story → metrics, risks, decisions, phase", "",
                  "| Story | Phase | Metrics | Risks | Decisions |", "|---|---|---|---|---|"]
        for path in story_files:
            fm, _ = frontmatter(path)
            lines.append("| {} {} | {} | {} | {} | {} |".format(
                fm.get("id"), fm.get("title", ""), fm.get("phase", ""),
                ", ".join(fm.get("metrics", []) or []) or "—",
                ", ".join(fm.get("risks", []) or []) or "—",
                ", ".join(fm.get("decisions", []) or []) or "—"))
        lines += ["", "## Risk → mitigation owner and metrics", "",
                  "| Risk | Likelihood | Impact | Owner | Metrics |", "|---|---|---|---|---|"]
        for r in risks:
            lines.append("| {} {} | {} | {} | {} | {} |".format(
                r.get("id"), r.get("title", ""), r.get("likelihood", ""),
                r.get("impact", ""), r.get("owner", "—"),
                ", ".join(r.get("metrics", []) or []) or "—"))
        (ROOT / "docs" / "traceability.md").write_text("\n".join(lines) + "\n")

    for w in warnings:
        print(w)
    if failures:
        print(f"\nFAIL — {len(failures)} violation(s):\n")
        for f in failures:
            print(" ", f)
        return 1
    print(f"OK — {len(assumptions)} assumptions, {len(metrics)} metrics, {len(risks)} risks, "
          f"{len(questions)} questions, {len(adr_files)} decisions, {len(story_files)} stories.")
    return 0


if __name__ == "__main__":
    sys.exit(main("--write" in sys.argv))
