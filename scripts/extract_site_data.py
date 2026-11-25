import os, json, re, urllib.parse
from bs4 import BeautifulSoup

os.makedirs('data', exist_ok=True)

# Helper to normalize media URL
def clean_media_src(raw_src):
    if not raw_src:
        return ''
    if '_next/image' in raw_src:
        parsed = urllib.parse.urlparse(raw_src)
        qs = urllib.parse.parse_qs(parsed.query)
        u = qs.get('url', [''])[0]
        if u: return u
    return raw_src

# 1. EXTRACT ALL PUPPIES (Available & Detail)
print('Extracting puppies...')
puppies_dir = '../reference-pack/desktop'
puppy_slug_dirs = [d for d in os.listdir(puppies_dir) if d.startswith('puppies__')]

puppies = []
for pdir in puppy_slug_dirs:
    html_file = os.path.join(puppies_dir, pdir, 'page.html')
    if not os.path.exists(html_file):
        continue
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    slug = pdir.replace('puppies__', '')
    
    # Title / Name
    h1 = soup.find('h1')
    name = h1.text.strip() if h1 else slug
    
    # Specs
    specs = {}
    for dt in soup.find_all('dt'):
        dd = dt.find_next_sibling('dd')
        if dd:
            specs[dt.text.strip().lower()] = dd.text.strip()
            
    # Breed, Gender, Age, Origin
    breed = specs.get('breed', '')
    gender = 'male' if 'boy' in specs.get('gender', '').lower() or 'male' in specs.get('gender', '').lower() else 'female'
    age = specs.get('age', '')
    origin = 'imported' if 'imported' in specs.get('where', '').lower() else 'dubai'
    locationLabel = specs.get('where', 'In Dubai' if origin == 'dubai' else 'Imported for you')
    weight = specs.get('expected adult weight', specs.get('weight', ''))
    microchip = specs.get('microchip', specs.get('microchip status', ''))
    
    # Images in gallery
    media = []
    # find images in the main presentation
    for img in soup.find_all('img'):
        src = clean_media_src(img.get('src', ''))
        alt = img.get('alt', '')
        if src and src.startswith('/media/') and not any(m['src'] == src for m in media):
            media.append({
                'src': src,
                'alt': alt or f'{name} the {breed}',
                'kind': 'image'
            })
            
    # Check if there is a video
    # Sometimes there is a video button
    has_video = bool(soup.find(attrs={'aria-label': re.compile(r'video', re.I)}) or soup.find(text=re.compile(r'video', re.I)))

    # Description
    desc_p = soup.find('p', class_=re.compile(r'desc|intro|copy', re.I))
    desc = desc_p.text.strip() if desc_p else f'Meet {name}, a beautiful {breed} puppy looking for a loving forever home in Dubai.'
    
    puppies.append({
        'id': slug,
        'slug': slug,
        'name': name,
        'breed': breed or name,
        'gender': gender,
        'age': age or 'Ready to join you',
        'availability': 'available',
        'origin': origin,
        'locationLabel': locationLabel,
        'color': specs.get('color', ''),
        'weight': weight,
        'microchip': microchip,
        'description': desc,
        'hasVideo': has_video,
        'media': media
    })

print(f'Extracted {len(puppies)} detailed puppy profiles!')
with open('data/puppies.json', 'w', encoding='utf-8') as f:
    json.dump(puppies, f, indent=2)

# 2. EXTRACT FAQ
print('Extracting FAQ...')
with open('../reference-pack/desktop/faq/page.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

faq_items = []
# Accordion items usually have button or summary and panel
buttons = soup.find_all('button', class_=re.compile(r'tp-faq|accordion', re.I))
if not buttons:
    # search for dt/dd or h3/p or question headings
    for q_elem in soup.find_all(['h2', 'h3', 'button']):
        text = q_elem.text.strip()
        if '?' in text:
            # find answer
            sibling = q_elem.find_next(['p', 'div'])
            if sibling:
                faq_items.append({
                    'question': text,
                    'answer': sibling.text.strip()
                })
else:
    for btn in buttons:
        q = btn.text.strip()
        # answer container
        panel = btn.find_next('div')
        a = panel.text.strip() if panel else ''
        if q and a:
            faq_items.append({'question': q, 'answer': a})

print(f'Extracted {len(faq_items)} FAQ items!')
with open('data/faq.json', 'w', encoding='utf-8') as f:
    json.dump(faq_items, f, indent=2)

# 3. EXTRACT GONE HOME
print('Extracting Gone Home...')
with open('../reference-pack/desktop/gone-home/page.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

gone_home = []
for a in soup.find_all('a', class_=re.compile(r'tp-sketch|card', re.I)):
    img = a.find('img')
    src = clean_media_src(img.get('src', '')) if img else ''
    alt = img.get('alt', '') if img else ''
    title_elem = a.find(['h2', 'h3', 'strong', 'span'])
    name = title_elem.text.strip() if title_elem else ''
    meta_texts = [s.strip() for s in a.stripped_strings if s != name]
    href = a.get('href', '')
    slug = href.split('/')[-1] if href else name.lower().replace(' ', '-')
    
    gone_home.append({
        'id': slug or name.lower(),
        'name': name,
        'image': src,
        'alt': alt,
        'meta': meta_texts
    })

print(f'Extracted {len(gone_home)} gone home cards!')
with open('data/gone-home.json', 'w', encoding='utf-8') as f:
    json.dump(gone_home, f, indent=2)

# 4. EXTRACT HAPPY FAMILIES
print('Extracting Happy Families...')
with open('../reference-pack/desktop/happy-families/page.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

families = []
# Each family card
for fig in soup.find_all(['figure', 'article', 'div'], class_=re.compile(r'family|review|card|wall', re.I)):
    img = fig.find('img')
    if not img: continue
    src = clean_media_src(img.get('src', ''))
    if not src or not src.startswith('/media/'): continue
    alt = img.get('alt', '')
    quote_elem = fig.find(['blockquote', 'p', 'figcaption'])
    quote = quote_elem.text.strip() if quote_elem else alt
    author_elem = fig.find(['cite', 'span', 'strong'])
    author = author_elem.text.strip() if author_elem else ''
    has_video = bool(fig.find(attrs={'aria-label': re.compile(r'play|video', re.I)}) or '▶' in fig.text)
    
    if not any(f['image'] == src for f in families):
        families.append({
            'id': f'family-{len(families)+1}',
            'image': src,
            'alt': alt,
            'quote': quote,
            'author': author,
            'hasVideo': has_video
        })

print(f'Extracted {len(families)} happy families items!')
with open('data/families.json', 'w', encoding='utf-8') as f:
    json.dump(families, f, indent=2)
