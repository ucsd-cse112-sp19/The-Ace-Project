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
    return ['value', 'v-model', 'disabled', 'name', 'checked', 'border'];
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
            color:#606266;
            padding-left: 10px;
          }
  
          :host(:hover){
            color:#409eff;
          }
          :host([checked]){
            color:#409eff;
          }
          :host([disabled]){
            color:#c0c4cc;
            cursor:not-allowed;
          }

          :host([border][checked]){
            border-color:#409eff;
          }

          :host([border][checked][disabled]){
            border-color:rgb(220, 223, 230);
          }

          :host([border]){
            border-width: 1px;
            border-style: solid;
            border-color: rgb(220, 223, 230);
            display: inline-block; 
            padding-left: 10px;
            padding-right: 20px;
            padding-top: 9px;
            padding-bottom: 9px;
            position: relative;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;       
          }
  
          </style>
          <div class="element">
          <span><input type="checkbox">&nbsp;<slot/></span> 
          </div>       
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
      case 'border':
        break;
      default:
        this.style.borderRadius = '0px';
    }
  }
}

window.customElements.define('core-checkbox', CoreCheckbox);
