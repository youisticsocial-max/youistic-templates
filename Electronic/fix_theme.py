import re

with open('e:/Client Projects/Electronic/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Primary Colors
css = css.replace('--primary-color: #0088cc;', '--primary-color: #2563eb;')
css = css.replace('--primary-rgb: 0, 168, 204;', '--primary-rgb: 37, 99, 235;')

# 2. Fix buttons
css = re.sub(r'\.btn-primary\s*\{[^}]+\}', '.btn-primary { background: #111827; color: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }', css)
css = re.sub(r'\.btn-primary:hover\s*\{[^}]+\}', '.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); background: #000; }', css)
css = re.sub(r'\.btn-outline\s*\{[^}]+\}', '.btn-outline { background: transparent; border: 1px solid rgba(0,0,0,0.2); color: #111827; }', css)
css = re.sub(r'\.btn-outline:hover\s*\{[^}]+\}', '.btn-outline:hover { border-color: #111827; background: rgba(0,0,0,0.03); transform: translateY(-3px); }', css)

# 3. Hero Overlays & Content
css = re.sub(r'\.hero-overlay\s*\{[^}]+\}', '.hero-overlay { display: none; }', css)
css = re.sub(r'\.gradient-lights\s*\{[^}]+\}', '.gradient-lights { display: none; }', css)
css = re.sub(r'\.hero-content\s*\{[^}]+\}', '.hero-content { position: relative; z-index: 2; max-width: 700px; padding: 50px; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.5); }', css)
css = re.sub(r'\.hero-title\s*\{[^}]+\}', '.hero-title { font-size: 4.5rem; margin-bottom: 20px; letter-spacing: -1px; color: #111827; }', css)
css = re.sub(r'\.text-gradient\s*\{[^}]+\}', '.text-gradient { color: var(--primary-color); -webkit-text-fill-color: initial; background: none; }', css)

# 4. Carousel Buttons
css = re.sub(r'\.carousel-btn\s*\{[^}]+\}', '.carousel-btn { width: 50px; height: 50px; border-radius: 50%; background: #fff; border: 1px solid rgba(0,0,0,0.1); color: #111827; font-size: 1.2rem; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: var(--transition); flex-shrink: 0; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }', css)
css = re.sub(r'\.carousel-btn:hover\s*\{[^}]+\}', '.carousel-btn:hover { background: #111827; color: #fff; }', css)

# 5. Smart Home Section
css = re.sub(r'\.overlay-gradient\s*\{[^}]+\}', '.overlay-gradient { display: none; }', css)
css = re.sub(r'\.smart-home-content\s*\{[^}]+\}', '.smart-home-content { max-width: 500px; background: rgba(255,255,255,0.9); backdrop-filter: blur(20px); padding: 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.5); }', css)

# 6. Cards styling
css = css.replace('border-color: rgba(var(--primary-rgb), 0.4);', 'border-color: rgba(0,0,0,0.15);')
css = css.replace('box-shadow: 0 20px 40px rgba(0,0,0,0.5);', 'box-shadow: 0 20px 40px rgba(0,0,0,0.08);')
css = css.replace('box-shadow: 0 15px 30px rgba(0,0,0,0.4);', 'box-shadow: 0 15px 30px rgba(0,0,0,0.08);')

with open('e:/Client Projects/Electronic/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS Refined!")
