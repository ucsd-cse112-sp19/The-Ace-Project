// @ts-check

/**
 * A simple button
 * @example <core-hello rainbow lang="pt"> Joseph </core-hello>
 * @property {string} [size="default"] - Button size. Accepts default | small | medium | mini
 * @property {string} [type="default"] - Button type Accepts default | primary | success | info | warning | danger
 * @property {boolean} [plain=false] - determine whether it's a plain button
 * @property {boolean} [round=false] - determine whether it's a round button
 * @property {boolean} [circle=false] - determine whether it's a circle button
 * @property {boolean} [loading=false] - determine whether it's loading
 * @property {boolean} [disabled=false] - disable the button
 * @playground
 * <core-button size='mini' type='danger' round plain> Hello world </core-button>
 */

class CoreButton extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'size', 'round', 'disabled', 'plain', 'icon', 'loading'];
  }

  constructor() {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <link rel="stylesheet" href="element-icons.css" />
    <style>
      :host {
        --main-font-size: 14px;
        --main-font-family: 'Helvetica Neue';
        --main-padding: 12px 20px;
        --main-bg: 'white';
        display: inline-block;
        text-align: center;
        font-size: var(--main-font-size);
        font-weight: 500;
        font-stretch: 100%;
        -webkit-font-smoothing: antialiased;
        font-family: var(--main-font-family);
        color: var(--main-color);
        background: var(--main-bg);
        cursor: pointer;
        transition: all 0.1s ease;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        padding: var(--main-padding);
        user-select: none;
      }

      :host([plain]:not([type])) {
        border: 1px solid #dcdfe6;
      }

      :host(:hover:not([type]):not([disabled])) {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
      }

      :host([type]) {
        border: none;
        color: white;
      }

      :host(:hover[type]:not([disabled]):not([plain])) {
        border: none;
        filter: brightness(1.1);
      }

      :host([plain]) {
        border: 1px solid var(--main-bg);
        color: var(--main-bg);
      }

      :host(:hover[plain]) {
        background: var(--main-bg) !important;
        color: white;
      }

      :host([disabled])  {
        filter: brightness(1);
        opacity: 0.4;
        cursor: not-allowed;
      }

      :host([round]) {
        border-radius: 20px;
      }

      :host([circle]) {
        border-radius: 50%;
        padding: 12px !important;
        width: 14px;
        height: 14px !important;
      }

      :host([type='text']) {
        padding: 12px 0;
        background: none;
        color: #409eff;
      }

      :host([type='text'][disabled]) {
        color: #606266;
      }


      :host(:hover[type='text']:not([disabled])) {
        color: #66b1ff;
      }

      :host([size='mini'],[size='small']) {
        font-size: 12px;
      }

      :host(:active[type]:not([disabled])) {
        filter: brightness(0.9) !important;
      }

      :host(:active:not([type]):not([disabled])) {
        border: 1px solid #3a8ee6 !important;
      }

      a {
        background: var(--main-bg-color);
      }

      :host([circle]) {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      </style>
      <span id='icon'></span>
      <a><slot/></a>
    `;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.button = this.shadowRoot.querySelector('a');
    this.bgMap = {
      default: 'white',
      primary: '#409eff',
      success: '#67c23a',
      info: '#909399',
      warning: '#e6a23c',
      danger: '#f56c6c',
    };
    this.sizeMap = {
      default: '12px 20px',
      medium: '10px 20px',
      small: '9px 15px',
      mini: '7px 15px',
    };
    this.iconSlot = this.shadowRoot.querySelector('#icon');

    this.hex2rgba = (hex, alpha = 1) => {
      const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
      return `rgba(${r},${g},${b},${alpha})`;
    };
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const bg = this.style.getPropertyValue('--main-bg');
    switch (attrName) {
      case 'icon':
        if (newVal) this.iconSlot.classList.add(newVal);
        else this.iconSlot.classList.remove(oldVal);
        break;
      case 'size':
        this.style.setProperty('--main-padding', this.hasAttribute('size') ? this.sizeMap[newVal] : this.sizeMap.default);
        break;
      case 'type':
        this.style.setProperty('--main-bg', this.bgMap[newVal]);
        break;
      case 'plain':
        this.style.backgroundColor = newVal !== null ? this.hex2rgba(bg || '#ffffff', 0.1) : bg;
        break;
      case 'loading':
        if (newVal) {
          this.iconSlot.classList.add('el-icon-loading');
        } else {
          this.iconSlot.classList.remove('el-icon-loading');
        }
        break;
      default:
        break;
    }
  }
}

window.customElements.define('core-button', CoreButton);
