// @ts-check
/**
 * Text hyperlink
 * @example <core-checkbox> Text </core-checkbox>
 * @property {string} [href=""] - href
 * @property {string} [type="default"] - Button type
 * @property {string} [icon=""] - class name of icon
 * @property {boolean} [underline=true] - determine whether the component has underline
 * @property {boolean} [disabled=false] - determine whether the component is disabled
 * @playground <core-checkbox> link </core-checkbox>
 */

class CoreCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'v-model', 'disabled', 'name', 'checked'];
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
  
          :host([disabled]){
            color:#c0c4cc;
            cursor:not-allowed;
          }
  
          </style>
          <span><input type="checkbox"><slot/></span>        
        `;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log(attrName, 'changed from', oldVal, 'to', newVal);
    switch (attrName) {
      case 'disabled':
        // this.style.cursor = this.hasAttribute('disabled') ? 'not-allowed' : 'pointer';
        this.shadowRoot.querySelector('input').style.cursor = this.hasAttribute('disabled') ? 'not-allowed' : 'pointer';
        this.shadowRoot.querySelector('input').disabled = true;
        break;
      case 'name':
        this.shadowRoot.querySelector('input').name = newVal;
        break;
      case 'checked':
        this.shadowRoot.querySelector('input').checked = true;
        break;
      default:
        this.style.borderRadius = '0px';
    }
  }
}

window.customElements.define('core-checkbox', CoreCheckbox);
