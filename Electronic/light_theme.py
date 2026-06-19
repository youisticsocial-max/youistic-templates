import re

with open('e:/Client Projects/Electronic/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Variables
css = css.replace('--primary-color: #00e5ff;', '--primary-color: #0088cc;')
css = css.replace('--bg-dark: #07090e;', '--bg-dark: #f8f9fa;')
css = css.replace('--bg-card: rgba(20, 24, 34, 0.6);', '--bg-card: #ffffff;')
css = css.replace('--bg-card-hover: rgba(30, 35, 50, 0.8);', '--bg-card-hover: #ffffff;')
css = css.replace('--text-main: #ffffff;', '--text-main: #111827;')
css = css.replace('--text-muted: #a0aec0;', '--text-muted: #4b5563;')
css = css.replace('--border-color: rgba(255, 255, 255, 0.08);', '--border-color: rgba(0, 0, 0, 0.08);')

css = css.replace('body.dark-theme', 'body.light-theme')
css = css.replace('linear-gradient(135deg, #fff 0%,', 'linear-gradient(135deg, #111827 0%,')
css = css.replace('border: 1px solid rgba(255,255,255,0.2);', 'border: 1px solid rgba(0,0,0,0.2);')
css = css.replace('background: rgba(7, 9, 14, 0.85);', 'background: rgba(255, 255, 255, 0.95);')
css = css.replace('background: rgba(10, 12, 20, 0.98);', 'background: rgba(255, 255, 255, 0.98);')
css = css.replace('border-bottom: 1px solid rgba(255,255,255,0.05);', 'border-bottom: 1px solid rgba(0,0,0,0.05);')

css = css.replace('linear-gradient(135deg, rgba(7,9,14,0.9) 0%, rgba(7,9,14,0.6) 100%);', 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%);')
css = css.replace('radial-gradient(circle at center, rgba(7,9,14,0.5) 0%, rgba(7,9,14,1) 100%);', 'radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,1) 100%);')

css = css.replace('color: rgba(255,255,255,0.5);', 'color: rgba(0,0,0,0.5);')
css = css.replace('border: 2px solid rgba(255,255,255,0.5);', 'border: 2px solid rgba(0,0,0,0.5);')

css = css.replace('background: rgba(255,255,255,0.01);', 'background: rgba(0,0,0,0.02);')
css = css.replace('color: rgba(255,255,255,0.2);', 'color: rgba(0,0,0,0.2);')
css = css.replace('color: #fff;\n    text-shadow: 0 0 15px rgba(255,255,255,0.3);', 'color: var(--primary-color);\n    text-shadow: none;')

css = css.replace('linear-gradient(to right, rgba(20,24,34,0.9), rgba(20,24,34,0.4))', '#ffffff')
css = css.replace('border: 1px solid rgba(255,255,255,0.05);', 'border: 1px solid rgba(0,0,0,0.05);')

css = css.replace('linear-gradient(145deg, #10131d, #0b0d14)', '#ffffff')

css = css.replace('linear-gradient(90deg, rgba(7,9,14,1) 0%, rgba(7,9,14,0.4) 50%, rgba(7,9,14,1) 100%);', 'linear-gradient(90deg, rgba(248,249,250,1) 0%, rgba(248,249,250,0.4) 50%, rgba(248,249,250,1) 100%);')
css = css.replace('background: rgba(20,24,34,0.5);', 'background: #ffffff;')

css = css.replace('background: rgba(10,12,20,0.9);', 'background: #ffffff;')

with open('e:/Client Projects/Electronic/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Light theme CSS replaced")
