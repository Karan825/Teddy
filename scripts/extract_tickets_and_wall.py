from bs4 import BeautifulSoup
import json, urllib.parse

def clean_media_src(raw_src):
    if not raw_src: return ''
    if '_next/image' in raw_src:
        parsed = urllib.parse.urlparse(raw_src)
        qs = urllib.parse.parse_qs(parsed.query)
        u = qs.get('url', [''])[0]
        if u: return u
    return raw_src

# 1. Gone Home
with open('../reference-pack/desktop/gone-home/page.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

gone_home = []
for li in soup.find_all('li', class_=lambda c: c and 'tp-ticket' in c):
    a = li.find('a')
    href = a.get('href', '') if a else ''
    img = li.find('img')
    src = clean_media_src(img.get('src', '')) if img else ''
    alt = img.get('alt', '') if img else ''
    style = li.get('style', '')
    
    # Extract text content
    text_content = [s.strip() for s in li.stripped_strings]
    # typically: [name, breed, etc.]
    gone_home.append({
        'href': href,
        'image': src,
        'alt': alt,
        'style': style,
        'texts': text_content
    })

print(f'Extracted {len(gone_home)} gone home tickets!')
with open('data/gone_home.json', 'w', encoding='utf-8') as f:
    json.dump(gone_home, f, indent=2)

# 2. Happy Families
with open('../reference-pack/desktop/happy-families/page.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

families = []
for li in soup.find_all('li', class_=lambda c: c and 'tp-wall__item' in c):
    img = li.find('img')
    src = clean_media_src(img.get('src', '')) if img else ''
    alt = img.get('alt', '') if img else ''
    polaroid = li.find(class_=lambda c: c and 'tp-polaroid' in c)
    style = polaroid.get('style', '') if polaroid else ''
    btn = li.find('button')
    aria_label = btn.get('aria-label', '') if btn else ''
    texts = [s.strip() for s in li.stripped_strings]
    
    families.append({
        'image': src,
        'alt': alt,
        'style': style,
        'aria_label': aria_label,
        'texts': texts
    })

print(f'Extracted {len(families)} happy families polaroids!')
with open('data/families.json', 'w', encoding='utf-8') as f:
    json.dump(families, f, indent=2)
