import re

with open('../reference-pack/desktop/home/page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Look for pup-actor or svg with data-p
match = re.search(r'<div[^>]*class="[^"]*pup-actor[^"]*"[^>]*>.*?</svg>\s*</span>\s*</div>', html, re.DOTALL)
if match:
    print('Found pup-actor block! Length:', len(match.group(0)))
    with open('scripts/pup_actor.html', 'w', encoding='utf-8') as out:
        out.write(match.group(0))
else:
    # search for data-p="head" or similar
    match2 = re.search(r'<svg[^>]*data-p="pup"[^>]*>.*?</svg>', html, re.DOTALL)
    if match2:
        print('Found pup svg! Length:', len(match2.group(0)))
        with open('scripts/pup_svg.html', 'w', encoding='utf-8') as out:
            out.write(match2.group(0))
    else:
        # Search for any svg with viewBox="0 0 300 240"
        match3 = re.search(r'<svg[^>]*viewBox="0 0 300 240"[^>]*>.*?</svg>', html, re.DOTALL)
        if match3:
            print('Found 300x240 svg! Length:', len(match3.group(0)))
            with open('scripts/pup_svg_300.html', 'w', encoding='utf-8') as out:
                out.write(match3.group(0))
        else:
            print('Could not find pup svg directly, let us search for "pup-" occurrences')
            for m in re.finditer(r'class="[^"]*pup-[^"]*"', html):
                print(m.group(0)[:100])
