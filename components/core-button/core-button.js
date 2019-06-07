// @ts-check

// @ts-ignore
import htmlTemplate from './core-button.html';
// @ts-ignore
import cssTemplate from './core-button.css';

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
    return ['type', 'size', 'round', 'disabled', 'plain', 'icon', 'loading'];
  }

  constructor() {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = htmlTemplate;
    this.styleNode = document.createElement('style');
    this.styleNode.innerHTML = cssTemplate;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.template.content.cloneNode(true));
    shadowRoot.appendChild(this.styleNode);

    this.button = this.shadowRoot.querySelector('a');
    this.bgMap = {
      default: 'green' /** was white */,
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
