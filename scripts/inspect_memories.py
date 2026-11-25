from bs4 import BeautifulSoup

for name in ['gone-home', 'happy-families']:
    path = f'../reference-pack/desktop/{name}/page.html'
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    main = soup.find('main')
    print(f'=== {name} ===')
    if main:
        print('Direct children:', [c.name for c in main.children if c.name])
        # Find all cards or images
        imgs = main.find_all('img')
        print(f'Total images in {name}: {len(imgs)}')
        for img in imgs[:5]:
            print('  img:', img.get('src'), 'alt:', img.get('alt'))
