import test from 'node:test';
import assert from 'node:assert/strict';
import {
  archiveSections,
  designWorks,
  getDesignCategories,
  getLooseLeafTabs,
  getResearchProject,
  filterDesignWorks,
  getSectionById,
} from '../src/data/portfolio.mjs';

test('archive sections expose the four requested anchors', () => {
  assert.deepEqual(
    archiveSections.map((section) => section.id),
    ['experience', 'research', 'design-works', 'vibe-coding'],
  );
});

test('loose-leaf tabs expose numbered section labels', () => {
  const tabs = getLooseLeafTabs(archiveSections);

  assert.deepEqual(
    tabs.map((tab) => tab.label),
    ['01 Experience', '02 Research', '03 Design Works', '04 Vibe Coding'],
  );
  assert.ok(tabs.every((tab) => tab.href.startsWith('#')));
});

test('each section includes divider copy for chapter pages', () => {
  const research = getSectionById('research');

  assert.equal(research.number, '02');
  assert.ok(research.subtitle.length > 10);
  assert.ok(research.dividerNote.length > 20);
});

test('design categories include All first and unique work categories after it', () => {
  const categories = getDesignCategories(designWorks);

  assert.equal(categories[0], 'All');
  assert.equal(new Set(categories).size, categories.length);
  assert.ok(categories.includes('Landscape Design'));
  assert.ok(categories.includes('Diagram Design'));
});

test('filterDesignWorks returns all items for All and narrows by category', () => {
  assert.equal(filterDesignWorks(designWorks, 'All').length, designWorks.length);

  const boards = filterDesignWorks(designWorks, 'Competition Board');
  assert.ok(boards.length > 0);
  assert.ok(boards.every((work) => work.category === 'Competition Board'));
});

test('getResearchProject finds expandable research detail by slug', () => {
  const project = getResearchProject('urban-microclimate');

  assert.equal(project.slug, 'urban-microclimate');
  assert.ok(project.topic.length > 20);
  assert.ok(project.question.length > 20);
  assert.ok(project.data.length > 20);
  assert.ok(project.methods.length >= 2);
  assert.ok(project.findings.length > 20);
  assert.ok(project.contribution.length > 20);
  assert.ok(project.thumbnail.endsWith('.svg'));
});
