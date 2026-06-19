import re
with open('e:/Client Projects/Electronic/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r' onerror="[^"]*"', '', text)

with open('e:/Client Projects/Electronic/index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Stripped inline onerror")
