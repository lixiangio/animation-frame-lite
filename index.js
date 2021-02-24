export default class {
  /**
   * 
   * @param {object} options 配置选项
   * @param {number} start 起点，单位px
   * @param {number} end 终点，单位px
   * @param {number} speed 速度，单位px/s
   */
  constructor(options = {}) {
    this.options = options;
    const { start = 0, end, speed, frame } = options;

    if (start === end) return;

    const distance = end - start;
    const totalTime = Math.abs(distance) / speed * 1000; // 过渡需要时长(ms)
    this.value = start;
    let lastTime;

    this.animationFrame = timestamp => {
      if (lastTime === undefined) {
        lastTime = timestamp;
        return window.requestAnimationFrame(this.animationFrame);
      }

      if (this.value === end) return;

      const frameRate = timestamp - lastTime; // 帧率
      const count = totalTime / frameRate; // 滚动次数
      const step = distance / count; // 单帧步长

      this.value += step;

      // 超限补齐
      if (distance > 0) {
        if (this.value > end) {
          this.value = end;
        }
      } else if (distance < 0) {
        if (this.value < end) {
          this.value = end;
        }
      }

      frame(this.value);

      lastTime = timestamp;

      window.requestAnimationFrame(this.animationFrame);
    };
    window.requestAnimationFrame(this.animationFrame);

  }
  /**
   * 停止
   */
  stop() {
    this.value = this.options.end;
  }
  /**
   * 继续
   */
  continue() {
    window.requestAnimationFrame(this.animationFrame);
  }
}