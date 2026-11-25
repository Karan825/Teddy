from bs4 import BeautifulSoup
import json

for name in ['gone-home', 'happy-families']:
    path = f'../reference-pack/desktop/{name}/page.html'
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    main = soup.find('main')
    first_img = main.find('img')
    parent = first_img.parent
    while parent and parent.name != 'main' and len(parent.find_all('img')) <= 1:
        card = parent
        parent = parent.parent
    print(f'=== {name} CARD ===')
    print(card.prettify()[:1000])
