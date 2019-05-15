// @ts-check
/**
 * Text hyperlink
 * @example <core-link> Text </core-link>
 * @property {string} [href=""] - href
 * @property {string} [type="default"] - Button type
 * @property {string} [icon=""] - class name of icon
 * @property {boolean} [underline=true] - determine whether the component has underline
 * @property {boolean} [disabled=false] - determine whether the component is disabled
 * @playground <core-link> link </core-button>
 */

class CoreLink extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'href', 'underline', 'disabled', 'icon'];
  }

  constructor() {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = `
      <style>
        :host(*) {
          --main-font-size: 14px;
          --main-font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
          font-size: var(--main-font-size);
          font-family: var(--main-font-family);
          cursor: pointer;
          text-decoration: none;
        }

        :host(:hover:not([disabled]):not([underline="false"])) {
          text-decoration: underline;
        }
        
        :host([type="primary"]){color:#409eff}
        :host([type="danger"]){color:#f56c6c}        
        :host([type="success"]){color:#67c23a}
        :host([type="warning"]){color:#e6a23c}
        :host([type="info"]){color:#909399}

        :host(:hover){color:#409eff;}
        :host(:hover[type="primary"]){color:#66b1ff}
        :host(:hover[type="danger"]){color:#f78989}
        :host(:hover[type="success"]){color:#85ce61}
        :host(:hover[type="warning"]){color:#ebb563}
        :host(:hover[type="info"]){color:#a6a9ad}

        :host(:after){border-color:#409eff;}
        :host(:after[type="primary"]){border-color:#409eff}
        :host(:after[type="danger"]){border-color:#f56c6c}
        :host(:after[type="success"]){border-color:#67c23a}
        :host(:after[type="warning"]){border-color:#e6a23c}
        :host(:after[type="info"]){border-color:#909399}

        :host([disabled]){color:#c0c4cc;}
        :host([disabled][type="primary"]){color:#a0cfff}
        :host([disabled][type="danger"]){color:#fab6b6}
        :host([disabled][type="success"]){color:#b3e19d}
        :host([disabled][type="warning"]){color:#f3d19e}
        :host([disabled][type="info"]){color:#c8c9cc}

        :host(:after:hover:not([underline="false"][type="primary"]){border-color:#409eff}
        :host(:after:hover:not([underline="false"][type="danger"]){border-color:#f56c6c}
        :host(:after:hover:not([underline="false"][type="success"]){border-color:#67c23a}
        :host(:after:hover:not([underline="false"][type="warning"]){border-color:#e6a23c}
        :host(:after:hover:not([underline="false"][type="info"]){border-color:#909399}

        </style>
        <span><slot/></span>        
      `;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log(attrName, 'changed from', oldVal, 'to', newVal);
    switch (attrName) {
      case 'type':
        break;
      case 'href':
        this.addEventListener('click', () => {
          if (this.hasAttribute('target') && this.getAttribute('target') === '_blank') window.open(newVal);
          else window.location.assign(newVal);
        }, true);
        break;
      case 'underline':
        break;
      case 'disabled':
        // this.style.opacity = this.hasAttribute('disabled') ? '0.5' : '1';
        this.style.cursor = this.hasAttribute('disabled') ? 'not-allowed' : 'pointer';
        break;
      case 'icon':
        break;
      default:
        this.style.borderRadius = '0px';
    }
  }
}

window.customElements.define('core-link', CoreLink);
