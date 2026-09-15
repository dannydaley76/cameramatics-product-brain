#!/usr/bin/env python3
"""pptxgenjs writes u="sng" on every hyperlink run. On the story map slide that
is 48 underlined runs and it reads as noise, so strip the underline from the
card runs while leaving real inline links (the caption) underlined."""
import re, shutil, sys, zipfile

KEEP_UNDERLINED = ("Open the live story map",)

def fix(xml: str) -> tuple[str, int]:
    n = 0
    def run(m):
        nonlocal n
        block = m.group(0)
        if 'hlinkClick' not in block or 'u="sng"' not in block:
            return block
        text = re.search(r'<a:t>(.*?)</a:t>', block, re.S)
        if text and text.group(1).strip() in KEEP_UNDERLINED:
            return block
        n += 1
        return block.replace(' u="sng"', '', 1)
    return re.sub(r'<a:r>.*?</a:r>', run, xml, flags=re.S), n

def main(path, slide):
    tmp = path + ".tmp"
    total = 0
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == f"ppt/slides/slide{slide}.xml":
                out, total = fix(data.decode("utf-8"))
                data = out.encode("utf-8")
            zout.writestr(item, data)
    shutil.move(tmp, path)
    print(f"delink: {total} card links un-underlined on slide {slide}")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
