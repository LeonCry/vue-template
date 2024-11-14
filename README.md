# SEACI-VUE 项目模板

## 编辑器

- 建议使用 `VSCode` 编辑器
- 打开项目会有推荐安装插件,建议一键安装

## 项目结构

├── public # 静态资源目录
│ ├── favicon.ico # 网站图标
│ └── index.html # HTML 模板
├── src # 源代码目录
│ ├── api # API 接口管理
│ ├── assets # 项目资源文件
│ │ ├── images # 图片资源
│ │ └── styles # 样式文件
│ ├── components # 公共组件
│ ├── router # 路由配置
│ ├── store # Vuex 状态管理
│ ├── utils # 工具函数
│ ├── views # 页面视图组件
│ ├── App.vue # 根组件
│ └── main.js # 入口文件
├── .env # 环境变量配置
├── .eslintrc.js # ESLint 配置
├── .gitignore # Git 忽略文件
├── package.json # 项目依赖配置
├── README.md # 项目说明文档

主要目录说明：

- `public`: 存放静态资源，不会被 webpack 处理
- `src/api`: 统一管理项目中的 API 接口
- `src/assets`: 存放项目资源文件，如图片、样式等
- `src/components`: 存放可复用的组件
- `src/router`: 路由配置文件
- `src/store`: Pinia 状态管理相关文件
- `src/utils`: 工具函数和通用方法
- `src/views`: 页面级组件
- `src/App.vue`: 应用程序的根组件
- `src/main.js`: 应用程序的入口文件'

## CSS拓展

- 使用 `tailwindcss` 编写样式

## 项目环境配置

- 项目环境变量配置文件：`.env.local` `.env.dev` `.env.pre` `.env.prod`

## 开箱即用

1. 配置

- 全局搜索 `project-name` 替换为你的项目目录名
- `.env.local` 中 `VITE_APP_TITLE_ZH` 替换为你的项目中文名称
- `.env.dev` `.env.pre` `.env.prod` 中 `VITE_PREFIX_URL` 一般用来表示接口前缀

2. 运行

- `pnpm install` 安装项目依赖
- `pnpm run dev/pre/prod` 启动项目
- `pnpm run build:dev/pre/prod` 打包项目

3. git 提交规范

- 使用 `pnpm cz` 提交代码,并按照提示输入提交信息

4. git 分支保护

- 默认保护 `main` `master` `pre` 分支, 如果需要修改, 请修改 `.husky/pre-commit` 文件
