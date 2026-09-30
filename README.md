# 待办清单（todo-vue）

Vue 3 + TypeScript + Vite 写的待办清单，阶段 3 的练习项目 —— 把阶段 2 那套原生 JS 的思路，改写成**组件化 + 类型化 + 数据驱动**。

在线体验：https://longdandan-dev.github.io/todo-vue/

## 功能

- 列表渲染：`v-for` + `:key`，序号由数据顺序算出
- 添加：`v-model` 双向绑定草稿，点按钮即可加
- 勾选：已完成的行加左侧竖条 + 浅底 + 删除线（三个信号一起说，不只靠颜色）
- 删除：单条删除
- 三栏筛选：全部 / 已完成 / 未完成 —— 由 `computed` 派生，**不改动原数据**
- 持久化：`localStorage` 存盘，刷新不丢
- **坏数据校验**：从 `localStorage` 读回来的数据先检查形状，不合格就整包丢弃（不让脏数据渲染上去）
- 空状态：「今天没事，去休息！」
- 响应式：桌面 1440 / 手机 375 两档均无横向溢出

## 技术栈

Vue 3.5 · TypeScript 6 · Vite 8。

## 本地运行

```powershell
npm install
npm run dev
```

## 常用命令

| 命令                 | 干什么                                           |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | 起开发服务器（带热更新）                         |
| `npm run build`      | 类型检查 + 打包到 `docs/`                        |
| `npm run preview`    | 本地预览**打包产物**（上线前必看这个，不是 dev） |
| `npm run type-check` | 只跑类型检查（`vue-tsc --noEmit`）               |
| `npm run format`     | Prettier 格式化 `src/`                           |

## 目录结构

```
index.html                     页面骨架
vite.config.ts                 打包配置（base 子路径 / 产物输出到 docs）
package.json                   项目信息与运行脚本
src/main.ts                    入口：创建应用并挂载
src/App.vue                    状态、派生筛选、持久化、恢复校验、模板
src/components/TodoItem.vue    单行组件：props 进、emit 出
src/data/todos.ts              初始数据 + Todo 类型定义
src/style.css                  设计令牌与全局样式
docs/                          打包产物，GitHub Pages 从这里发布
```

## 说明

本项目是学习项目
