import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('loose-leaf-portfolio.html', 'utf8');

const run = (name, fn) => {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
};

run('portfolio uses fullscreen flip-book structure', () => {
  assert.ok(html.includes('class="desk"'));
  assert.ok(html.includes('class="binder"'));
  assert.ok(html.includes('class="spread"'));
  assert.ok(html.includes('id="flipStage"'));
  assert.ok(html.includes('class="center-fold"'));
});

run('chapter tabs and left index switch sections', () => {
  assert.ok(html.includes('class="page-tabs"'));
  assert.ok(html.includes('id="leftIndex"'));
  assert.ok(html.includes('data-section="experience"'));
  assert.ok(html.includes('data-section="research"'));
  assert.ok(html.includes('data-section="design"'));
  assert.ok(html.includes('data-section="vibe"'));
});

run('each chapter has cover and inner pages', () => {
  for (const id of ['experienceTpl', 'researchTpl', 'designTpl', 'vibeTpl']) {
    assert.ok(html.includes(`id="${id}"`));
  }
  assert.ok((html.match(/class="inner-page chapter-cover/g) ?? []).length >= 4);
  assert.ok((html.match(/class="inner-page/g) ?? []).length >= 10);
  assert.ok(html.includes('data-inner-action="next"'));
});

run('sections use varied portfolio page layouts', () => {
  for (const className of [
    'timeline-page',
    'research-grid-page',
    'image-insert-page',
    'diagram-board-page',
    'prototype-grid-page',
    'product-map-page',
  ]) {
    assert.ok(html.includes(className));
  }
});

run('design works contain real image inserts and preview modal', () => {
  assert.ok((html.match(/class="work-photo/g) ?? []).length >= 4);
  assert.ok(html.includes('public/works/seasonal-park-board.svg'));
  assert.ok(html.includes('public/works/waterfront-landscape-plan.svg'));
  assert.ok(html.includes('id="previewModal"'));
  assert.ok(html.includes('openPreview'));
});

run('flip animation is paper-like and not scroll-only', () => {
  assert.ok(html.includes('rotateY'));
  assert.ok(html.includes('sheet.leaving'));
  assert.ok(html.includes('sheet.next'));
  assert.ok(html.includes('body {'));
  assert.ok(html.includes('overflow: hidden'));
});
