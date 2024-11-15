# SEACI-VUE 项目模板

- github: https://github.com/LeonCry/vue-template

## 编辑器

- 建议使用 `VSCode` 编辑器
- 打开项目会有推荐安装插件,建议一键安装

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
