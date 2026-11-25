from bs4 import BeautifulSoup
import os

os.makedirs('data/pages', exist_ok=True)

pages = [
    ('puppies', 'puppies'),
    ('how-it-works', 'how-it-works'),
    ('faq', 'faq'),
    ('contact', 'contact'),
    ('gone-home', 'gone-home'),
    ('happy-families', 'happy-families'),
    ('puppy-detail', 'puppies__maltipoo-max-male')
]

for out_name, folder in pages:
    path = f'../reference-pack/desktop/{folder}/page.html'
    if not os.path.exists(path):
        print(f'Missing {path}')
        continue
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    main = soup.find('main')
    if main:
        out_path = f'data/pages/{out_name}.html'
        with open(out_path, 'w', encoding='utf-8') as out:
            out.write(main.prettify())
        print(f'Wrote {out_path} (length: {len(main.prettify())})')
