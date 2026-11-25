from bs4 import BeautifulSoup
import os

with open('../reference-pack/desktop/home/page.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

main = soup.find('main')
sections = main.find_all('section')

os.makedirs('data/home_sections', exist_ok=True)
for i, s in enumerate(sections):
    sec_name = s.get('class', ['sec'])[1] if len(s.get('class', [])) > 1 else f'sec_{i}'
    filename = f'data/home_sections/{i}_{sec_name}.html'
    with open(filename, 'w', encoding='utf-8') as out:
        out.write(s.prettify())
    print(f'Wrote {filename} (length: {len(s.prettify())})')
