export default class {
  /**
   * @param {object} options 配置选项
   * @param {number} options.start 起点，单位px
   * @param {number} options.end 终点，单位px
   * @param {number} options.time 时间，单位ms
   */
  constructor(options = {}) {

    this.options = options;

    const { start = 0, end = 0, time = 1000 } = options;

    if (start === end) return;

    const distance = end - start;

    this.value = start;
    let lastTime;

    this.animationFrame = timestamp => {

      if (lastTime === undefined) {
        lastTime = timestamp;
        return window.requestAnimationFrame(this.animationFrame);
      }

      if (this.value === end) return;

      const periodTime = timestamp - lastTime; // 帧周长
      const count = time / periodTime; // 滚动次数
      const step = distance / count; // 单帧步长，px

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

      options.frame(this.value);

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