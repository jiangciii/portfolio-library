import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const run = (name, fn) => {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
};

const root = resolve('.');
const index = readFileSync(resolve(root, 'index.html'), 'utf8');
const styles = readFileSync(resolve(root, 'css/styles.css'), 'utf8');
const script = readFileSync(resolve(root, 'js/main.js'), 'utf8');
const bundleText = `${index}\n${styles}\n${script}`;

run('static GitHub Pages entry uses external CSS and JS', () => {
  assert.ok(index.includes('<link rel="stylesheet" href="./css/styles.css" />'));
  assert.ok(index.includes('<script src="./js/main.js"></script>'));
  assert.equal(index.includes('<script type="module" src="/src/main.jsx"></script>'), false);
  assert.equal(index.includes('<style>'), false);
});

run('deploy paths are relative and do not reference local drives', () => {
  assert.equal(/[A-Za-z]:\\/.test(bundleText), false);
  assert.equal(bundleText.includes('file://'), false);
  assert.equal(bundleText.includes('assets/AI Product Prototype'), false);
  assert.equal(bundleText.includes('assets/visual-storytelling'), false);
  assert.equal(bundleText.includes('assets/profile'), false);
});

run('referenced local image assets exist', () => {
  const assetPaths = [...bundleText.matchAll(/["'](?<path>assets\/(?:images|product|visual)\/[^"']+\.(?:jpg|jpeg|png|webp|gif|svg))["']/gi)]
    .map((match) => match.groups.path);
  assert.ok(assetPaths.length >= 14);

  for (const assetPath of new Set(assetPaths)) {
    assert.ok(existsSync(resolve(root, assetPath)), assetPath);
  }
});

run('external ChoiceCraft demo links are preserved', () => {
  for (const link of [
    'https://jiangciii.github.io/choicecraft-frontend/choicecraft/index.html#overview',
    'http://129.204.155.8/survey',
    'http://129.204.155.8/admin/dashboard',
  ]) {
    assert.ok(bundleText.includes(link), link);
  }
});

run('prototype entry links point to the correct products', () => {
  assert.ok(/title:\s*"Survey Demo"[\s\S]*?cn:\s*"情境化 CE 问卷采集系统"[\s\S]*?href:\s*"http:\/\/129\.204\.155\.8\/survey"/.test(script));
  assert.ok(/title:\s*"Design Generator"[\s\S]*?cn:\s*"D-efficient Design 在线生成工具"[\s\S]*?href:\s*"https:\/\/jiangciii\.github\.io\/choicecraft-frontend\/choicecraft\/index\.html#overview"/.test(script));
});
