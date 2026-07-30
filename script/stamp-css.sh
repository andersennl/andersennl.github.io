#!/bin/sh
# GitHub Pages serves everything with Cache-Control: max-age=600 and offers no way to
# change that, so a stale stylesheet can linger for ten minutes after a deploy — longer
# in Safari, which holds subresources beyond their expiry. Giving site.css a URL that
# changes with its contents sidesteps the cache entirely: new CSS, new URL, no stale hit.
#
# Run this after every change to assets/site.css, then commit the result.

set -eu
cd "$(dirname "$0")/.."

hash=$(shasum -a 256 assets/site.css | cut -c1-8)

find . -name '*.html' -not -path './.git/*' -print0 |
  xargs -0 sed -i '' "s|\(assets/site\.css\)\(?v=[a-f0-9]*\)\{0,1\}\"|\1?v=$hash\"|g"

echo "stamped site.css?v=$hash"
