from bs4 import BeautifulSoup
import json

with open('../reference-pack/desktop/home/page.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

main = soup.find('main')
print('Main tag found!')
sections = main.find_all('section')
print(f'Total sections: {len(sections)}')

section_data = []
for i, s in enumerate(sections):
    sec_id = s.get('id', '')
    sec_class = s.get('class', [])
    data_sec = s.get('data-section', '')
    headings = [h.text.strip() for h in s.find_all(['h1', 'h2', 'h3'])]
    stops = s.find_all(attrs={'data-pup-stop': True})
    stop_info = [{
        'class': st.get('class'),
        'pose': st.get('data-pose'),
        'act': st.get('data-act'),
        'facing': st.get('data-facing'),
        'behind': st.get('data-behind'),
        'lane': st.get('data-lane')
    } for st in stops]
    
    print(f'[{i}] id={sec_id} data-sec={data_sec} class={sec_class} headings={headings}')
    print(f'    stops={stop_info}')
    section_data.append({
        'index': i,
        'id': sec_id,
        'dataSection': data_sec,
        'classes': sec_class,
        'headings': headings,
        'stops': stop_info
    })

with open('data/home_sections.json', 'w', encoding='utf-8') as f:
    json.dump(section_data, f, indent=2)
