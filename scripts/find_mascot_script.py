import zipfile

with zipfile.ZipFile('../reference-pack/traces/desktop.zip', 'r') as z:
    for name in z.namelist():
        if name.startswith('resources/') and not name.endswith(('.html', '.css', '.png', '.jpg', '.webp', '.woff2')):
            try:
                data = z.open(name).read().decode('utf-8', errors='ignore')
                if 'data-pose' in data or 'peekaboo' in data or 'PupJourney' in data or 'paw-pat' in data:
                    print(f'Match in {name}: size {len(data)}')
                    with open('scripts/mascot_logic.js', 'w', encoding='utf-8') as out:
                        out.write(data)
            except:
                pass
