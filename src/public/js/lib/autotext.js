export default class TxtRotate {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
  }

  run() {
    this.tick();
    this.isDeleting = false;
  }

  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

    const that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum += 1;
      delta = 500;
    }

    setTimeout(() => {
      that.tick();
    }, delta);
  }
}

export const handleAutoTypingTexts = () => {
  const elements = document.querySelectorAll('.txt-rotate');
  if (!elements) return;

  window.addEventListener('load', () => {
    elements.forEach((el) => {
      const toRotate = el.dataset.rotate;
      const { period } = el.dataset;
      if (toRotate) {
        const txtRotate = new TxtRotate(el, JSON.parse(toRotate), period);
        txtRotate.run();
      }
    });

    // INJECT CSS
    const css = document.createElement('style');
    css.setAttribute('type', 'text/css');
    css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }';
    document.body.appendChild(css);
  });
};
