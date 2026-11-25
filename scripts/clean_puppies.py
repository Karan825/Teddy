import json

with open('data/puppies.json', 'r', encoding='utf-8') as f:
    pups = json.load(f)

for p in pups:
    slug = p['slug'].lower()
    name = p['name'].lower()
    if 'male' in slug or 'boy' in slug or 'male' in name or 'boy' in name:
        p['gender'] = 'male'
    elif 'female' in slug or 'girl' in slug or 'female' in name or 'girl' in name:
        p['gender'] = 'female'

    # Filter media to only images that exist in public/
    valid_media = []
    for m in p['media']:
        import os
        rel_path = m['src'].lstrip('/')
        if os.path.exists(os.path.join('public', rel_path)):
            valid_media.append(m)
    p['media'] = valid_media if valid_media else p['media']

with open('data/puppies.json', 'w', encoding='utf-8') as f:
    json.dump(pups, f, indent=2)

print('Cleaned puppies data saved!')
