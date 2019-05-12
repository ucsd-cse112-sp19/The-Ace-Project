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
 * @playground <core-button> Hi </core-button>
 */


class CoreButton extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'size', 'round', 'disabled'];
  }

  constructor() {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = `
    <style>
      :host(*) {
        --main-font-size: 18px;
        --main-font-family: 'arial';
        font-size: var(--main-font-size);
        font-family: var(--main-font-family);
        color: var(--main-color);
        cursor: pointer;
        
      }

      :host(:hover, :not([disabled])) {
        filter: brightness(1.75);
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
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log(attrName, 'changed from', oldVal, 'to', newVal);
    switch (attrName) {
      case 'size':
        this.style.padding = this.sizeMap[newVal];
        break;
      case 'type':
        this.style.color = (newVal && 'white') || '#606266';
        this.style.backgroundColor = this.bgMap[newVal] || 'white';
        break;
      case 'round':
        this.style.borderRadius = this.hasAttribute('round') ? '20px' : '0px';
        break;
      case 'disabled':
        this.style.opacity = this.hasAttribute('disabled') ? '0.5' : '1';
        this.style.cursor = this.hasAttribute('disabled') ? 'not-allowed' : 'pointer';
        break;
      default:
        this.style.backgroundColor = 'black';
        this.style.paddingTop = this.sizeMap.default;
        this.style.paddingBottom = this.sizeMap.default;
        this.style.borderRadius = '0px';
    }
    // if (this.hasAttribute('rainbow')) {
    //   this.shadowRoot.children[0].classList.add('rainbow-text');
    // } else {
    //   this.shadowRoot.children[0].classList.remove('rainbow-text');
    // }
  }
}

window.customElements.define('core-button', CoreButton);
