import zipfile

with zipfile.ZipFile('../reference-pack/traces/desktop.zip', 'r') as z:
    res_files = [n for n in z.namelist() if n.startswith('resources/')]
    print(f'Scanning {len(res_files)} resource files...')
    found = []
    for rf in res_files:
        try:
            content = z.open(rf).read().decode('utf-8', errors='ignore')
            if 'pup-actor' in content or 'data-pup-stop' in content:
                print(f'Found match in {rf} (length: {len(content)})')
                found.append((rf, content))
        except:
            pass

    for i, (rf, content) in enumerate(found):
        with open(f'scripts/mascot_match_{i}.txt', 'w', encoding='utf-8') as out:
            out.write(content)
        print(f'Wrote scripts/mascot_match_{i}.txt')
