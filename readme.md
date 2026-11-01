# 花哨呀i

** 前端、 3D、 ESP32。

[B站](https://space.bilibili.com/1033979526) · [Otto 编舞台](https://github.com/huashaoya/otto-choreographer) · [flower-ui](https://huashaoya.github.io/flower-ui/)

---

## 作品

### Otto 在线编舞台

<img src="https://raw.githubusercontent.com/huashaoya/otto-choreographer/main/docs/screenshot.png" width="560" alt="Otto 在线编舞台 3D 界面" />

单文件 HTML、零依赖的六轴机器人 3D 编舞工具。拖动六个滑块实时预览姿态，用关键帧和振荡帧编排动作，自动生成固件可直接执行的 `servo_sequences` JSON，再通过 WebSocket 下发给真机。

3D 模型按实物 69×110×115 mm 比例装配，内嵌原始 3MF 网格。整份应用 4 MB，双击即开 —— 不需要 npm、构建，也不需要本地服务。

[在线试玩](https://huashaoya.github.io/otto-choreographer/) · [源码](https://github.com/huashaoya/otto-choreographer) · [设计文档](https://github.com/huashaoya/otto-choreographer/blob/main/DESIGN.md)

### Daily Worlds

<img src="https://raw.githubusercontent.com/huashaoya/daily-worlds/main/docs/screenshot.jpg" width="560" alt="Daily Worlds 界面" />

每天自动生成 9 个随机世界的页面。3×3 的窗格各展示一个 AI 生成的世界和一段配文故事，点进任意细节可以继续放大探索，再用「视角变换」或「故事延伸」生成新的分支 —— 探索路径会自己长成一棵树，随时能回看走过哪里。

Vue 3 + Vite 前端，Node 后端接豆包与 MiniMax 的图像和文本模型。

[源码](https://github.com/huashaoya/daily-worlds) · [演示视频](https://www.bilibili.com/video/BV139Gm6REkn/)

### flower3D · 16★

基于 Three.js + Cannon.js 的 Vue 3 组件库，把世界、相机、碰撞体、动画封装成声明式组件，写 3D 场景像写普通模板。

[源码](https://github.com/huashaoya/flower3D) · [演示视频](https://www.bilibili.com/video/BV1dF4m1T7ua/)

### flower-ui · 7★

Vue 组件库，字节跳动前端青训营大作业。

[在线预览](https://huashaoya.github.io/flower-ui/) · [源码](https://github.com/huashaoya/flower-ui)

### 医疗辅助系统 · 8★

基于癌症治疗的医疗辅助系统，计算机设计大赛参赛作品，Vue 3 + TypeScript 全栈实现。

[源码](https://github.com/huashaoya/medical-assistance)

---

## 技术栈

TypeScript · JavaScript · Vue 3 · Three.js · Node.js · Java · Python · ESP-IDF / ESP32

---

<sub>视频都发在 [B站](https://space.bilibili.com/1033979526)。</sub>
