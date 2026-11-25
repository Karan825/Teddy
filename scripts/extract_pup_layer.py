with open('../reference-pack/desktop/home/page.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
m = re.search(r'<div aria-hidden="true" class="pup-layer".*?</svg>\s*</div>\s*</div>\s*</div>', html, re.DOTALL)
if m:
    with open('scripts/full_pup_layer.html', 'w', encoding='utf-8') as out:
        out.write(m.group(0))
    print('Wrote full pup layer! Length:', len(m.group(0)))
else:
    print('No match with DOTALL')
