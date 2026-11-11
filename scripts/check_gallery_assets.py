#!/usr/bin/env python3
"""Fail when tracked site source references a missing local gallery asset."""

import re
import subprocess
import sys
from html import unescape
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SOURCE_TYPES = {".html", ".css", ".js", ".json", ".svg", ".xml"}
LOCAL_HOSTS = {"228mooreelectric.com", "www.228mooreelectric.com", "dvnmr.github.io"}
REFERENCE = re.compile(
    r'''(?:(?:https?:)?//[^/\s"'<>]+/|(?:\.\.?/)*|/)assets/gallery/[^\s"'<>),;]+'''
)


def main():
    files = subprocess.check_output(
        ["git", "ls-files", "-z"], cwd=ROOT
    ).decode().split("\0")
    checked = 0
    failures = []
    for name in files:
        source = ROOT / name
        if source.suffix not in SOURCE_TYPES or not source.is_file():
            continue
        for line_number, line in enumerate(source.read_text(encoding="utf-8").splitlines(), 1):
            for match in REFERENCE.finditer(line):
                url = urlsplit(unescape(match.group()))
                if url.netloc and url.hostname not in LOCAL_HOSTS:
                    continue
                path = unquote(url.path)
                target = (ROOT / path.lstrip("/")) if path.startswith("/") else source.parent / path
                checked += 1
                if not target.is_file():
                    failures.append(f"{name}:{line_number}: missing {match.group()}")
    for failure in failures:
        print(failure, file=sys.stderr)
    print(f"Checked {checked} gallery references; {len(failures)} missing.")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
