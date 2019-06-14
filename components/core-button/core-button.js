// @ts-check

import CoreBase from '../core-base';

// @ts-ignore
import htmlTemplate from './core-button.html';
// @ts-ignore
import cssTemplate from './core-button.css';

/**
 * A simple button
 * @external
 * @module CoreButton
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

export default class CoreButton extends CoreBase {
  static get observedAttributes() {
    return ['type', 'size', 'round', 'disabled', 'plain', 'icon', 'loading'];
  }

  constructor() {
    super(htmlTemplate, cssTemplate);

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
    switch (attrName) {
      case 'icon':
        this.handleIconChanged(oldVal, newVal);
        break;
      case 'size':
        this.handleSizeChanged(newVal);
        break;
      case 'type':
        this.handleTypeChanged(newVal);
        break;
      case 'plain':
        this.handlePlainChanged(newVal);
        break;
      case 'loading':
        this.handleLoadingChanged();
        break;
      default:
        break;
    }
  }

  handleIconChanged(oldIcon, newIcon) {
    if (newIcon) {
      this.iconSlot.classList.add(newIcon);
    } else {
      this.iconSlot.classList.remove(oldIcon);
    }
  }

  handleSizeChanged(newSize) {
    this.style.setProperty('--main-padding', this.hasAttribute('size') ? this.sizeMap[newSize] : this.sizeMap.default);
  }

  handleTypeChanged(newType) {
    this.style.setProperty('--main-bg', this.bgMap[newType]);
  }

  handlePlainChanged(newVal) {
    const bg = this.style.getPropertyValue('--main-bg');
    this.style.backgroundColor = newVal !== null ? this.hex2rgba(bg || '#ffffff', 0.1) : bg;
  }

  handleLoadingChanged() {
    if (this.hasAttribute('loading')) {
      this.iconSlot.classList.add('el-icon-loading');
    } else {
      this.iconSlot.classList.remove('el-icon-loading');
    }
  }
}

window.customElements.define('core-button', CoreButton);
