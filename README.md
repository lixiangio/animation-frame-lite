# animation-frame-lite

requestAnimationFrame()动画帧的简易封装。

## 功能

- 支持屏幕帧率自适应，在不同刷新率下保持动画速度一致

- 通过设置起止点，可实现一些简单的线性过渡需求

## 应用场景

- 滚动条过渡动效

- 数值加减动画

- 搭配 css3 动画使用

## 示例

```js
new AnimationFrame({
  start: 0,
  end: 1000,
  time: 200,
  frame(value) {
    window.scroll(0, value);
  },
});
```
