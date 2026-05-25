import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const htmlPath = process.env.PORTFOLIO_HTML ?? 'index.html';
const entryHtml = readFileSync(htmlPath, 'utf8');
const entryDir = dirname(resolve(htmlPath));

function readLinkedAsset(matchPattern) {
  const match = entryHtml.match(matchPattern);
  if (!match) return '';
  const assetPath = resolve(entryDir, match.groups.path.replace(/^\.\//, ''));
  return existsSync(assetPath) ? readFileSync(assetPath, 'utf8') : '';
}

const html = [
  entryHtml,
  readLinkedAsset(/<link[^>]+href="(?<path>\.\/css\/styles\.css)"[^>]*>/),
  readLinkedAsset(/<script[^>]+src="(?<path>\.\/js\/main\.js)"[^>]*><\/script>/),
].join('\n');


const run = (name, fn) => {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
};

run('keeps the existing library hero and book controls', () => {
  for (const marker of [
    'class="hero"',
    'class="topbar"',
    'id="chapterPanel"',
    'class="books-wrap"',
    'id="books"',
    'class="shelf"',
    'function renderBooks()',
    'function setActive(index, options = {})',
  ]) {
    assert.ok(html.includes(marker), marker);
  }
});

run('book selection persists when scrolling back to the shelf', () => {
  for (const marker of [
    'let selectedBookIndex = 0;',
    'book.classList.toggle("active", Number(book.dataset.index) === selectedBookIndex);',
    'selectedBookIndex = index;',
    'activeIndex = nextIndex;',
    'renderChapter();',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  const scrollSpyBlock = html.match(/function syncActiveChapterFromScroll\(\)\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  assert.equal(scrollSpyBlock.includes('selectedBookIndex = nextIndex'), false, 'scroll spy should not overwrite the clicked book on the shelf');
});

run('cover hero separates text and shelf without overlap', () => {
  for (const marker of [
    'class="hero-content cover-hero"',
    'class="chapter-panel cover-panel cover-text"',
    'cover-shelf',
    '.cover-text',
    'margin-bottom: clamp(48px, 5.5vh, 72px);',
    '.cover-shelf',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  const coverPanelBlock = html.match(/\.cover-panel\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const booksWrapBlock = html.match(/\.books-wrap\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const compactHeightBlock = html.match(/@media \(max-height: 820px\)\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(coverPanelBlock.includes('transform: none;'), 'cover text should not be pulled into the shelf area');
  assert.equal(booksWrapBlock.includes('margin: -'), false, 'book shelf wrapper should not use negative margin to push upward');
  assert.ok(booksWrapBlock.includes('padding: 64px 18px 0;'), 'book shelf wrapper should reserve local reveal space');
  assert.ok(compactHeightBlock.includes('.cover-title-main'), 'short screens should use a compact cover title scale');
  assert.ok(compactHeightBlock.includes('margin-bottom: 48px;'), 'short screens should keep a clear 48px text-to-shelf gap');
});

run('cover positioning tagline lives in the topbar row', () => {
  for (const marker of [
    'class="topbar-eyebrow"',
    '.topbar-eyebrow',
    'grid-template-columns: minmax(150px, max-content) minmax(0, 1fr) max-content;',
    'justify-self: center;',
    'white-space: nowrap;',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  assert.equal(html.includes('class="eyebrow"'), false, 'cover tagline should no longer sit inside the hero text block');
  assert.ok(html.indexOf('class="topbar-eyebrow"') < html.indexOf('<nav class="number-nav"'), 'cover tagline should sit between brand and number nav');
  assert.ok(html.indexOf('class="topbar-eyebrow"') < html.indexOf('<div class="hero-content cover-hero">'), 'cover tagline should be above the cover text area');
});

run('active book cover has enough vertical reveal space', () => {
  const booksWrapBlock = html.match(/\.books-wrap\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  assert.ok(booksWrapBlock.includes('position: relative;'), 'book shelf wrapper should create a stable layer');
  assert.ok(booksWrapBlock.includes('z-index: 2;'), 'book shelf wrapper should sit above nearby cover copy');
  assert.ok(booksWrapBlock.includes('padding: 64px 18px 0;'), 'book shelf wrapper should reserve top space for the active cover');
  assert.ok(booksWrapBlock.includes('margin: 0 auto;'), 'book shelf should start below the cover text instead of pushing upward');
});

run('hero is a fixed portfolio cover, not the selected chapter title', () => {
  for (const marker of [
    'Portfolio Library',
    'A loose-leaf portfolio of research, AI product prototypes, data analysis and visual storytelling.',
    '一本关于空间研究、AI 产品原型、数据分析与视觉表达的个人作品集。',
    'id="coverTitle"',
    'id="coverDesc"',
    'id="coverDescCn"',
    'class="chapter-title cover-title-main"',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  assert.equal(html.includes('chapterTitle.textContent = chapter.title'), false);
  assert.equal(html.includes('chapterCn.textContent = chapter.cn'), false);
  assert.equal(html.includes('id="selectedChapterCard"'), false);
  assert.equal(html.includes('Choose a book from the shelf'), false);
  assert.equal(html.includes('<span>Cover</span>'), false);
  assert.equal(html.includes('高熙雯的个人作品集'), false);
  assert.equal(html.includes('id="coverCn"'), false);
  assert.ok(html.includes('white-space: nowrap;'), 'cover title should stay on one line');
  assert.ok(html.includes('text-transform: none;'), 'cover title should keep Portfolio Library casing');
});

run('defines the requested five portfolio-library chapters', () => {
  for (const label of [
    'Personal Background',
    '个人背景',
    'Internship Experience',
    '实习经历',
    'AI Product Prototype',
    'AI 原型搭建',
    'Data Analysis',
    '数据分析能力',
    'Visual Storytelling',
    '可视化与叙事表达',
  ]) {
    assert.ok(html.includes(label), label);
  }
});

run('renders all five chapter detail spreads below the cover', () => {
  for (const marker of [
    'id="detailsList"',
    'function renderAllDetails',
    'chapter-section',
    'id="chapter-${chapter.no}"',
    'class="detail-module"',
    'function renderDetailModule',
    'chapter.detailType',
    'class="open-book"',
    'class="page-left"',
    'class="page-right"',
  ]) {
    assert.ok(html.includes(marker), marker);
  }
});

run('personal background chapter uses the three-column profile layout', () => {
  for (const marker of [
    'chapter-section--profile',
    'personal-background-layout',
    'portrait-panel',
    'profile-summary-card',
    'profile-info-stack',
    'Research & Data-driven Spatial Product Practitioner',
    '研究与数据驱动的<br>空间产品实践者',
    '南京农业大学风景园林硕士在读，获一等奖学金，专业排名前5%。',
    'object-position: center center;',
    'align-content: center;',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  const portraitPanelBlock = html.match(/\.portrait-panel\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const portraitFrameBlock = html.match(/\.portrait-frame\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(portraitPanelBlock.includes('linear-gradient(145deg, rgba(238,244,241,.68), rgba(255,255,250,.54) 48%, rgba(232,200,111,.10));'), 'portrait panel should keep the previous soft paper gradient');
  assert.ok(portraitPanelBlock.includes('radial-gradient(circle at 22% 12%, rgba(134,169,207,.12), transparent 36%)'), 'portrait panel should echo the blue-gray atmosphere');
  assert.ok(portraitFrameBlock.includes('linear-gradient(180deg, rgba(238,244,241,.72), rgba(250,250,246,.48))'), 'portrait frame should avoid a hard white patch behind the photo');
  assert.ok(portraitFrameBlock.includes('box-shadow: inset 0 0 0 1px rgba(255,255,255,.45), 0 14px 28px rgba(38,54,55,.05);'), 'portrait frame should keep a soft embedded paper feel');

  for (const removed of [
    'Research-driven AI Product Candidate',
    '研究驱动的 AI 产品候选人',
    '这里可替换为一张偏职业或生活氛围的半身照，用来形成可信、亲近的页面开场。',
    '<p>这里可替换为一张偏职业或生活氛围的半身照，用来形成可信、亲近的页面开场。</p>',
  ]) {
    assert.equal(html.includes(removed), false, removed);
  }
  assert.ok(html.includes('function personalBackgroundHTML'));
});

run('internship experience chapter uses aligned split experience cards only', () => {
  for (const marker of [
    'function internshipExperienceHTML',
    'chapter-section--internship',
    'internship-card-list',
    'internship-card',
    'internship-card-inner',
    'internship-card-aside',
    'internship-index',
    'internship-title-line',
    'internship-role-en',
    'internship-divider',
    'internship-card-body',
    'internship-bullet-list',
    'function internshipTitleHTML',
    '｜<wbr>',
    'internship-card--tone-${index + 1}',
    'PRODUCT OPERATIONS · AI-ASSISTED REVIEW',
    'COMMUNITY OPERATIONS · CONTENT COMMUNICATION',
    'USER RESEARCH · DEMAND VALIDATION',
    '产品运营 / AI 辅助审核',
    '焦点科技｜产品运营中心实习生',
    '参与 B2B 平台产品发布、展会内容、商家身份与资质材料审核，识别类目错误、资质缺失、证书主体不匹配等高频问题。',
    '面向 AI 辅助审核场景，整理易混淆产品关键词、类目特征与典型 Bad Case，支持审核规则说明优化。',
    '基于商家提交错误归因，提出页面提示语、规则说明与发布引导优化建议，降低用户理解成本。',
    '校园社群 / 内容运营',
    '《风景园林》杂志社｜校园社群运营实习生',
    '负责专业内容校园端传播，参与宣传海报设计、推文撰写、读刊展示和分享会等活动执行。',
    '建立并维护院系读者社群，定期推送杂志内容、征稿信息和活动通知，提升目标用户触达与社群黏性。',
    '将专业期刊内容转化为更适合校园传播的图文表达，训练复杂信息转译与用户教育能力。',
    '用户调研 / 需求验证',
    '山东舌尚悦动｜用户运营实习生',
    '面向高校学生群体开展问卷与访谈调研，收集有效样本 300+ 份，分析消费偏好、价格接受度与产品需求。',
    '输出校园智能售卖设备用户调研报告，为点位布局、选品策略和校园渠道运营提供依据。',
    '通过真实用户样本和场景反馈，形成需求验证、用户画像和产品投放判断能力。',
    '产品审核',
    '资质核验',
    '内容传播',
    '用户调研',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  for (const removed of [
    'Experience Page',
    'Operation Evidence',
    'Rule Reading',
    'AI Review',
  ]) {
    assert.equal(html.includes(removed), false, removed);
  }

  const profileTitleBlock = html.match(/\.profile-info-card h3\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipTitleBlock = html.match(/\.internship-title-line\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipHeadBlock = html.match(/\.chapter-section--internship \.details-head\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipListBlock = html.match(/\.internship-card-list\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipInnerBlock = html.match(/\.internship-card-inner\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipAsideBlock = html.match(/\.internship-card-aside\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipBodyBlock = html.match(/\.internship-card-body\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipBulletBlock = html.match(/\.internship-bullet-list\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipRoleBlock = html.match(/\.internship-role-en\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipTagsBlock = html.match(/\.internship-tags\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipTagBlock = html.match(/\.internship-tags \.tag\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const profileTitleSize = profileTitleBlock.match(/font-size:\s*([^;]+);/)?.[1];
  const internshipTitleSize = internshipTitleBlock.match(/font-size:\s*([^;]+);/)?.[1];

  assert.equal(internshipTitleSize, profileTitleSize, 'internship secondary titles should match 01 info-card title size');
  assert.equal(internshipTitleSize, '22px', 'internship secondary titles should use the 教育背景 title size');
  assert.ok(internshipHeadBlock.includes('margin-bottom: 14px;'), '02 title-to-card spacing should be compact');
  assert.ok(internshipListBlock.includes('gap: 16px;'), '02 card vertical gap should fit three cards on one screen');
  assert.ok(internshipInnerBlock.includes('min-height: 190px;'), '02 cards should target a compact 180-220px height');
  assert.ok(internshipInnerBlock.includes('grid-template-columns: minmax(330px, 35%) 1px minmax(0, 1fr);'), '02 left column should be wider for natural title wrapping');
  assert.ok(internshipTitleBlock.includes('line-height: 1.38;'), '02 title line-height should make two-line titles breathe');
  assert.ok(internshipTitleBlock.includes('letter-spacing: .012em;'), '02 title letter-spacing should be slightly more open');
  assert.ok(internshipTitleBlock.includes('word-break: keep-all;'), '02 title should avoid awkward CJK forced breaks');
  assert.ok(internshipTitleBlock.includes('overflow-wrap: normal;'), '02 title should prefer semantic wrap points');
  assert.ok(internshipAsideBlock.includes('padding: 22px clamp(24px, 2.8vw, 32px) 20px;'), '02 left column padding should be reduced');
  assert.ok(internshipBodyBlock.includes('padding: 22px clamp(24px, 3vw, 34px) 20px;'), '02 right column padding should be reduced');
  assert.ok(internshipBulletBlock.includes('font-size: 14px;'), '02 bullets should be slightly smaller');
  assert.ok(internshipBulletBlock.includes('line-height: 1.55;'), '02 bullet line-height should be compact but readable');
  assert.ok(internshipBulletBlock.includes('gap: 7px;'), '02 bullet gaps should be compact');
  assert.ok(internshipRoleBlock.includes('font-size: 11px;'), '02 uppercase helper text should be smaller');
  assert.ok(internshipRoleBlock.includes('margin-top: 10px;'), '02 uppercase helper spacing should be tighter');
  assert.ok(internshipTagsBlock.includes('margin-top: 12px;'), '02 tag spacing should be tighter');
  assert.ok(internshipTagBlock.includes('padding: 0 11px;'), '02 tags should use centered horizontal padding');
  assert.ok(internshipTagBlock.includes('font-size: 12px;'), '02 tags should use smaller text');
});

run('selected chapter card updates separately from the fixed cover', () => {
  assert.ok(html.includes('document.querySelectorAll(".book").forEach((book) => {'));
  assert.equal(html.includes('selectedChapterTitle.textContent = chapter.title'), false);
  assert.equal(html.includes('selectedChapterCn.textContent = chapter.cn'), false);
});

run('chapter headers match the 02 internship heading scale and profile photo is used', () => {
  for (const marker of [
    'zoom: 1.08;',
    '<img class="portrait-photo" src="assets/images/profile/gao-xiwen.jpg" alt="高熙雯个人照片" loading="lazy">',
    '.portrait-photo',
    'object-fit: cover;',
    'object-position: center center;',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  const detailsTitleBlock = html.match(/\.details-title\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const detailsCnBlock = html.match(/\.details-cn\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const profileTitleBlock = html.match(/\.chapter-section--profile \.details-title\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipTitleBlock = html.match(/\.chapter-section--internship \.details-title\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipCnBlock = html.match(/\.chapter-section--internship \.details-cn\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(detailsTitleBlock.includes('font-size: clamp(32px, 4vw, 52px);'), 'all chapter titles should use the 02 heading scale');
  assert.ok(detailsCnBlock.includes('font-size: clamp(20px, 2.2vw, 28px);'), 'all chapter Chinese subtitles should use the 02 heading scale');
  assert.ok(detailsCnBlock.includes('margin-top: 6px;'), 'all chapter CN titles should match 02 title spacing');
  assert.ok(profileTitleBlock.includes('font-size: clamp(32px, 4vw, 52px);'), '01 should no longer use a larger chapter title override');
  assert.ok(internshipTitleBlock.includes('font-size: clamp(32px, 4vw, 52px);'), '02 title scale should remain the reference');
  assert.ok(internshipCnBlock.includes('font-size: clamp(20px, 2.2vw, 28px);'), '02 CN title scale should remain the reference');
});

run('number navigation scrolls to the matching chapter detail section', () => {
  for (const marker of [
    'function getActiveChapterSection',
    'const BOOK_COVER_REVEAL_DELAY = 850;',
    'let pendingChapterScroll = 0;',
    'function scrollToActiveChapter(delay = 0)',
    'window.clearTimeout(pendingChapterScroll);',
    'pendingChapterScroll = window.setTimeout(runScroll, delay);',
    'getActiveChapterSection().scrollIntoView',
    'setActive(Number(book.dataset.index), { scrollToChapter: true, revealBookFirst: true })',
    'setActive(Number(btn.dataset.index), { scrollToChapter: true })',
    'const revealDelay = options.revealBookFirst ? BOOK_COVER_REVEAL_DELAY : 0;',
    'scrollToActiveChapter(revealDelay);',
  ]) {
    assert.ok(html.includes(marker), marker);
  }
});

run('adds a right-side page navigation with anchors and scroll spy', () => {
  for (const marker of [
    'class="portfolio-side-nav"',
    'aria-label="页面导航"',
    'class="side-nav-heading"',
    'class="side-nav-title-cn">页面导航',
    'class="side-nav-title-en">ON THIS PAGE',
    'class="side-nav-list"',
    'href="#chapter-01"',
    'href="#chapter-02"',
    'href="#chapter-03"',
    'href="#chapter-04"',
    'href="#chapter-05"',
    '<span class="side-nav-index">01</span>个人背景',
    '<span class="side-nav-index">02</span>实习经历',
    '<span class="side-nav-index">03</span>AI 原型搭建',
    '<span class="side-nav-index">04</span>数据分析能力',
    '<span class="side-nav-index">05</span>可视化与叙事表达',
    '<span>CHAPTER 01</span>',
    '<span>CHAPTER 05</span>',
    'const sideNavLinks = document.querySelectorAll(".side-nav-link");',
    'function updateSideNav(index)',
    'function syncActiveChapterFromScroll()',
    'requestAnimationFrame(syncActiveChapterFromScroll)',
    'setActive(Number(link.dataset.index), { scrollToChapter: true })',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  const navBlock = html.match(/\.portfolio-side-nav\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const linkBlock = html.match(/\.side-nav-link\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const activeBlock = html.match(/\.side-nav-link:hover,\s*\n    \.side-nav-link\.is-current\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const largeScreenStart = html.indexOf('@media (min-width: 1280px)');
  const largeScreenEnd = html.indexOf('@media (min-width: 1600px)', largeScreenStart);
  const smallScreenStart = html.indexOf('@media (max-width: 1279px)');
  const smallScreenEnd = html.indexOf('@media (min-width: 1280px)', smallScreenStart);
  const largeScreenBlock = html.slice(largeScreenStart, largeScreenEnd);
  const smallScreenBlock = html.slice(smallScreenStart, smallScreenEnd);

  assert.ok(navBlock.includes('position: fixed;'), 'side nav should be fixed on large screens');
  assert.ok(navBlock.includes('right: 12px;'), 'side nav should sit in the right whitespace');
  assert.ok(navBlock.includes('top: 128px;'), 'side nav should start below the topbar');
  assert.ok(navBlock.includes('width: 160px;'), 'side nav width should stay compact');
  assert.ok(navBlock.includes('backdrop-filter: blur(16px);'), 'side nav should keep the paper-glass style');
  assert.ok(linkBlock.includes('border: 1px solid transparent;'), 'side nav links should stay light before hover');
  assert.ok(activeBlock.includes('background: rgba(255,255,255,.76);'), 'current side nav item should be softly highlighted');
  assert.ok(largeScreenBlock.includes('.portfolio-side-nav'), 'side nav should be shown only on large screens');
  assert.ok(largeScreenBlock.includes('padding-right: calc(clamp(20px, 4vw, 56px) + 196px);'), 'hero should reserve right safety space for side nav');
  assert.ok(largeScreenBlock.includes('padding-right: calc(clamp(20px, 5vw, 70px) + 196px);'), 'details should reserve right safety space for side nav');
  assert.ok(smallScreenBlock.includes('display: none;'), 'side nav should stay hidden below 1280px');
});

run('AI prototype chapter follows the provided five-module preview structure', () => {
  for (const label of [
    'function aiProductPrototypeHTML',
    'chapter-section--prototype',
    'prototype-overview',
    'prototype-overview-main',
    'prototype-demo-panel',
    'prototype-section-heading',
    'prototype-entry-grid',
    'prototype-entry-card',
    'prototype-detail-stack',
    'prototype-detail-card',
    'prototype-summary-card',
    'Project Overview',
    'ChoiceCraft',
    'AI 辅助 DCE 问卷设计与数据采集工具组',
    'AI Product Design / Vibe Coding / Research Tool Prototype｜2026.04–至今',
    'PROTOTYPE EXPERIENCE',
    '产品原型体验入口',
    'Survey Demo',
    '情境化 CE 问卷采集系统',
    'Admin Preview',
    '数据后台预览',
    'Design Generator',
    'D-efficient Design 在线生成工具',
    'Product 01',
    'Product 02',
    'AI-assisted Development',
    '从概念构想到可交互原型',
    'Survey Flow',
    '问卷流程',
    'Brief',
    'Scenario',
    'Attributes',
    'Choice',
    'Code',
    'Design Workflow',
    '设计生成流程',
    'Attribute & Level Setup',
    'Choice Set Parameters',
    'R / idefix Engine',
    'Choice Sets Output',
    'Export & Interpretation',
    'Requirement Breakdown',
    'Cloud Deployment',
  ]) {
    assert.ok(html.includes(label), label);
  }

  for (const marker of [
    'href: "https://jiangciii.github.io/choicecraft-frontend/choicecraft/index.html#overview"',
    'href: "http://129.204.155.8/admin/dashboard"',
    'href: "http://129.204.155.8/survey"',
    'screenshot: "assets/product/01.jpg"',
    'screenshot: "assets/product/02.jpg"',
    'screenshot: "assets/product/03.jpg"',
    'function prototypeMockHTML(entry)',
    '<div class="prototype-mock-screenshot">',
    '<img src="${entry.screenshot}" alt="${entry.title} screenshot" loading="lazy">',
    '<a class="prototype-card prototype-entry-card prototype-entry-card--${entry.variant}" href="${entry.href}" target="_blank" rel="noopener noreferrer">',
    '${prototypeMockHTML(entry)}',
    '<div class="prototype-entry-footer">',
    '<span class="prototype-button">${entry.cta}</span>',
    'class="prototype-detail-main"',
    'detail.workflow ?',
    'prototype-workflow',
    'prototype-workflow-steps',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  const entryMappingOrder = [
    'variant: "survey"',
    'screenshot: "assets/product/01.jpg"',
    'href: "http://129.204.155.8/survey"',
    'variant: "admin"',
    'screenshot: "assets/product/02.jpg"',
    'href: "http://129.204.155.8/admin/dashboard"',
    'variant: "generator"',
    'screenshot: "assets/product/03.jpg"',
    'href: "https://jiangciii.github.io/choicecraft-frontend/choicecraft/index.html#overview"',
  ];

  let previousEntryMarker = -1;
  for (const marker of entryMappingOrder) {
    const position = html.indexOf(marker);
    assert.ok(position > previousEntryMarker, `entry screenshot/link mapping order mismatch: ${marker}`);
    previousEntryMarker = position;
  }

  const mockWindowBlock = html.match(/\.prototype-mock-window\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const screenshotBlock = html.match(/\.prototype-mock-screenshot\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const screenshotImageBlock = html.match(/\.prototype-mock-screenshot img\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const screenshotHoverBlock = html.match(/\.prototype-entry-card:hover \.prototype-mock-screenshot img\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(mockWindowBlock.includes('aspect-ratio: 16 / 9;'), 'prototype screenshots should keep a 16:9 browser-window frame');
  assert.ok(screenshotBlock.includes('position: absolute;'), 'screenshot should sit inside the browser-window body');
  assert.ok(screenshotBlock.includes('top: 30px;'), 'screenshot should preserve the browser chrome area');
  assert.ok(screenshotImageBlock.includes('width: 100%;'), 'screenshot image should fill the frame width');
  assert.ok(screenshotImageBlock.includes('height: 100%;'), 'screenshot image should fill the frame height');
  assert.ok(screenshotImageBlock.includes('object-fit: cover;'), 'screenshot image should crop without distortion');
  assert.ok(screenshotImageBlock.includes('object-position: top center;'), 'screenshot image should align from the top center');
  assert.ok(screenshotHoverBlock.includes('transform: scale(1.035);'), 'hover should keep a gentle screenshot zoom');

  const entryCardBlock = html.match(/\.prototype-entry-card\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const entryCardTextureBlock = html.match(/\.prototype-entry-card::before\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const entryDescBlock = html.match(/\.prototype-entry-desc\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const entryFooterBlock = html.match(/\.prototype-entry-footer\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const entryFooterPillsBlock = html.match(/\.prototype-entry-footer \.prototype-pills\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const entryFooterPillBlock = html.match(/\.prototype-entry-footer \.prototype-pill\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const buttonBlock = html.match(/\.prototype-button\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const surveyBlock = html.match(/\.prototype-entry-card--survey\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const adminBlock = html.match(/\.prototype-entry-card--admin\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const adminHoverBlock = html.match(/\.prototype-entry-card--admin:hover\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const adminMockWindowBlock = html.match(/\.prototype-entry-card--admin \.prototype-mock-window\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const adminPillBlock = html.match(/\.prototype-entry-card--admin \.prototype-pill\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const adminButtonBlock = html.match(/\.prototype-entry-card--admin \.prototype-button\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const adminButtonHoverBlock = html.match(/\.prototype-entry-card--admin:hover \.prototype-button\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const generatorBlock = html.match(/\.prototype-entry-card--generator\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const compactEntryMediaBlock = html.match(/@media \(max-width: 900px\)\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(entryCardBlock.includes('height: 100%;'), 'prototype entry cards should stretch to the same grid-row height');
  assert.ok(entryCardBlock.includes('align-items: stretch;'), 'prototype entry card content should align on one vertical axis');
  assert.ok(entryCardBlock.includes('linear-gradient(145deg, rgba(250,252,248,.88), rgba(238,244,241,.72) 54%, rgba(246,249,246,.76));'), 'prototype entry card backgrounds should use the cool paper gradient from the reference');
  assert.ok(entryCardBlock.includes('radial-gradient(circle at 82% 84%, color-mix(in srgb, var(--entry-accent, #8FB7B0) 10%, transparent), transparent 40%)'), 'prototype entry cards should keep only a subtle per-card accent wash');
  assert.equal(entryCardBlock.includes('rgba(232,200,111'), false, 'prototype entry card base background should not read as yellow');
  assert.ok(entryCardTextureBlock.includes('rgba(143,183,176,.05)'), 'prototype entry card texture should lean blue-green instead of yellow');
  assert.equal(entryCardTextureBlock.includes('rgba(232,200,111'), false, 'prototype entry card texture should remove the old yellow cast');
  assert.ok(entryDescBlock.includes('min-height: 74px;'), 'prototype descriptions should reserve consistent space before the footer');
  assert.ok(entryDescBlock.includes('flex: 0 0 auto;'), 'prototype descriptions should not push footer unevenly');
  assert.ok(entryFooterBlock.includes('margin-top: auto;'), 'prototype card footer should stay pinned to the card bottom');
  assert.ok(entryFooterBlock.includes('display: flex;'), 'prototype footer should be a vertical flex stack');
  assert.ok(entryFooterBlock.includes('flex-direction: column;'), 'prototype footer should stack tags above the button');
  assert.ok(entryFooterBlock.includes('gap: 12px;'), 'prototype footer should keep compact tag-to-button spacing');
  assert.ok(entryFooterBlock.includes('padding-top: 12px;'), 'prototype footer should sit closer to the body copy');
  assert.ok(entryFooterPillsBlock.includes('flex-wrap: nowrap;'), 'desktop prototype tags should stay in one row when possible');
  assert.ok(entryFooterPillsBlock.includes('min-height: 34px;'), 'prototype entry tag rows should reserve a single-line height');
  assert.ok(entryFooterPillsBlock.includes('align-items: center;'), 'prototype tags should align vertically in one row');
  assert.ok(entryFooterPillBlock.includes('padding: 0 10px;'), 'prototype entry chips should be compact enough for one row');
  assert.ok(entryFooterPillBlock.includes('border-color: color-mix(in srgb, var(--entry-accent) 46%, rgba(132,158,151,.38));'), 'prototype entry chips should pick up the card accent');
  assert.ok(buttonBlock.includes('margin-top: 0;'), 'prototype buttons should rely on footer gap instead of uneven margins');
  assert.ok(buttonBlock.includes('border-color: color-mix(in srgb, var(--entry-accent, #8FA7A1) 42%, rgba(132,158,151,.38));'), 'prototype buttons should use the entry accent only locally');
  assert.ok(surveyBlock.includes('--entry-accent: #A895C6;'), 'Survey card should use a soft purple accent');
  assert.ok(adminBlock.includes('--entry-accent: #8FB7B0;'), 'Admin card should use a clearer low-saturation blue-green accent');
  assert.ok(adminBlock.includes('--entry-accent-soft: rgba(143,183,176,.16);'), 'Admin card should define a soft blue-green fill');
  assert.ok(adminBlock.includes('--entry-border: rgba(143,183,176,.42);'), 'Admin card should define a clearer blue-green border');
  assert.ok(adminBlock.includes('--entry-hover: rgba(143,183,176,.24);'), 'Admin card should define a gentle blue-green hover fill');
  assert.ok(adminHoverBlock.includes('box-shadow: 0 24px 70px rgba(143,183,176,.16);'), 'Admin card hover shadow should carry a subtle blue-green tint');
  assert.ok(adminHoverBlock.includes('border-color: var(--entry-border);'), 'Admin card hover border should use the admin border color');
  assert.ok(adminMockWindowBlock.includes('border-color: var(--entry-border);'), 'Admin screenshot window should get a blue-green outline');
  assert.ok(adminPillBlock.includes('border-color: var(--entry-border);'), 'Admin chips should get a blue-green border');
  assert.ok(adminPillBlock.includes('background: var(--entry-accent-soft);'), 'Admin chips should get a soft blue-green fill');
  assert.ok(adminButtonBlock.includes('border-color: var(--entry-border);'), 'Admin button should get a blue-green border');
  assert.ok(adminButtonHoverBlock.includes('background: var(--entry-hover);'), 'Admin button hover should use the gentle blue-green hover fill');
  assert.ok(generatorBlock.includes('--entry-accent: #E8C86F;'), 'Generator card should use a warm accent');
  assert.ok(compactEntryMediaBlock.includes('.prototype-entry-footer .prototype-pills'), 'narrow screens should get a prototype tag override');
  assert.ok(compactEntryMediaBlock.includes('flex-wrap: wrap;'), 'prototype tags may wrap only on narrow screens');

  const detailMainBlock = html.match(/\.prototype-detail-main\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const workflowBlock = html.match(/\.prototype-workflow\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const workflowHeadBlock = html.match(/\.prototype-workflow-head\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const workflowStepsBlock = html.match(/\.prototype-workflow-steps\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const workflowLineBlock = html.match(/\.prototype-workflow-steps::before\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const workflowStepBlock = html.match(/\.prototype-workflow-step\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const workflowNumberBlock = html.match(/\.prototype-workflow-no\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const workflowHoverBlock = html.match(/\.prototype-workflow-step:hover \.prototype-workflow-no\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(detailMainBlock.includes('display: flex;'), 'prototype detail left column should stack copy and optional workflow');
  assert.ok(workflowBlock.includes('margin-top: 26px;'), 'Product 02 workflow should sit below copy as a strip');
  assert.equal(/background\s*:/i.test(workflowBlock), false, 'Product 02 workflow strip should not have a nested-card background');
  assert.equal(/border-radius\s*:/i.test(workflowBlock), false, 'Product 02 workflow strip should not have a rounded outer card');
  assert.equal(/box-shadow\s*:/i.test(workflowBlock), false, 'Product 02 workflow strip should not have an outer card shadow');
  assert.equal(/border\s*:/i.test(workflowBlock), false, 'Product 02 workflow strip should not have an outer border');
  assert.ok(workflowHeadBlock.includes('border-bottom: 1px solid rgba(132,158,151,.22);'), 'workflow strip should use a light divider under the title');
  assert.ok(workflowStepsBlock.includes('grid-template-columns: repeat(5, minmax(0, 1fr));'), 'Product 02 workflow should use a compact five-step horizontal flow');
  assert.ok(workflowStepsBlock.includes('gap: 10px;'), 'Product 02 workflow should breathe without feeling fragmented');
  assert.ok(workflowStepsBlock.includes('position: relative;'), 'workflow strip should support a lightweight connecting line');
  assert.ok(workflowLineBlock.includes('height: 1px;'), 'workflow strip should connect nodes with a thin line');
  assert.ok(workflowLineBlock.includes('background: linear-gradient(90deg, transparent, rgba(132,158,151,.34), transparent);'), 'workflow connector should stay soft');
  assert.ok(workflowStepBlock.includes('min-height: 72px;'), 'workflow nodes should stay low and compact');
  assert.equal(/background\s*:/i.test(workflowStepBlock), false, 'workflow nodes should not be small cards');
  assert.equal(/border\s*:/i.test(workflowStepBlock), false, 'workflow nodes should not have card borders');
  assert.ok(workflowNumberBlock.includes('background: #AFCFC7;'), 'workflow number dots should use low-saturation cyan green');
  assert.ok(workflowNumberBlock.includes('color: #fff;'), 'workflow number dots should keep white text');
  assert.ok(workflowNumberBlock.includes('box-shadow: 0 8px 18px rgba(126,166,157,.22);'), 'workflow number dots should keep a soft paper-like shadow');
  assert.ok(workflowHoverBlock.includes('background: #9CBFB6;'), 'workflow number hover should only deepen slightly');

  const product02Start = html.indexOf('id: "design-generator"');
  const product02End = html.indexOf('summary: {', product02Start);
  const product02Block = html.slice(product02Start, product02End);
  const expectedWorkflowOrder = [
    'workflow: {',
    'title: "设计生成流程"',
    'label: "Design Workflow"',
    'cn: "属性与水平配置"',
    'en: "Attribute & Level Setup"',
    'cn: "选择集参数设置"',
    'en: "Choice Set Parameters"',
    'cn: "R / idefix 后端调用"',
    'en: "R / idefix Engine"',
    'cn: "Choice Sets 自动生成"',
    'en: "Choice Sets Output"',
    'cn: "Excel 下载与结果解读"',
    'en: "Export & Interpretation"',
  ].map(marker => product02Block.indexOf(marker));

  for (const [index, position] of expectedWorkflowOrder.entries()) {
    assert.ok(position > -1, `missing Product 02 workflow marker ${index}`);
  }
  assert.deepEqual([...expectedWorkflowOrder].sort((a, b) => a - b), expectedWorkflowOrder, 'Product 02 workflow steps should keep the requested order');

  const workflowRender = html.slice(
    html.indexOf('<section class="prototype-workflow"'),
    html.indexOf('<ol class="prototype-workflow-steps">')
  );
  assert.ok(
    workflowRender.indexOf('prototype-workflow-title') < workflowRender.indexOf('prototype-workflow-label'),
    'workflow render should show Chinese title before English label'
  );

  const product01Start = html.indexOf('id: "survey-demo"');
  const product01End = html.indexOf('id: "design-generator"', product01Start);
  const product01Block = html.slice(product01Start, product01End);
  const expectedSurveyWorkflowOrder = [
    'workflow: {',
    'title: "问卷流程"',
    'label: "Survey Flow"',
    'cn: "研究说明"',
    'en: "Brief"',
    'cn: "情境引导"',
    'en: "Scenario"',
    'cn: "属性对比"',
    'en: "Attributes"',
    'cn: "方案选择"',
    'en: "Choice"',
    'cn: "完成码生成"',
    'en: "Code"',
  ].map(marker => product01Block.indexOf(marker));

  for (const [index, position] of expectedSurveyWorkflowOrder.entries()) {
    assert.ok(position > -1, `missing Product 01 survey workflow marker ${index}`);
  }
  assert.deepEqual([...expectedSurveyWorkflowOrder].sort((a, b) => a - b), expectedSurveyWorkflowOrder, 'Product 01 workflow steps should keep the requested order');

  for (const removed of [
    'Three clickable prototype entries',
    '三个可点击的产品原型入口',
    '以产品入口方式呈现功能，而不是普通链接列表。',
    '从“自然语言需求”到“可运行产品原型”',
    'href: "#survey-demo"',
    'href: "#admin-preview"',
    'href: "#design-generator"',
  ]) {
    assert.equal(html.includes(removed), false, removed);
  }

  const order = [
    'eyebrow: "Project Overview"',
    'entryHeading: {',
    'variant: "survey"',
    'variant: "admin"',
    'variant: "generator"',
    'eyebrow: "Product 01"',
    'eyebrow: "Product 02"',
    'eyebrow: "AI-assisted Development"',
  ].map(label => html.indexOf(label));

  for (const [index, position] of order.entries()) {
    assert.ok(position > -1, `missing ordered marker ${index}`);
  }
  assert.deepEqual([...order].sort((a, b) => a - b), order, '03 modules should keep preview order');
  assert.ok(html.includes('if (chapter.detailType === "prototype") return aiProductPrototypeHTML(chapter);'));
});

run('data chapter follows the provided workflow and three-card structure', () => {
  for (const marker of [
    'function dataAnalysisHTML',
    'chapter-section--data-analysis',
    'data-analysis-header',
    'data-analysis-flow-wrap',
    'data-analysis-flow',
    'data-analysis-flow-node',
    'data-analysis-flow-note',
    'data-analysis-cards',
    'data-analysis-card',
    'data-analysis-card-title',
    'data-analysis-block',
    'data-analysis-page-note',
    '将数据分析视为“洞察转译”能力',
    'From Data to Product Decision',
    'Data → Indicator → Model → Insight → Decision',
    'Multi-source Data &',
    'Indicator Design',
    '多源数据整合与指标构建',
    'Modeling & Pattern',
    'Recognition',
    '建模分析与模式识别',
    'Preference & Decision',
    'Modeling',
    '偏好识别与决策模拟',
    'Research Evidence',
    'Product Translation',
    'if (chapter.detailType === "data-analysis") return dataAnalysisHTML(chapter);',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  const dataRenderer = html.slice(
    html.indexOf('function dataAnalysisHTML'),
    html.indexOf('function chapterDetailHTML')
  );
  const order = [
    '<div class="data-analysis-flow-title">',
    '<div class="data-analysis-flow">',
    '<div class="data-analysis-flow-note">',
    '<section class="data-analysis-cards">',
  ].map(marker => dataRenderer.indexOf(marker));

  for (const [index, position] of order.entries()) {
    assert.ok(position > -1, `missing ordered data marker ${index}`);
  }
  assert.deepEqual([...order].sort((a, b) => a - b), order, '04 modules should keep preview order');

  const dataFlowBlock = html.match(/\.data-analysis-flow\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  assert.ok(dataFlowBlock.includes('grid-template-columns: repeat(5, minmax(112px, 172px));'), '04 flow pills should be narrower');
  assert.ok(dataFlowBlock.includes('justify-content: space-between;'), '04 flow pills should stay evenly distributed after narrowing');
});

run('data analysis ability cards align same-type blocks across columns', () => {
  const cardBlock = html.match(/\.data-analysis-card\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const titleBlock = html.match(/\.data-analysis-card-title\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const blockBlock = html.match(/\.data-analysis-block\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const researchBlock = html.match(/\.data-analysis-block:not\(\.data-analysis-block--translation\)\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const translationBlock = html.match(/\.data-analysis-block--translation\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const tagsBlock = html.match(/\.data-analysis-tags\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(cardBlock.includes('display: flex;'), 'each ability module should remain a vertical flex column');
  assert.ok(cardBlock.includes('align-items: stretch;'), 'each ability module should stretch inner blocks to the same width');
  assert.ok(titleBlock.includes('min-height: 98px;'), 'ability headings should reserve equal vertical space before the evidence row');
  assert.ok(blockBlock.includes('display: flex;'), 'inner evidence cards should use flex for stable top alignment');
  assert.ok(blockBlock.includes('flex-direction: column;'), 'inner evidence card text should stay stacked from the top');
  assert.ok(researchBlock.includes('height: 300px;'), 'Research Evidence cards should share one desktop height');
  assert.ok(translationBlock.includes('height: 164px;'), 'Product Translation cards should share one desktop height');
  assert.ok(tagsBlock.includes('margin-top: auto;'), 'keyword tags should stay pushed to the bottom');
  assert.ok(tagsBlock.includes('min-height: 66px;'), 'keyword tag rows should reserve a consistent baseline');
});

run('keyword pills center Chinese and English text consistently', () => {
  const sharedPillBlock = html.match(/\.tag,\n    \.internship-label,\n    \.prototype-pill,\n    \.data-analysis-tag,\n    \.mini-pill\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const sharedPillSpanBlock = html.match(/\.tag span,\n    \.internship-label span,\n    \.prototype-pill span,\n    \.data-analysis-tag span,\n    \.mini-pill span\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  for (const [name, block] of [
    ['shared pill shell', sharedPillBlock],
    ['shared pill inner span', sharedPillSpanBlock],
  ]) {
    assert.ok(block.includes('display: inline-flex;'), `${name} should use inline-flex`);
    assert.ok(block.includes('align-items: center;'), `${name} should vertically center text`);
    assert.ok(block.includes('justify-content: center;'), `${name} should horizontally center text`);
    assert.ok(block.includes('line-height: 1;'), `${name} should avoid font metric drift`);
  }

  const tagBlock = html.match(/\.tag\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const internshipLabelBlock = html.match(/\.internship-label\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const prototypePillBlock = html.match(/\.prototype-pill\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const dataTagBlock = html.match(/\.data-analysis-tag\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const visualMiniPillBlock = html.match(/\.visual-gallery-block \.mini-pill\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  for (const [name, block] of [
    ['tag', tagBlock],
    ['internship label', internshipLabelBlock],
    ['prototype pill', prototypePillBlock],
    ['data analysis tag', dataTagBlock],
  ]) {
    assert.ok(block.includes('min-height: 34px;'), `${name} should keep a stable pill height`);
    assert.equal(/padding:\s*\d+px\s+\d+px;/.test(block), false, `${name} should not use vertical padding for centering`);
  }

  assert.ok(visualMiniPillBlock.includes('height: 24px;'), 'visual card mini labels should keep their compact existing height');
  assert.ok(visualMiniPillBlock.includes('padding: 0 12px;'), 'visual card mini labels should use symmetric horizontal padding');
});

run('main books keep the fixed low-saturation color mapping', () => {
  const expectedBooks = [
    ['spine: "BACKGROUND"', 'color: "#9FB8D5"', 'deep: "#7F9AB8"', 'highlight: "#C8D8E8"'],
    ['spine: "INTERNSHIP"', 'color: "#D9BE63"', 'deep: "#BFA24C"', 'highlight: "#F0DA8C"'],
    ['spine: "CHOICECRAFT"', 'color: "#E7A9B0"', 'deep: "#C9858E"', 'highlight: "#F3CBD0"'],
    ['spine: "DATA & INSIGHT"', 'color: "#9BCDC8"', 'deep: "#75AAA5"', 'highlight: "#C5E3DF"'],
    ['spine: "VISUAL STORY"', 'color: "#B9CDAA"', 'deep: "#95AD84"', 'highlight: "#D6E4CC"'],
  ];

  for (const markers of expectedBooks) {
    const positions = markers.map(marker => html.indexOf(marker));
    for (const [index, position] of positions.entries()) {
      assert.ok(position > -1, markers[index]);
    }
    assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  }
});

run('active book state does not replace the book color palette', () => {
  const activeBlock = html.match(/\.book\.active\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const activeGlowBlock = html.match(/\.book\.active::before\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(activeBlock, '.book.active block exists');
  assert.ok(activeGlowBlock, '.book.active::before block exists');
  assert.equal(/background\s*:/i.test(activeBlock), false, '.book.active should not set background');
  assert.equal(/background\s*:\s*var\(--c\)/i.test(activeGlowBlock), false, 'active glow should not paint a new cover background');
  assert.ok(html.includes('--hi:${chapter.highlight'), 'book style binds a stable highlight color');
});

run('book spine text stays clean white without the decorative frame', () => {
  const titleBlock = html.match(/\.book-title\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const coverAfterBlock = html.match(/\.book-cover::after\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.equal(html.includes('book-medal'), false, 'decorative spine frame should be removed');
  assert.ok(/color:\s*rgba\(255,255,255,\.96\)/.test(titleBlock), 'spine title should stay white');
  assert.ok(/text-shadow:/i.test(titleBlock), 'spine title should use soft contrast shadow');
  assert.ok(/background:\s*linear-gradient/i.test(coverAfterBlock), 'active cover should use a subtle contrast mask');
  assert.equal(html.includes('rgba(25,44,45,.24)'), false, 'book contrast mask should not muddy the colors');
  assert.equal(html.includes('rgba(25,44,45,.34)'), false, 'book text shadow should stay light and clean');
});

run('visual storytelling chapter has two slow hover-pausing galleries', () => {
  for (const marker of [
    'visual-gallery--research',
    'Research & Data Visualization',
    'visual-gallery--spatial',
    'Spatial Design Presentation',
    '@keyframes galleryDrift',
    '.visual-track:hover',
  ]) {
    assert.ok(html.includes(marker), marker);
  }
});

run('visual storytelling cards use image paths and a native lightbox', () => {
  for (const marker of [
    'function visualStorytellingHTML',
    'chapter-section--visual-storytelling',
    'visual-storytelling-intro',
    'visual-gallery-block',
    'visual-marquee-shell',
    'visual-marquee-track',
    'visual-image-frame',
    'image-cover',
    'image-contain',
    '<img class="visual-image"',
    'object-position: center;',
    'fit: "contain"',
    'assets/visual/research/1.jpg',
    'assets/visual/research/5.jpg',
    'assets/visual/spatial/1.jpg',
    'assets/visual/spatial/5.jpg',
    '/* 01 Research & Data Visualization images */',
    '/* 02 Spatial Design Presentation images */',
    'id="visualLightbox"',
    'class="visual-lightbox"',
    'id="visualLightboxImg"',
    'data-lightbox-close',
    'function openVisualLightbox(card)',
    'function closeVisualLightbox()',
    'document.addEventListener("keydown"',
    'event.key === "Escape"',
    'document.body.classList.add("visual-lightbox-open")',
    'document.body.classList.remove("visual-lightbox-open")',
    'if (chapter.detailType === "visual") return visualStorytellingHTML(chapter);',
  ]) {
    assert.ok(html.includes(marker), marker);
  }
  assert.equal(html.includes('Image Slot'), false, 'visual image cards should not show placeholder watermark text');
  assert.equal(html.includes('visual-image-placeholder'), false, 'visual image cards should not render placeholder overlay markup');

  const lightboxBlock = html.match(/\.visual-lightbox\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const lightboxImageBlock = html.match(/\.visual-lightbox-image\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const frameBlock = html.match(/\.visual-image-frame\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const visualImageBlock = html.match(/\.visual-image\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const coverBlock = html.match(/\.visual-card\.image-cover \.visual-image\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const containBlock = html.match(/\.visual-card\.image-contain \.visual-image\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const containFrameBlock = html.match(/\.visual-card\.image-contain \.visual-image-frame\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(lightboxBlock.includes('position: fixed;'), 'lightbox should overlay the current page');
  assert.ok(lightboxBlock.includes('background: rgba(32,41,40,.45);'), 'lightbox overlay should stay soft, not black-tech');
  assert.ok(lightboxBlock.includes('pointer-events: none;'), 'lightbox should be inert while closed');
  assert.ok(lightboxImageBlock.includes('max-width: 92vw;'), 'large image should fit viewport width');
  assert.ok(lightboxImageBlock.includes('max-height: 88vh;'), 'large image should fit viewport height');
  assert.ok(lightboxImageBlock.includes('object-fit: contain;'), 'large image should not be cropped');
  assert.ok(frameBlock.includes('aspect-ratio: 16 / 10;'), 'preview frame should keep a 16:10 ratio');
  assert.equal(frameBlock.includes('height:'), false, 'preview frame should not force a fixed height');
  assert.ok(frameBlock.includes('border-radius: 18px 18px 0 0;'), 'image preview should keep rounded card corners');
  assert.ok(visualImageBlock.includes('object-position: center;'), 'small card image should stay centered');
  assert.ok(coverBlock.includes('object-fit: cover;'), 'cover previews should crop without distortion');
  assert.ok(containBlock.includes('object-fit: contain;'), 'contain previews should show full diagrams and boards');
  assert.ok(containFrameBlock.includes('background:'), 'contain previews should have a soft paper background');
});

run('visual storytelling image cards use the requested artwork names', () => {
  for (const marker of [
    'cn: "公园消费空间时空格局"',
    'title: "SPATIOTEMPORAL PATTERN"',
    'cn: "城市文学活力空间格局"',
    'title: "LITERARY VITALITY PATTERN"',
    'cn: "公园消费空间演化路径"',
    'title: "EVOLUTION PATHS"',
    'cn: "公园业态结构与空间驱动"',
    'title: "FORMAT STRUCTURE & DRIVERS"',
    'cn: "城市环境因子空间分布"',
    'title: "URBAN CONTEXT FACTORS"',
    'cn: "雨水花园运营机制图"',
    'title: "RAIN GARDEN OPERATION FRAMEWORK"',
    'cn: "雨水循环与剖面设计"',
    'title: "RAINWATER CYCLE & SECTION DESIGN"',
    'cn: "自然基础设施系统分析"',
    'title: "NATURAL INFRASTRUCTURE SYSTEM"',
    'cn: "场地漫游与体验叙事"',
    'title: "SITE JOURNEY & EXPERIENCE STORYBOARD"',
    'cn: "江豚友好型湿地系统设计"',
    'title: "WETLAND SYSTEM MASTERPLAN"',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  for (const oldName of [
    'Preference Model Map',
    '偏好模型图',
    'Park Renewal Board',
    '空间叙事补充图',
  ]) {
    assert.equal(html.includes(oldName), false, `old artwork name should be replaced: ${oldName}`);
  }
});

run('card-level titles use English labels and Chinese main headings', () => {
  for (const marker of [
    'class="card-title-label">PROFILE SUMMARY',
    '<h3 class="card-title-main">${chapter.projectCn}</h3>',
    'class="prototype-project-brand">${prototype.overview.name}</div>',
    '<div class="prototype-entry-label">${entry.title}</div>',
    '<h3 class="prototype-entry-title">${entry.cn}</h3>',
    '<div class="data-analysis-card-title-en">${card.title}</div>',
    '<h3>${card.cn}</h3>',
    '<h5>${item.cn || item.title}</h5>',
    '<div class="visual-title-en">${item.title}</div>',
    'eyebrow: "PROTOTYPE EXPERIENCE"',
    'title: "产品原型体验入口"',
    '<div class="visual-gallery-heading">\n                        <h3>${gallery.title}</h3>\n                        <h4>${gallery.cnTitle}</h4>',
    '研究与数据驱动的<br>空间产品实践者',
    '公园消费空间时空格局',
    'SPATIOTEMPORAL PATTERN',
  ]) {
    assert.ok(html.includes(marker), marker);
  }

  const labelBlock = html.match(/\.card-title-label\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const mainBlock = html.match(/\.card-title-main\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const entryTitleBlock = html.match(/\.prototype-entry-title\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const detailTitleBlock = html.match(/\.prototype-detail-card h3\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const summaryTitleBlock = html.match(/\.prototype-summary-card h3\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const dataLabelBlock = html.match(/\.data-analysis-card-title-en\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const dataTitleBlock = html.match(/\.data-analysis-card-title h3\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const visualTitleEnBlock = html.match(/\.visual-title-en\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const prototypeSectionTitleBlock = html.match(/\.prototype-section-heading h3\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const visualIntroTitleBlock = html.match(/\.visual-storytelling-intro h3\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const visualSectionTitleBlock = html.match(/\.visual-gallery-heading h4\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const profileInfoTitleBlock = html.match(/\.profile-info-card h3\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const visualSectionLabelBlock = html.match(/\.visual-gallery-heading h3\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(labelBlock.includes('font-family: -apple-system'), 'internal English labels should use sans-serif');
  assert.ok(labelBlock.includes('font-size: 11px;'), 'internal English labels should stay small');
  assert.ok(labelBlock.includes('letter-spacing: .24em;'), 'internal English labels should be letterspaced');
  assert.ok(labelBlock.includes('text-transform: uppercase;'), 'internal English labels should be uppercase');
  assert.ok(labelBlock.includes('color: #8a9894;'), 'internal English labels should be lighter than Chinese titles');
  assert.ok(labelBlock.includes('font-weight: 700;'), 'internal English labels should be refined but secondary');
  assert.ok(mainBlock.includes('font-size: 23px;'), 'card Chinese titles should match the education-background scale');
  assert.ok(mainBlock.includes('line-height: 1.3;'), 'card Chinese titles should stay compact and readable');
  assert.ok(entryTitleBlock.includes('font-size: 22px;'), '03 product card Chinese title should match the education-background title scale');
  assert.ok(detailTitleBlock.includes('font-size: 22px;'), '03 product detail Chinese title should match the education-background title scale');
  assert.ok(summaryTitleBlock.includes('font-size: 24px;'), '03 summary Chinese title should not read as a section title');
  assert.ok(prototypeSectionTitleBlock.includes('font-size: 23px;'), '03 product module heading should not exceed card-title scale');
  assert.ok(prototypeSectionTitleBlock.includes('line-height: 1.3;'), '03 product module heading should keep compact line-height');
  assert.ok(dataLabelBlock.includes('font-size: 11px;'), '04 English ability labels should stay small');
  assert.ok(dataTitleBlock.includes('font-size: 22px;'), '04 Chinese ability titles should match the education-background title scale');
  assert.ok(visualIntroTitleBlock.includes('font-size: 23px;'), '05 intro card title should match card-title scale');
  assert.ok(visualSectionTitleBlock.includes('font-size: 22px;'), '05 gallery section titles should match the education-background title scale');
  assert.ok(profileInfoTitleBlock.includes('font-weight: 600;'), 'education-background level titles should be a little firmer');
  assert.ok(visualSectionLabelBlock.includes('margin: 0 0 10px;'), '05 gallery English label should have enough space before Chinese title');
  assert.ok(visualTitleEnBlock.includes('font-size: 10px;'), '05 image-card English titles should be secondary');
  for (const secondaryTitleBlock of [
    entryTitleBlock,
    detailTitleBlock,
    dataTitleBlock,
    visualSectionTitleBlock,
  ]) {
    assert.equal(secondaryTitleBlock.trim(), profileInfoTitleBlock.trim(), '02-level card titles should share the education-background title style');
  }
  for (const oversized of [
    '.prototype-section-heading h3',
    '.visual-storytelling-intro h3',
    '.visual-gallery-heading h4',
  ]) {
    const block = html.match(new RegExp(`${oversized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{(?<body>[\\s\\S]*?)\\n    \\}`))?.groups?.body ?? '';
    assert.equal(/font-size:\s*(?:2[5-9]|[3-9]\d)px;/.test(block), false, `${oversized} should not be oversized`);
  }
});

run('visual gallery heading group aligns with the numbered circle', () => {
  const titleRowBlock = html.match(/\.visual-gallery-title-row\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const headingBlock = html.match(/\.visual-gallery-heading\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';
  const labelBlock = html.match(/\.visual-gallery-heading h3\s*\{(?<body>[\s\S]*?)\n    \}/)?.groups?.body ?? '';

  assert.ok(titleRowBlock.includes('align-items: center;'), 'visual gallery heading row should center to the numbered circle');
  assert.ok(headingBlock.includes('transform: translateY(-3px);'), 'visual gallery heading group should sit slightly higher beside the circle');
  assert.ok(labelBlock.includes('margin: 0 0 10px;'), 'English gallery label should keep space before the Chinese title');
});
