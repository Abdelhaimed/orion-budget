const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'orion-life.css'), 'utf8');

test('home is an app hub with focused module launchers', () => {
  assert.match(html, /id="hub" class="app-hub"/);
  for (const module of ['dashboard', 'gym', 'shopping', 'tasks', 'reports']) {
    assert.match(html, new RegExp(`data-open-tab="${module}"`));
  }
  assert.match(html, /\['hub','dashboard','transactions','weeks','goals','settings','gym','shopping','tasks','reports'\]/);
});

test('mobile navigation uses an accessible hamburger drawer', () => {
  assert.match(html, /id="menuToggle" aria-label="Open navigation" aria-expanded="false"/);
  assert.match(html, /id="navBackdrop"/);
  assert.match(html, /id="navClose" aria-label="Close navigation"/);
  assert.match(css, /\.nav\.open\{transform:translateX\(0\)\}/);
  assert.match(css, /@media\(max-width:700px\)/);
});

test('finance controls are hidden outside finance modules', () => {
  assert.match(html, /id="financeTopbar"/);
  assert.match(html, /\['dashboard','transactions','weeks','goals','settings'\]\.includes\(name\)/);
});
