from bs4 import BeautifulSoup
import re

for name in ['gone-home', 'happy-families', 'how-it-works', 'puppies']:
    path = f'../reference-pack/desktop/{name}/page.html'
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    main = soup.find('main')
    print(f'=== {name} ===')
    if main:
        sections = main.find_all('section')
        print(f'Sections in {name}: {len(sections)}')
        for s in sections[:4]:
            print(' - section:', s.get('class'), s.get('id'), [h.text.strip() for h in s.find_all(['h1', 'h2', 'h3'])])
    else:
        print('No main tag found!')
