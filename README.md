# Portfolio Library

高熙雯个人作品集网站。当前项目已整理为纯静态前端结构，可以直接通过 GitHub Pages 部署。

## 项目结构

```text
portfolio-library/
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ main.js
├─ assets/
│  ├─ images/profile/
│  ├─ product/
│  └─ visual/
│     ├─ research/
│     └─ spatial/
├─ tests/
├─ package.json
└─ README.md
```

## 本地预览

不需要构建，直接打开 `index.html` 即可预览。也可以启动一个本地静态服务器：

```bash
npm run serve
```

然后访问：

```text
http://127.0.0.1:5178/
```

## GitHub Pages 部署

建议仓库名：

```text
portfolio-library
```

部署步骤：

1. 在 GitHub 账号 `jiangciii` 下创建仓库 `portfolio-library`。
2. 将本项目根目录文件上传或推送到仓库。
3. 打开仓库 `Settings` → `Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. `Branch` 选择 `main`，目录选择 `/ (root)`。
6. 保存后等待 Pages 构建完成。

部署后的访问地址类似：

```text
https://jiangciii.github.io/portfolio-library/
```

## 外部链接

项目内保留以下外部 Demo 链接：

- ChoiceCraft 设计端：https://jiangciii.github.io/choicecraft-frontend/choicecraft/index.html#overview
- 问卷受访者端：http://129.204.155.8/survey
- 数据后台端：http://129.204.155.8/admin/dashboard

## 检查

运行静态路径与页面结构检查：

```bash
npm test
```

当前项目使用相对路径引用本地资源，适配 GitHub Pages 的 `/portfolio-library/` 子路径部署。
