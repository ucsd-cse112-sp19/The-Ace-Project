// @ts-check

/**
 * A simple button
 * @example <core-hello rainbow lang="pt"> Joseph </core-hello>
 * @property {string} [size="default"] - Button size
 * @property {string} [type="default"] - Button type
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
    return ['type', 'size', 'round', 'disabled', 'plain'];
  }

  constructor() {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <style>
      :host(*) {
        --main-font-size: 14px;
        --main-font-family: 'arial';
        --main-padding: '12px 20px';
        --main-bg: 'white';
        font-size: var(--main-font-size);
        font-family: var(--main-font-family);
        color: var(--main-color);
        background: var(--main-bg);
        cursor: pointer;
        transition: all 0.1s ease;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        padding: var(--main-padding);
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
        filter: brightness(1.2);
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

      :host([type='text']) {
        padding: 12px 0;
        background: none;
        color: #409eff;
      }

      :host(:hover[type='text']) {
        color: #66b1ff;
      }

      :host([size='mini'],[size='small']) {
        font-size: 12px;
      }

      a {
        background: var(--main-bg-color);
      }
      
      </style>
      <a><slot/></a>
    `;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.button = shadowRoot.querySelector('a');
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

    this.hex2rgba = (hex, alpha = 1) => {
      const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
      return `rgba(${r},${g},${b},${alpha})`;
    };
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const bg = this.style.getPropertyValue('--main-bg');
    switch (attrName) {
      case 'size':
        this.style.setProperty('--main-padding', this.hasAttribute('size') ? this.sizeMap[newVal] : this.sizeMap.default);
        break;
      case 'type':
        this.style.setProperty('--main-bg', this.bgMap[newVal]);
        break;
      case 'plain':
        this.style.backgroundColor = newVal !== null ? this.hex2rgba(bg || '#ffffff', 0.1) : bg;
        break;
      default:
        break;
    }
    // console.log(attrName, 'changed from', oldVal, 'to', newVal);
  }
}

window.customElements.define('core-button', CoreButton);
