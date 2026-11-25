with open('../reference-pack/desktop/home/page.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re

actors = [m.start() for m in re.finditer(r'pup-actor', html)]
print('Pup actor occurrences:', len(actors))
for i, pos in enumerate(actors):
    snippet = html[max(0, pos-200):min(len(html), pos+1500)]
    print(f'=== Occurrence {i} ===')
    print(snippet[:500])
    with open(f'scripts/actor_{i}.html', 'w', encoding='utf-8') as out:
        out.write(snippet)
