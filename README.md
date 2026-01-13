# Vue 3 项目模板
- github: https://github.com/LeonCry/vue-template
- cli: https://github.com/LeonCry/ice-sea-template-cli


一个基于 Vue 3 + Vite 7 + TypeScript 5 的现代前端模板，集成 Pinia、Vue Router、Element Plus、Tailwind CSS v4、自动导入、组件解析、LightningCSS 构建优化、提交规范与钩子等工程能力。


## 插件（vscode）
- 打开项目会有推荐安装插件,建议一键安装

## 要求
- Node >= v24
- 推荐使用 pnpm 作为包管理器

## 技术栈
- 框架：Vue 3（组合式 API）
- 构建：Vite 7
- 语言：TypeScript 5
- 状态管理：Pinia（含持久化 pinia-plugin-persistedstate）
- 路由：Vue Router 4（Hash 路由）
- UI：Element Plus（自动解析）
- 样式：Tailwind CSS v4（@tailwindcss/vite，LightningCSS 压缩）
- 网络：ky（轻量 HTTP 客户端）
- 规范：ESLint（@antfu/eslint-config）、Commitlint、Commitizen + cz-git、Husky + lint-staged
- 兼容：@vitejs/plugin-legacy（按 browserslist 生成现代目标）

## 快速开始
```bash
# 安装依赖
pnpm install

# 开发环境
pnpm dev
pnpm pre  
pnpm prod

# 构建产物
pnpm build:dev
pnpm build:pre
pnpm build:prod

```

## 目录结构
```
.
├─ src/
│  ├─ components/        # 业务组件
│  ├─ pages/             # 页面组件
│  ├─ layouts/           # 布局组件
│  ├─ router/            # 路由定义
│  ├─ stores/            # Pinia 仓库
│  ├─ utils/             # 工具方法
│  ├─ types/             # 类型定义
│  ├─ App.vue            
│  └─ main.ts                     
├─ .env*                 # 环境变量
```

## 提交与规范
- 启用 Git 钩子
  ```bash
  pnpm prepare
  ```
- 规范化提交（内置中文交互）
  ```bash
  pnpm cz
  ```
- 预提交钩子
  - 分支保护：.husky/pre-commit 中 PROTECTED_BRANCHES="main|master" 设置分支保护。
  - 执行 `lint-staged`：对变更的 `js/ts/vue` 文件运行 ESLint 自动修复。

## 浏览器兼容
- `browserslist`: `defaults, Chrome >= 87`

## git提交

- git 提交规范: 使用 `npm|pnpm cz` 提交代码,并按照提示输入提交信息
- git 分支保护: 默认保护 `main` `master` `pre` 分支

- `npm install` 安装项目依赖
- `npm run dev/pre/prod` 启动项目
- `npm run build:dev/pre/prod` 打包项目

## 代码编写规范

### 命名

1. 常量使用**大写字母+下划线**形式

```js
export const THIS_IS_CONSTANT = "一个常量";
```

2. 命名不要以下划线开头或结尾
3. 图像文件名采用 **下划线连接式**
4. css文件名采用小写方式， 优先选择单个单词命名，多个单词命名以短横线分隔
5. js文件名全部采用小写方式， 优先选择单个单词命名，多个单词命名以短横线分隔。
6. 文件扩展名为 .vue 的组件名应该始终是单词大写开头 (PascalCase)。
7. Vue Router Path命名采用 kebab-case 格式
8. 工具类函数采用 kebab-case 格式

### CSS

1. 避免使用 CSS 的 @import，会阻塞渲染

   ```css
   <!-- bad -->
   <style>
     @import url("more.css");
   </style>

   <!-- good -->
   <link rel="stylesheet" href="more.css">
   ```

2. 尽量不要使用 **!important** 重写样式

### JS

1. 转换为**数字**推荐Number() / parseInt()

   ```js
   const str = "1";

   // bad
   // const num = +str;
   // const num1 = new Number(str);

   // good
   const num2 = Number(str);
   // good
   const num3 = Number.parseInt(str, 10);
   console.log(num2, num3);
   ```

2. 转换为**字符串**推荐使用String() / 模板字符串\`${}`

   ```js
   const num = 1;

   // bad
   // const str = num + ''; // 若num为对象会调用.valueOf() 或 .toString() 行为差异性
   // const str2 = num.toString(); // 行为差异性

   // good
   const str3 = String(num);
   const str4 = `${num}`;
   console.log(str3, str4);
   ```

3. 避免不必要的类型转换，在条件语句中，将表达式的结果强制转换成布尔值是多余的

   ```js
   // bad
   if (foo) {
     // ...
   }
   ```

4. 不要给参数重新赋值，这可能导致意外的行为和内核优化问题(**保持函数的“纯函数”特性**)

   ```js
   // bad
   const f1 = function f1(obj) {
     obj.key = 1;
   };
   const originalObj = { key: 0 };
   f1(originalObj);
   console.log(originalObj); // => { key: 1 }

   // bad
   function foo(bar, baz) {
     if (!baz) {
       bar = 1;
     }
   }
   console.log(foo);
   ```

5. 需要迭代运算时，应优先使用 JS 提供的**高阶函数**，减少直接使用 for 循环（包括 for-in 和 for-of）。

6. 避免嵌套的三元表达式.

   ```js
   // bad
   // const foo = bar ? baz : qux === quxx ? bing : bam;

   // good
   const qu = qux === quxx ? bing : bam;
   const foo = bar ? baz : qu;
   console.log(foo);
   ```

7. 控制语句的嵌套层级不要超过 **4** 级.

8. 生产环境禁止使用 console

### TS

1. 简单数组类型的定义使用 `T[]`，复杂类型使用 `Array<T>`
2. 接口相关类型全部定义在`/types/api.d.ts`中，命名方式为 `简单名称+API`
3. 定义类型时，如果仅在单文件中使用，则可以直接定义在该文件中，如果有其他文件需要引用该类型，请写到`/types/xxx.d.ts`中
4. 通用类型请定义在`global.d.ts`中
