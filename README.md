# elizabethvijan-website

Plain HTML/CSS/JS site for elizabethvijan.com (GitHub Pages, see `CNAME`).

## Network of local sites

The footer "Part of the Elizabeth Vijan network of local sites" block is generated from `network-sites.json`. To add a new branded local-area site:

1. Add `{ "name": "...", "url": "https://newsite.com/" }` to `sites` in `network-sites.json`.
2. Run `python3 tools/sync_network.py` (standard library only). It rewrites the block between the `<!-- network-sites:start -->` / `<!-- network-sites:end -->` markers on every page.
3. Add a link to the new site where it fits (the Communities nav dropdown and footer column, plus any in-content mentions of that area), and add the same entry to the new site's own `network-sites.json`.

Links between sites are plain followed links (no `nofollow`).
