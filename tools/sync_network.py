#!/usr/bin/env python3
"""Regenerate the sibling-site blocks on every page from network-sites.json.

Usage (from the repo root):  python3 tools/sync_network.py

Marker pairs replaced in every *.html file:
  <!-- network-sites:start --> ... <!-- network-sites:end -->   footer "network of local sites" block
  <!-- areas-footer:start -->  ... <!-- areas-footer:end -->    footer "Other Areas" links (optional)
  <!-- areas-cards:start -->   ... <!-- areas-cards:end -->     homepage "Explore other areas" cards (optional)
Standard library only.
"""
import json, re, pathlib, html

root = pathlib.Path(__file__).resolve().parent.parent
cfg = json.loads((root / "network-sites.json").read_text(encoding="utf-8"))
esc = lambda s: html.escape(s, quote=True)
self_url = cfg["self"].rstrip("/")

def network():
    hub = cfg["hub"]
    items = []
    for s in cfg["sites"]:
        if s["url"].rstrip("/") == self_url:
            items.append(f'<li><span aria-current="true">{esc(s["name"])}</span></li>')
        else:
            items.append(f'<li><a href="{esc(s["url"])}">{esc(s["name"])}</a></li>')
    return ('<div class="network-sites">\n'
            f'      <p class="network-line">Part of the <a href="{esc(hub["url"])}">{esc(hub["name"])}</a> network of local sites</p>\n'
            '      <ul class="network-list">\n        ' + "\n        ".join(items) + '\n      </ul>\n    </div>')

def areas_footer():
    return "\n        ".join(f'<a href="{esc(a["url"])}">{esc(a["name"])}</a>' for a in cfg.get("areas", []))

def areas_cards():
    out = []
    for a in cfg.get("areas", []):
        out.append(f'<a href="{esc(a["url"])}" class="card area-link-card"><span class="eyebrow">{esc(a.get("eyebrow","Area guide"))}</span>'
                   f'<h3>{esc(a["name"])}</h3><p>{esc(a["blurb"])}</p><span class="area-more">Explore {esc(a["name"])} &rarr;</span></a>')
    return "\n      ".join(out)

blocks = {"network-sites": network, "areas-footer": areas_footer, "areas-cards": areas_cards}
changed = 0
for f in sorted(root.rglob("*.html")):
    if any(p in f.parts for p in (".git", "node_modules")):
        continue
    t = f.read_text(encoding="utf-8"); n = t
    for name, fn in blocks.items():
        pat = re.compile(rf'(<!-- {name}:start -->)(.*?)(<!-- {name}:end -->)', re.S)
        n = pat.sub(lambda m: f"{m.group(1)}\n    {fn()}\n    {m.group(3)}", n)
    if n != t:
        f.write_text(n, encoding="utf-8"); changed += 1
print(f"updated {changed} file(s)")
