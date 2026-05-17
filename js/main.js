const chapters = [
      {
        no: "01",
        title: "Personal Background",
        cn: "个人背景",
        desc: "把学术训练、运营实践和 AI 原型能力整理成一条清晰的迁移路径。",
        spine: "BACKGROUND",
        color: "#9FB8D5",
        deep: "#7F9AB8",
        highlight: "#C8D8E8",
        width: 78,
        height: 318,
        coverWidth: 282,
        rotate: "-1.5deg",
        tags: ["学术背景", "职业定位", "能力迁移", "研究型产品"],
        leftLabel: "Background Page",
        rightLabel: "Transfer Evidence",
        code: "Profile 01",
        detailType: "profile",
        intro: "这一章像作品集的扉页：从风景园林与城市研究出发，解释你如何把空间观察、研究建模、用户理解和可视化表达迁移到 AI 产品与产品运营场景中。",
        project: "Research-driven AI Product Design Practitioner",
        projectCn: "研究驱动的<br>AI 产品设计实践者",
        projectDesc: "定位关键词：能读懂复杂问题、拆成结构化流程，并用 AI 工具和网页原型把研究方法转化为可体验的产品。",
        evidenceLead: "右页把能力迁移拆成三个可验证的线索，帮助招聘者快速理解你的复合背景。",
        evidenceTags: ["Landscape Architecture", "Urban Research", "AI Product", "Portfolio Library"],
        abilities: ["以研究训练建立问题意识，能从空间、行为与数据之间找到结构。", "以产品思维组织用户路径、信息层级和可交互原型。", "以作品集表达把复杂过程整理成可阅读、可展示、可复用的页面。"],
        path: [
          { kicker: "Academic Base", title: "风景园林与城市研究", text: "长期训练空间观察、案例研究、图面表达和机制分析，形成对复杂系统的结构化理解。" },
          { kicker: "Product Direction", title: "AI 产品与运营", text: "关注用户真实任务、业务规则、审核链路和 AI 工具如何降低理解与执行成本。" },
          { kicker: "Transfer Logic", title: "从研究到原型", text: "把研究方法拆解为数据字段、交互页面和结果反馈，让抽象流程变成可测试的产品体验。" }
        ]
      },
      {
        no: "02",
        title: "Internship Experience",
        cn: "实习经历",
        desc: "在产品运营、内容审核和用户运营任务中沉淀规则理解与问题反馈能力。",
        spine: "INTERNSHIP",
        color: "#D9BE63",
        deep: "#BFA24C",
        highlight: "#F0DA8C",
        width: 82,
        height: 340,
        coverWidth: 292,
        rotate: ".9deg",
        tags: ["产品运营", "内容审核", "AI 辅助审核", "用户运营"],
        detailType: "internship",
        internships: [
          {
            label: "产品运营 / AI 辅助审核",
            title: "焦点科技｜产品运营中心实习生",
            roleEn: "PRODUCT OPERATIONS · AI-ASSISTED REVIEW",
            bullets: [
              "参与 B2B 平台产品发布、展会内容、商家身份与资质材料审核，识别类目错误、资质缺失、证书主体不匹配等高频问题。",
              "面向 AI 辅助审核场景，整理易混淆产品关键词、类目特征与典型 Bad Case，支持审核规则说明优化。",
              "基于商家提交错误归因，提出页面提示语、规则说明与发布引导优化建议，降低用户理解成本。"
            ],
            tags: ["产品审核", "资质核验", "AI 辅助审核", "Bad Case", "规则优化"]
          },
          {
            label: "校园社群 / 内容运营",
            title: "《风景园林》杂志社｜校园社群运营实习生",
            roleEn: "COMMUNITY OPERATIONS · CONTENT COMMUNICATION",
            bullets: [
              "负责专业内容校园端传播，参与宣传海报设计、推文撰写、读刊展示和分享会等活动执行。",
              "建立并维护院系读者社群，定期推送杂志内容、征稿信息和活动通知，提升目标用户触达与社群黏性。",
              "将专业期刊内容转化为更适合校园传播的图文表达，训练复杂信息转译与用户教育能力。"
            ],
            tags: ["内容传播", "社群运营", "活动执行", "用户触达", "信息转译"]
          },
          {
            label: "用户调研 / 需求验证",
            title: "山东舌尚悦动｜用户运营实习生",
            roleEn: "USER RESEARCH · DEMAND VALIDATION",
            bullets: [
              "面向高校学生群体开展问卷与访谈调研，收集有效样本 300+ 份，分析消费偏好、价格接受度与产品需求。",
              "输出校园智能售卖设备用户调研报告，为点位布局、选品策略和校园渠道运营提供依据。",
              "通过真实用户样本和场景反馈，形成需求验证、用户画像和产品投放判断能力。"
            ],
            tags: ["用户调研", "问卷访谈", "用户画像", "需求验证", "场景反馈"]
          }
        ]
      },
      {
        no: "03",
        title: "AI Product Prototype",
        cn: "AI 原型搭建",
        desc: "用 ChoiceCraft 展示把选择实验方法转化为在线产品的完整链路。",
        spine: "CHOICECRAFT",
        color: "#E7A9B0",
        deep: "#C9858E",
        highlight: "#F3CBD0",
        width: 92,
        height: 358,
        coverWidth: 306,
        rotate: "1.1deg",
        tags: ["ChoiceCraft", "DCE / CE", "Codex", "前后端 Demo"],
        detailType: "prototype",
        prototype: {
          overview: {
            eyebrow: "Project Overview",
            name: "ChoiceCraft",
            subtitle: "AI 辅助 DCE 问卷设计与数据采集工具组",
            meta: "AI Product Design / Vibe Coding / Research Tool Prototype｜2026.04–至今",
            intro: "ChoiceCraft 是一个围绕离散选择实验构建的 AI 辅助调研工具原型，试图将传统 DCE/CE 研究中分散、复杂且高度依赖专业工具的流程，转化为更连贯、更轻量的在线产品体验。",
            tags: ["Codex", "AI-assisted Coding", "DCE / CE Survey", "R idefix", "D-efficient Design", "用户调研", "数据采集", "后台管理"]
          },
          demos: [
            { title: "受访者端", label: "Survey Demo" },
            { title: "管理端", label: "Admin Preview" },
            { title: "设计端", label: "Design Generator" }
          ],
          entryHeading: {
            eyebrow: "PROTOTYPE EXPERIENCE",
            title: "产品原型体验入口"
          },
          entries: [
            {
              variant: "survey",
              title: "Survey Demo",
              cn: "情境化 CE 问卷采集系统",
              desc: "通过研究说明、场景图片、属性对比卡片和选择任务重构 DCE/CE 问卷体验，让复杂选择任务更容易理解与完成。",
              tags: ["CE scenario", "attribute cards", "mobile survey"],
              screenshot: "assets/product/01.jpg",
              href: "http://129.204.155.8/survey",
              cta: "Open Demo →"
            },
            {
              variant: "admin",
              title: "Admin Preview",
              cn: "数据后台预览",
              desc: "展示提交记录、平均答题时长、随机完成码与数据导出流程，作为安全预览入口，不暴露真实后台数据。",
              tags: ["dashboard", "completion code", "data export"],
              screenshot: "assets/product/02.jpg",
              href: "http://129.204.155.8/admin/dashboard",
              cta: "View Preview →"
            },
            {
              variant: "generator",
              title: "Design Generator",
              cn: "D-efficient Design 在线生成工具",
              desc: "将 R / idefix 的实验设计流程转化为网页工具，支持属性水平配置、choice sets 自动生成、结果解读与 Excel 下载。",
              tags: ["R idefix", "choice sets", "Excel export"],
              screenshot: "assets/product/03.jpg",
              href: "https://jiangciii.github.io/choicecraft-frontend/choicecraft/index.html#overview",
              cta: "Open Generator →"
            }
          ],
          details: [
            {
              id: "survey-demo",
              eyebrow: "Product 01",
              title: "情境化 CE 问卷采集系统",
              body: "DCE/CE 问卷的难点并不只在题目数量，而在于受访者需要连续理解多个情境、比较多个属性，并在相似方案之间做出稳定判断。因此，我将问卷页面重新设计为更具叙事感的调研流程：通过研究说明、场景图片、属性对比卡片和选择任务的组合，让受访者在更清晰的情境中完成选择。",
              valueTitle: "Core Value",
              value: "重构 DCE/CE 问卷的受访者体验与数据采集链路，让复杂选择任务更易理解、更易完成，也更易进入后续建模分析。",
              workflow: {
                title: "问卷流程",
                label: "Survey Flow",
                steps: [
                  { no: "01", cn: "研究说明", en: "Brief" },
                  { no: "02", cn: "情境引导", en: "Scenario" },
                  { no: "03", cn: "属性对比", en: "Attributes" },
                  { no: "04", cn: "方案选择", en: "Choice" },
                  { no: "05", cn: "完成码生成", en: "Code" }
                ]
              },
              highlights: ["场景化答题体验", "属性对比卡片", "平均答题时长统计", "随机完成码", "普通题目 / DCE 结果分表导出"]
            },
            {
              id: "design-generator",
              eyebrow: "Product 02",
              title: "D-efficient Design 在线生成工具",
              body: "在 DCE/CE 研究中，实验设计是问卷质量的前置环节。传统流程通常需要研究者使用 R 语言和 idefix 等工具包生成 choice sets，对非编程背景研究者存在较高门槛。基于这一痛点，我将属性、水平、选择集数量和方案数量等参数转化为网页端输入，并支持生成结果下载与基础解读。",
              valueTitle: "Core Value",
              value: "将 DCE 实验设计从专业代码流程转化为可视化网页工具，降低方法使用门槛，并衔接后续问卷采集与数据分析。",
              workflow: {
                title: "设计生成流程",
                label: "Design Workflow",
                steps: [
                  { no: "01", cn: "属性与水平配置", en: "Attribute & Level Setup" },
                  { no: "02", cn: "选择集参数设置", en: "Choice Set Parameters" },
                  { no: "03", cn: "R / idefix 后端调用", en: "R / idefix Engine" },
                  { no: "04", cn: "Choice Sets 自动生成", en: "Choice Sets Output" },
                  { no: "05", cn: "Excel 下载与结果解读", en: "Export & Interpretation" }
                ]
              },
              highlights: ["属性与水平在线配置", "choice sets 自动生成", "R / idefix 后端调用", "Excel 结果下载", "设计结果基础解读"]
            }
          ],
          summary: {
            id: "admin-preview",
            eyebrow: "AI-assisted Development",
            title: "从概念构想到可交互原型",
            body: "ChoiceCraft 的开发过程本身也是一次 AI-assisted Coding 实践。我使用 Codex 辅助完成页面生成、交互迭代、后端调试、数据管理功能与腾讯云部署；更重要的是，我将研究流程拆解为产品需求，再转化为页面结构、交互路径、后台功能和数据表设计。",
            tags: ["Requirement Breakdown", "AI-assisted Coding", "Prototype Iteration", "Cloud Deployment"]
          }
        }
      },
      {
        no: "04",
        title: "Data Analysis",
        cn: "数据分析能力",
        desc: "用 Data → Indicator → Model → Insight → Decision 串起研究与产品判断。",
        spine: "DATA & INSIGHT",
        color: "#9BCDC8",
        deep: "#75AAA5",
        highlight: "#C5E3DF",
        width: 86,
        height: 330,
        coverWidth: 292,
        rotate: "-.7deg",
        tags: ["数据结构化", "建模洞察", "偏好建模", "决策转译"],
        detailType: "data-analysis",
        dataAnalysis: {
          intro: "将数据分析视为“洞察转译”能力：通过多源数据整合、指标构建、建模分析和结果解释，将复杂现象转化为支持决策的结论。",
          flowLabel: "From Data to Product Decision",
          flow: [
            { name: "Data", text: "数据来源" },
            { name: "Indicator", text: "指标构建" },
            { name: "Model", text: "模型分析" },
            { name: "Insight", text: "洞察提炼" },
            { name: "Decision", text: "产品判断" }
          ],
          cards: [
            {
              no: "01",
              title: "Multi-source Data &<br>Indicator Design",
              cn: "多源数据整合与指标构建",
              blocks: [
                {
                  title: "Research Evidence",
                  text: "基于 POI、AOI、遥感、评论、签到、社会经济和问卷等多源数据，将抽象问题转化为可计算指标。例如，基于南京 120 个公园的消费类 POI 数据，构建消费密度、业态数量与 Shannon 多样性指数，用于衡量公园商业空间的规模、丰富度与结构平衡。"
                },
                {
                  title: "Product Translation",
                  text: "对应 AI 产品中的指标设计、用户行为量化、功能效果评估与数据看板搭建。",
                  translation: true
                }
              ],
              tags: ["Multi-source Data", "Indicator Design", "Data Cleaning", "Metric Thinking"]
            },
            {
              no: "02",
              title: "Modeling & Pattern<br>Recognition",
              cn: "建模分析与模式识别",
              blocks: [
                {
                  title: "Research Evidence",
                  text: "使用 OLS、MGWR、非参数检验、空间自相关、Ordered Logit 和 GWOR 等方法，识别变量影响、空间差异与结构性模式。相关研究中，我通过空间建模分析公园商业空间的驱动机制，也通过文学空间活力指数、耦合协调和 GWOR 解释文化空间活力的空间异质性。"
                },
                {
                  title: "Product Translation",
                  text: "对应 AI 产品中的用户行为差异分析、场景分层、影响因素识别与产品问题诊断。",
                  translation: true
                }
              ],
              tags: ["Statistical Modeling", "Pattern Recognition", "Spatial Analysis", "Insight Extraction"]
            },
            {
              no: "03",
              title: "Preference & Decision<br>Modeling",
              cn: "偏好识别与决策模拟",
              blocks: [
                {
                  title: "Research Evidence",
                  text: "基于 DCE/CE 进一步识别公众对公园商业空间配置的偏好结构，分析用户在商业密度、业态类型、价格水平与公共性补偿机制之间的权衡关系。方法包括 Mixed Logit、WTP / MRS、Latent Class Model 和政策情景模拟。"
                },
                {
                  title: "Product Translation",
                  text: "对应 AI 产品中的用户偏好识别、方案测试、用户分群、付费意愿分析和策略接受度预测。",
                  translation: true
                }
              ],
              tags: ["User Preference", "DCE / CE", "Mixed Logit", "Scenario Simulation"]
            }
          ],
          note: "Data → Indicator → Model → Insight → Decision"
        }
      },
      {
        no: "05",
        title: "Visual Storytelling",
        cn: "可视化与叙事表达",
        desc: "用缓慢流动的作品长廊呈现研究图表、机制图和空间设计表达。",
        spine: "VISUAL STORY",
        color: "#B9CDAA",
        deep: "#95AD84",
        highlight: "#D6E4CC",
        width: 94,
        height: 372,
        coverWidth: 306,
        rotate: "1.4deg",
        tags: ["研究可视化", "空间表达", "信息结构", "作品叙事"],
        leftLabel: "Story Page",
        rightLabel: "Image Gallery",
        code: "Visual 05",
        detailType: "visual",
        intro: "这一章突出你把抽象机制、研究流程和空间方案转化为视觉叙事的能力。它不是普通图片堆叠，而像夹在作品册中的图纸与研究插页。",
        project: "Visual Storytelling Portfolio",
        projectDesc: "适合展示：论文机制图、研究图表、问卷 UI、信息图、空间设计展板、流线与视线分析图。",
        evidenceLead: "右页以两条缓慢流动的图片长廊呈现作品类型，鼠标悬停时暂停并轻微放大。",
        evidenceTags: ["Research Viz", "Data Story", "Spatial Board", "Diagram System"],
        abilities: ["能将复杂概念转化为层级清晰的视觉结构。", "具备审美判断和学术图表规范意识。", "能够兼顾表达美感、信息密度和用户理解成本。"],
        visualIntro: {
          label: "Insight Translation",
          title: "把复杂问题转化为可理解的视觉结构",
          text: "可视化对我而言是一种“洞察转译”能力：将复杂研究、用户行为、数据结果与产品逻辑，转化为更清晰、可理解、可决策的视觉结构。",
          flow: ["Research Logic", "Data Story", "Spatial Narrative", "Product Communication"]
        },
        galleries: [
          {
            variant: "research",
            title: "Research & Data Visualization",
            cnTitle: "研究与数据可视化",
            desc: "面向研究框架、数据结果、空间关系和机制逻辑，通过图形结构组织复杂信息，让分析结论更容易被理解。",
            keywords: ["洞察转译", "数据表达", "空间关系", "机制图解"],
            items: [
              /* 01 Research & Data Visualization images */
              { title: "SPATIOTEMPORAL PATTERN", cn: "公园消费空间时空格局", tag: "Mechanism Diagram", desc: "Research framework and visual logic.", visual: "diagram", fit: "contain", src: "assets/visual/research/1.jpg", full: "assets/visual/research/1.jpg" },
              { title: "LITERARY VITALITY PATTERN", cn: "城市文学活力空间格局", tag: "Spatial Analysis", desc: "Spatial relationship and model output.", visual: "map", fit: "contain", src: "assets/visual/research/2.jpg", full: "assets/visual/research/2.jpg" },
              { title: "EVOLUTION PATHS", cn: "公园消费空间演化路径", tag: "Data Story", desc: "Variable influence and spatial heterogeneity.", visual: "diagram", fit: "contain", src: "assets/visual/research/3.jpg", full: "assets/visual/research/3.jpg" },
              { title: "FORMAT STRUCTURE & DRIVERS", cn: "公园业态结构与空间驱动", tag: "Survey Flow", desc: "Questionnaire logic and user path.", visual: "map", src: "assets/visual/research/4.jpg", full: "assets/visual/research/4.jpg" },
              { title: "URBAN CONTEXT FACTORS", cn: "城市环境因子空间分布", tag: "Visual Synthesis", desc: "Research findings and visual structure.", visual: "diagram", fit: "contain", src: "assets/visual/research/5.jpg", full: "assets/visual/research/5.jpg" }
            ]
          },
          {
            variant: "spatial",
            title: "Spatial Design Presentation",
            cnTitle: "空间设计表达",
            desc: "面向景观设计展板、空间分析和设计方案表达，强调审美判断、版面控制、视觉层级与场地逻辑呈现。",
            keywords: ["版面控制", "视觉层级", "空间叙事", "概念转译"],
            items: [
              /* 02 Spatial Design Presentation images */
              { title: "RAIN GARDEN OPERATION FRAMEWORK", cn: "雨水花园运营机制图", tag: "Landscape Board", desc: "Composition and spatial narrative.", visual: "board", fit: "contain", src: "assets/visual/spatial/1.jpg", full: "assets/visual/spatial/1.jpg" },
              { title: "RAINWATER CYCLE & SECTION DESIGN", cn: "雨水循环与剖面设计", tag: "Plan", desc: "Site logic and design strategy.", visual: "plan", fit: "contain", src: "assets/visual/spatial/2.jpg", full: "assets/visual/spatial/2.jpg" },
              { title: "NATURAL INFRASTRUCTURE SYSTEM", cn: "自然基础设施系统分析", tag: "Diagram", desc: "Spatial structure and hierarchy.", visual: "board", fit: "contain", src: "assets/visual/spatial/3.jpg", full: "assets/visual/spatial/3.jpg" },
              { title: "SITE JOURNEY & EXPERIENCE STORYBOARD", cn: "场地漫游与体验叙事", tag: "Section", desc: "Human scale and scene expression.", visual: "plan", fit: "contain", src: "assets/visual/spatial/4.jpg", full: "assets/visual/spatial/4.jpg" },
              { title: "WETLAND SYSTEM MASTERPLAN", cn: "江豚友好型湿地系统设计", tag: "Presentation", desc: "Board detail and visual hierarchy.", visual: "board", fit: "contain", src: "assets/visual/spatial/5.jpg", full: "assets/visual/spatial/5.jpg" }
            ]
          }
        ]
      }
    ];

    const decorative = [
      { width: 34, height: 238, color: "#E9EEE9", rotate: "-1.2deg" },
      { width: 28, height: 270, color: "#DDE6E2", rotate: "1.3deg" },
      { width: 43, height: 226, color: "#F0EFE8", rotate: "-.7deg" },
      { width: 32, height: 296, color: "#D7E2DF", rotate: ".8deg" },
      { width: 40, height: 252, color: "#F0EFE8", rotate: "-1deg" }
    ];

    let activeIndex = 0;
    let selectedBookIndex = 0;
    let scrollSpyPausedUntil = 0;

    const booksEl = document.getElementById("books");
    const navButtons = document.querySelectorAll(".number-nav button");
    const sideNav = document.querySelector(".portfolio-side-nav");
    const sideNavToggle = document.querySelector("[data-side-nav-toggle]");
    const sideNavLinks = document.querySelectorAll(".side-nav-link");
    const detailsList = document.getElementById("detailsList");
    const visualLightbox = document.getElementById("visualLightbox");
    const visualLightboxPanel = document.getElementById("visualLightboxPanel");
    const visualLightboxImg = document.getElementById("visualLightboxImg");
    const visualLightboxTitle = document.getElementById("visualLightboxTitle");
    const visualLightboxCaption = document.getElementById("visualLightboxCaption");
    const BOOK_COVER_REVEAL_DELAY = 850;
    const SIDE_NAV_STORAGE_KEY = "portfolioSideNavCollapsed";
    let pendingChapterScroll = 0;

    function getSavedSideNavState() {
      try {
        return window.localStorage.getItem(SIDE_NAV_STORAGE_KEY);
      } catch (error) {
        return null;
      }
    }

    function saveSideNavState(collapsed) {
      try {
        window.localStorage.setItem(SIDE_NAV_STORAGE_KEY, collapsed ? "true" : "false");
      } catch (error) {
        // localStorage can be unavailable in some preview contexts.
      }
    }

    function shouldDefaultCollapseSideNav() {
      return window.matchMedia("(min-width: 1280px) and (max-width: 1439px)").matches;
    }

    function setSideNavCollapsed(collapsed, shouldStore = false) {
      if (!sideNav) return;
      sideNav.classList.toggle("is-collapsed", collapsed);
      document.body.classList.toggle("side-nav-collapsed", collapsed);
      if (sideNavToggle) {
        sideNavToggle.setAttribute("aria-expanded", String(!collapsed));
        sideNavToggle.setAttribute("aria-label", collapsed ? "Expand page navigation" : "Collapse page navigation");
      }
      if (shouldStore) saveSideNavState(collapsed);
    }

    function initSideNavState() {
      const savedState = getSavedSideNavState();
      setSideNavCollapsed(savedState === null ? shouldDefaultCollapseSideNav() : savedState === "true");
    }

    function decorBookHTML(book) {
      return `<div class="decor-book" style="--w:${book.width}px;--h:${book.height}px;--c:${book.color};--r:${book.rotate};"></div>`;
    }

    function chapterBookHTML(chapter, index) {
      return `
        <button class="book ${index === selectedBookIndex ? "active" : ""}" 
          data-index="${index}" 
          style="--w:${chapter.width}px;--h:${chapter.height}px;--front-w:${chapter.coverWidth || 238}px;--c:${chapter.color};--deep:${chapter.deep};--hi:${chapter.highlight};--r:${chapter.rotate};"
          aria-label="Open ${chapter.title}">
          <span class="book-line-left"></span>
          <span class="book-line-right"></span>
          <span class="book-title">${chapter.spine}</span>
          <span class="book-no">${chapter.no}</span>
          <span class="book-cover" aria-hidden="true">
            <span class="cover-top">
              <span class="cover-no">${chapter.no}</span>
              <span class="cover-title">${chapter.title}</span>
              <span class="cover-cn">${chapter.cn}</span>
            </span>
            <span class="cover-bottom">Open · Profile · Chapter</span>
          </span>
        </button>
      `;
    }

    function renderBooks() {
      const left = decorative.slice(0, 3).map(decorBookHTML).join("");
      const center = chapters.map(chapterBookHTML).join("");
      const right = decorative.map(decorBookHTML).join("");
      booksEl.innerHTML = left + center + right;

      document.querySelectorAll(".book").forEach(book => {
        book.addEventListener("click", () => setActive(Number(book.dataset.index), { scrollToChapter: true, revealBookFirst: true }));
      });
    }

    function tagsHTML(tags) {
      return tags.map(tag => `<span class="tag">${tag}</span>`).join("");
    }

    function handleVisualImageError(image) {
      image.classList.add("is-missing");
      image.hidden = true;
      image.closest(".visual-image-frame")?.classList.add("is-missing");
    }

    function handleVisualLightboxImageError() {
      visualLightboxImg.hidden = true;
      visualLightboxPanel.classList.add("is-missing");
    }

    function openVisualLightbox(card) {
      const title = card.dataset.title || "";
      const caption = card.dataset.caption || "";
      const full = card.dataset.full || "";

      visualLightboxPanel.classList.remove("is-missing");
      visualLightboxImg.hidden = false;
      visualLightboxImg.src = full;
      visualLightboxImg.alt = title;
      visualLightboxTitle.textContent = title;
      visualLightboxCaption.textContent = caption;
      visualLightbox.classList.add("is-open");
      visualLightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("visual-lightbox-open");
    }

    function closeVisualLightbox() {
      visualLightbox.classList.remove("is-open");
      visualLightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("visual-lightbox-open");
      visualLightboxImg.removeAttribute("src");
      visualLightboxImg.alt = "";
    }

    function renderProfileModule(chapter) {
      return `
        <div class="profile-thread">
          ${chapter.path.map(item => `
            <article class="thread-item">
              <span>${item.kicker}</span>
              <strong>${item.title}</strong>
              <p>${item.text}</p>
            </article>
          `).join("")}
        </div>
      `;
    }

    function renderTimelineModule(chapter) {
      return `
        <div class="timeline-sheet">
          ${chapter.timeline.map(item => `
            <article class="timeline-item">
              <span>${item.kicker}</span>
              <strong>${item.title}</strong>
              <p>${item.text}</p>
            </article>
          `).join("")}
        </div>
      `;
    }

    function renderProductModule(chapter) {
      return `
        <div class="product-preview-grid">
          ${chapter.products.map(product => {
            const linkAttrs = product.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : "";
            return `
              <article class="product-preview-card">
                <div class="preview-screen preview-screen--${product.preview}" aria-hidden="true"></div>
                <div class="product-copy">
                  <h3>${product.title}</h3>
                  <p>${product.cn}</p>
                  <p>${product.desc}</p>
                  <div class="mini-tags">${tagsHTML(product.tags)}</div>
                  <a class="preview-button" href="${product.href}"${linkAttrs}>${product.cta} →</a>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      `;
    }

    function renderAnalysisModule(chapter) {
      return `
        <div class="analysis-flow">
          ${chapter.flow.map(step => `
            <div class="flow-node">
              <strong>${step.name}</strong>
              <span>${step.text}</span>
            </div>
          `).join("")}
        </div>
        <div class="analysis-modules">
          ${chapter.analysisCards.map(card => `
            <article class="analysis-card">
              <span>${card.kicker}</span>
              <strong>${card.title}</strong>
              <p>${card.text}</p>
            </article>
          `).join("")}
        </div>
      `;
    }

    function escapeAttr(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    function visualImageCardHTML(item, gallery, index, isDuplicate) {
      const hiddenAttrs = isDuplicate ? ' aria-hidden="true" tabindex="-1"' : ' tabindex="0"';
      const fitClass = item.fit === "contain" ? "image-contain" : "image-cover";
      return `
        <figure class="visual-card ${fitClass}"
          role="button"${hiddenAttrs}
          data-full="${escapeAttr(item.full || item.src)}"
          data-title="${escapeAttr(item.title)}"
          data-caption="${escapeAttr(item.desc || gallery.title)}">
          <div class="visual-image-frame visual-image-frame--${item.visual || "image"}">
            <img class="visual-image" src="${escapeAttr(item.src)}" alt="${escapeAttr(item.title)}" loading="lazy" decoding="async" onerror="handleVisualImageError(this)">
          </div>
          <figcaption class="card-copy">
            <span class="mini-pill">${item.tag}</span>
            <h5>${item.cn || item.title}</h5>
            <div class="visual-title-en">${item.title}</div>
            <p>${item.desc}</p>
          </figcaption>
        </figure>
      `;
    }

    function visualStorytellingHTML(chapter) {
      const intro = chapter.visualIntro;
      return `
        <article class="chapter-section chapter-section--visual-storytelling" id="chapter-${chapter.no}">
          <div class="details-head">
            <div>
              <div class="details-kicker">Chapter ${chapter.no}</div>
              <h2 class="details-title">${chapter.title}</h2>
              <div class="details-cn">${chapter.cn}</div>
            </div>
          </div>

          <section class="visual-storytelling-intro">
            <div>
              <div class="visual-intro-label">${intro.label}</div>
              <h3>${intro.title}</h3>
            </div>
            <div>
              <p>${intro.text}</p>
              <div class="visual-story-flow">${intro.flow.map(item => `<span class="tag">${item}</span>`).join("")}</div>
            </div>
          </section>

          ${chapter.galleries.map((gallery, galleryIndex) => {
            const loopItems = [...gallery.items, ...gallery.items];
            return `
              <section class="visual-gallery visual-gallery-block visual-gallery--${gallery.variant}">
                <aside class="visual-gallery-meta">
                  <div>
                    <div class="visual-gallery-title-row">
                      <div class="visual-gallery-index">${String(galleryIndex + 1).padStart(2, "0")}</div>
                      <div class="visual-gallery-heading">
                        <h3>${gallery.title}</h3>
                        <h4>${gallery.cnTitle}</h4>
                      </div>
                    </div>
                    <p>${gallery.desc}</p>
                  </div>
                  <div class="visual-tag-wrap">${gallery.keywords.map(keyword => `<span class="tag">${keyword}</span>`).join("")}</div>
                </aside>

                <div class="visual-marquee-shell">
                  <div class="visual-marquee-track visual-track">
                    ${loopItems.map((item, index) => visualImageCardHTML(item, gallery, index, index >= gallery.items.length)).join("")}
                  </div>
                </div>
              </section>
            `;
          }).join("")}
        </article>
      `;
    }

    function renderVisualModule(chapter) {
      return visualStorytellingHTML(chapter);
    }

    function renderDetailModule(chapter) {
      if (chapter.detailType === "profile") return renderProfileModule(chapter);
      if (chapter.detailType === "timeline") return renderTimelineModule(chapter);
      if (chapter.detailType === "product") return renderProductModule(chapter);
      if (chapter.detailType === "analysis") return renderAnalysisModule(chapter);
      if (chapter.detailType === "visual") return renderVisualModule(chapter);
      return "";
    }

    function personalBackgroundHTML(chapter) {
      return `
        <article class="chapter-section chapter-section--profile" id="chapter-${chapter.no}">
          <div class="details-head">
            <div>
              <div class="details-kicker">Chapter ${chapter.no}</div>
              <h2 class="details-title">${chapter.title}</h2>
              <div class="details-cn">${chapter.cn}</div>
            </div>
          </div>

          <div class="personal-background-layout">
            <aside class="portrait-panel">
              <div class="portrait-frame">
                <img class="portrait-photo" src="assets/images/profile/gao-xiwen.jpg" alt="高熙雯个人照片" loading="lazy">
              </div>
            </aside>

            <section class="profile-summary-card">
              <div class="card-title-label">PROFILE SUMMARY</div>
              <h3 class="card-title-main">${chapter.projectCn}</h3>
              <div class="card-title-sub">${chapter.project}</div>
              <p>${chapter.projectDesc}</p>
              <div class="detail-tags">${tagsHTML(["Landscape Architecture", "Urban Research", "AI Product", "User Research"])}</div>
            </section>

            <div class="profile-info-stack">
              <article class="profile-info-card">
                <div class="info-label">Education Background</div>
                <h3>教育背景</h3>
                <p>南京农业大学风景园林硕士在读，获一等奖学金，专业排名前5%。</p>
              </article>
              <article class="profile-info-card">
                <div class="info-label">Research Foundation</div>
                <h3>研究基础</h3>
                <p>长期关注城市公园消费空间、公共性权衡、空间治理与用户偏好。</p>
              </article>
              <article class="profile-info-card">
                <div class="info-label">Career Direction</div>
                <h3>职业方向</h3>
                <p>希望将空间研究、数据分析和用户理解能力迁移到 AI 产品、用户研究和产品运营场景中。</p>
              </article>
            </div>
          </div>
        </article>
      `;
    }

    function internshipExperienceHTML(chapter) {
      return `
        <article class="chapter-section chapter-section--internship" id="chapter-${chapter.no}">
          <div class="details-head">
            <div>
              <div class="details-kicker">Chapter ${chapter.no}</div>
              <h2 class="details-title">${chapter.title}</h2>
              <div class="details-cn">${chapter.cn}</div>
            </div>
          </div>

          <div class="internship-card-list">
            ${chapter.internships.map((item, index) => `
              <article class="internship-card internship-card--tone-${index + 1}">
                <div class="internship-card-inner">
                  <aside class="internship-card-aside">
                    <div class="internship-meta">
                      <span class="internship-index">${String(index + 1).padStart(2, "0")}</span>
                      <span class="internship-label">${item.label}</span>
                    </div>
                    <h3 class="internship-title-line">${internshipTitleHTML(item.title)}</h3>
                    <div class="internship-role-en">${item.roleEn}</div>
                  </aside>
                  <div class="internship-divider" aria-hidden="true"></div>
                  <div class="internship-card-body">
                    <ul class="internship-bullet-list">${item.bullets.map(bullet => `<li>${bullet}</li>`).join("")}</ul>
                    <div class="internship-tags">${tagsHTML(item.tags)}</div>
                  </div>
                </div>
              </article>
            `).join("")}
          </div>
        </article>
      `;
    }

    function internshipTitleHTML(title) {
      return title.replace("｜", "｜<wbr>");
    }

    function prototypePillsHTML(tags) {
      return tags.map(tag => `<span class="prototype-pill">${tag}</span>`).join("");
    }

    function prototypeMockHTML(entry) {
      return `
        <div class="prototype-mock-window">
          <div class="prototype-dots"><i></i><i></i><i></i></div>
          <div class="prototype-mock-screenshot">
            <img src="${entry.screenshot}" alt="${entry.title} screenshot" loading="lazy">
          </div>
        </div>
      `;
    }

    function aiProductPrototypeHTML(chapter) {
      const prototype = chapter.prototype;
      return `
        <article class="chapter-section chapter-section--prototype" id="chapter-${chapter.no}">
          <div class="details-head">
            <div>
              <div class="details-kicker">Chapter ${chapter.no}</div>
              <h2 class="details-title">${chapter.title}</h2>
              <div class="details-cn">${chapter.cn}</div>
            </div>
          </div>

          <section class="prototype-overview">
            <article class="prototype-card prototype-overview-main">
              <div class="prototype-eyebrow">${prototype.overview.eyebrow}</div>
              <h3 class="prototype-project-name">${prototype.overview.subtitle}</h3>
              <div class="prototype-project-brand">${prototype.overview.name}</div>
              <p class="prototype-meta">${prototype.overview.meta}</p>
              <p class="prototype-intro">${prototype.overview.intro}</p>
              <div class="prototype-pills">${prototypePillsHTML(prototype.overview.tags)}</div>
            </article>

            <aside class="prototype-card prototype-demo-panel">
              <div class="prototype-eyebrow">Demo Entries</div>
              ${prototype.demos.map(demo => `
                <div class="prototype-demo-row">
                  <div><strong>${demo.title}</strong><br><span>${demo.label}</span></div>
                  <span class="prototype-arrow">↗</span>
                </div>
              `).join("")}
            </aside>
          </section>

          <div class="prototype-section-heading">
            <div>
              <div class="prototype-eyebrow">${prototype.entryHeading.eyebrow}</div>
              <h3>${prototype.entryHeading.title}</h3>
            </div>
            ${prototype.entryHeading.desc ? `<p>${prototype.entryHeading.desc}</p>` : ""}
          </div>

          <section class="prototype-entry-grid">
            ${prototype.entries.map(entry => `
              <a class="prototype-card prototype-entry-card prototype-entry-card--${entry.variant}" href="${entry.href}" target="_blank" rel="noopener noreferrer">
                ${prototypeMockHTML(entry)}
                <div class="prototype-entry-label">${entry.title}</div>
                <h3 class="prototype-entry-title">${entry.cn}</h3>
                <p class="prototype-entry-desc">${entry.desc}</p>
                <div class="prototype-entry-footer">
                  <div class="prototype-pills">${prototypePillsHTML(entry.tags)}</div>
                  <span class="prototype-button">${entry.cta}</span>
                </div>
              </a>
            `).join("")}
          </section>

          <section class="prototype-detail-stack">
            ${prototype.details.map(detail => `
              <article class="prototype-card prototype-detail-card" id="${detail.id}">
                <div class="prototype-detail-main">
                  <div class="prototype-eyebrow">${detail.eyebrow}</div>
                  <h3>${detail.title}</h3>
                  <p class="prototype-body-copy">${detail.body}</p>
                  ${detail.workflow ? `
                    <section class="prototype-workflow" aria-label="${detail.workflow.title}">
                      <div class="prototype-workflow-head">
                        <div class="prototype-workflow-title">${detail.workflow.title}</div>
                        <div class="prototype-workflow-label">${detail.workflow.label}</div>
                      </div>
                      <ol class="prototype-workflow-steps">
                        ${detail.workflow.steps.map(step => `
                          <li class="prototype-workflow-step">
                            <span class="prototype-workflow-no">${step.no}</span>
                            <strong>${step.cn}</strong>
                            <em>${step.en}</em>
                          </li>
                        `).join("")}
                      </ol>
                    </section>
                  ` : ""}
                </div>
                <div class="prototype-value-box">
                  <h4>${detail.valueTitle}</h4>
                  <p>${detail.value}</p>
                  <ul class="prototype-highlight-list">${detail.highlights.map(item => `<li>${item}</li>`).join("")}</ul>
                </div>
              </article>
            `).join("")}

            <article class="prototype-card prototype-summary-card" id="${prototype.summary.id}">
              <div>
                <div class="prototype-eyebrow">${prototype.summary.eyebrow}</div>
                <h3>${prototype.summary.title}</h3>
              </div>
              <div>
                <p>${prototype.summary.body}</p>
                <div class="prototype-pills">${prototypePillsHTML(prototype.summary.tags)}</div>
              </div>
            </article>
          </section>
        </article>
      `;
    }

    function dataAnalysisHTML(chapter) {
      const data = chapter.dataAnalysis;
      return `
        <article class="chapter-section chapter-section--data-analysis" id="chapter-${chapter.no}">
          <div class="details-head data-analysis-header">
            <div>
              <div class="details-kicker">Chapter ${chapter.no}</div>
              <h2 class="details-title">${chapter.title}</h2>
              <div class="details-cn">${chapter.cn}</div>
            </div>
          </div>

          <section class="data-analysis-flow-wrap" aria-label="Data analysis workflow">
            <div class="data-analysis-flow-title">
              <span class="label">${data.flowLabel}</span>
              <span class="line"></span>
            </div>
            <div class="data-analysis-flow">
              ${data.flow.map(step => `
                <div class="data-analysis-flow-node"><strong>${step.name}</strong><span>${step.text}</span></div>
              `).join("")}
            </div>
            <div class="data-analysis-flow-note">
              <p>${data.intro}</p>
            </div>
          </section>

          <section class="data-analysis-cards">
            ${data.cards.map((card, index) => `
              <article class="data-analysis-card data-analysis-card--${index + 1}">
                <div class="data-analysis-card-top"><div class="data-analysis-num">${card.no}</div></div>
                <div class="data-analysis-card-title">
                  <div class="data-analysis-card-title-en">${card.title}</div>
                  <h3>${card.cn}</h3>
                </div>
                ${card.blocks.map(block => `
                  <div class="data-analysis-block${block.translation ? " data-analysis-block--translation" : ""}">
                    <div class="data-analysis-block-title">${block.title}</div>
                    <p>${block.text}</p>
                  </div>
                `).join("")}
                <div class="data-analysis-tags">${card.tags.map(tag => `<span class="data-analysis-tag">${tag}</span>`).join("")}</div>
              </article>
            `).join("")}
          </section>

          <div class="data-analysis-page-note">${data.note}</div>
        </article>
      `;
    }

    function chapterDetailHTML(chapter) {
      if (chapter.detailType === "profile") return personalBackgroundHTML(chapter);
      if (chapter.detailType === "internship") return internshipExperienceHTML(chapter);
      if (chapter.detailType === "prototype") return aiProductPrototypeHTML(chapter);
      if (chapter.detailType === "data-analysis") return dataAnalysisHTML(chapter);
      if (chapter.detailType === "visual") return visualStorytellingHTML(chapter);

      return `
        <article class="chapter-section" id="chapter-${chapter.no}">
          <div class="details-head">
            <div>
              <div class="details-kicker">Chapter ${chapter.no}</div>
              <h2 class="details-title">${chapter.title}</h2>
              <div class="details-cn">${chapter.cn}</div>
            </div>
          </div>

          <div class="open-book">
            <div class="page-left">
              <div class="page-label">${chapter.leftLabel || "Chapter Overview"}</div>
              <p>${chapter.intro}</p>
              <div class="project-card">
                <span class="folio-code">${chapter.code || `Chapter ${chapter.no}`}</span>
                <strong>${chapter.project}</strong>
                <p>${chapter.projectDesc}</p>
                <div class="detail-tags">${tagsHTML(chapter.evidenceTags || chapter.tags)}</div>
              </div>
            </div>
            <div class="page-right">
              <div class="page-label">${chapter.rightLabel || "Ability Evidence"}</div>
              <p class="evidence-lead">${chapter.evidenceLead}</p>
              <div class="ability-list">${chapter.abilities.map(item => `<div class="ability">${item}</div>`).join("")}</div>
              <div class="detail-module">${renderDetailModule(chapter)}</div>
            </div>
          </div>
        </article>
      `;
    }

    function renderAllDetails() {
      detailsList.innerHTML = chapters.map(chapterDetailHTML).join("");
    }

    function getActiveChapterSection() {
      return document.getElementById(`chapter-${chapters[activeIndex].no}`);
    }

    function scrollToActiveChapter(delay = 0) {
      window.clearTimeout(pendingChapterScroll);
      const runScroll = () => {
        getActiveChapterSection().scrollIntoView({ behavior: "smooth", block: "start" });
      };
      if (delay > 0) {
        pendingChapterScroll = window.setTimeout(runScroll, delay);
        return;
      }
      runScroll();
    }

    function renderChapter() {
      navButtons.forEach((btn, index) => {
        btn.classList.toggle("active", index === activeIndex);
      });

      document.querySelectorAll(".book").forEach((book) => {
        book.classList.toggle("active", Number(book.dataset.index) === selectedBookIndex);
      });

      updateSideNav(activeIndex);
    }

    function updateSideNav(index) {
      sideNavLinks.forEach((link, linkIndex) => {
        link.classList.toggle("is-current", linkIndex === index);
      });
    }

    function setActive(index, options = {}) {
      if (!chapters[index]) return;
      activeIndex = index;
      selectedBookIndex = index;
      renderChapter();
      if (options.scrollToChapter) {
        const revealDelay = options.revealBookFirst ? BOOK_COVER_REVEAL_DELAY : 0;
        scrollSpyPausedUntil = performance.now() + revealDelay + 900;
        scrollToActiveChapter(revealDelay);
      }
    }

    navButtons.forEach(btn => {
      btn.addEventListener("click", () => setActive(Number(btn.dataset.index), { scrollToChapter: true }));
    });

    sideNavLinks.forEach(link => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        setActive(Number(link.dataset.index), { scrollToChapter: true });
      });
    });

    if (sideNavToggle) {
      sideNavToggle.addEventListener("click", () => {
        setSideNavCollapsed(!sideNav.classList.contains("is-collapsed"), true);
      });
    }

    window.addEventListener("resize", () => {
      if (getSavedSideNavState() === null) {
        setSideNavCollapsed(shouldDefaultCollapseSideNav());
      }
    }, { passive: true });

    function syncActiveChapterFromScroll() {
      if (performance.now() < scrollSpyPausedUntil) return;

      const marker = Math.min(window.innerHeight * .38, 320);
      let nextIndex = activeIndex;

      chapters.forEach((chapter, index) => {
        const section = document.getElementById(`chapter-${chapter.no}`);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker * .35) {
          nextIndex = index;
        }
      });

      if (nextIndex !== activeIndex) {
        activeIndex = nextIndex;
        renderChapter();
      }
    }

    window.addEventListener("scroll", () => {
      requestAnimationFrame(syncActiveChapterFromScroll);
    }, { passive: true });

    detailsList.addEventListener("click", (event) => {
      const card = event.target.closest(".visual-card[data-full]");
      if (!card) return;
      openVisualLightbox(card);
    });

    detailsList.addEventListener("keydown", (event) => {
      const card = event.target.closest(".visual-card[data-full]");
      if (!card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openVisualLightbox(card);
      }
    });

    document.querySelectorAll("[data-lightbox-close]").forEach(control => {
      control.addEventListener("click", closeVisualLightbox);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && visualLightbox.classList.contains("is-open")) {
        closeVisualLightbox();
      }
    });

    initSideNavState();
    renderBooks();
    renderAllDetails();
    renderChapter();
