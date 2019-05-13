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
          
        }
  
        :host(:hover, :not([disabled])) {
          filter: brightness(1.75);
          color: '#409eff';
        }
  
        a {
          text-decoration: none;
          color: '#606266';
        }
        a:hover{
          text-decoration: underline;
          color: '#409eff';
          }
        
        </style>
        <a href="https://element.eleme.io/#/en-US/component/link" target="_blank"><slot/></a>        
      `;
    //   <a><slot/></a>
    //   <a href="https://element.eleme.io" target="_blank" class="el-link el-link--default is-underline"><!----><span class="el-link--inner">default</span><!----></a>        
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(this.template.content.cloneNode(true));
      this.button = shadowRoot.querySelector('a');
      this.colMap = {
        default: '#606266',
        primary: '#409eff',
        danger: '#f56c6c',        
        success: '#67c23a',
        warning: '#e6a23c',
        info: '#909399',        
      };
      this.hovColMap = {
        default: '#409eff',
        primary: '#66b1ff',
        danger: '#f78989',        
        success: '#85ce61',
        warning: '#ebb563',
        info: '#a6a9ad',        
      };  
      this.disColMap = {
        default: '#c0c4cc',
        primary: '#a0cfff',
        danger: '#fab6b6',        
        success: '#b3e19d',
        warning: '#f3d19e',
        info: '#c8c9cc',        
      };            
      this.afterBorderMap = {
        default: '#409eff',
        primary: '#409eff',
        danger: '#f56c6c',        
        success: '#67c23a',
        warning: '#e6a23c',
        info: '#909399',        
      }; 
      this.underlineBorderMap = {
        primary: '#409eff',
        danger: '#f56c6c',        
        success: '#67c23a',
        warning: '#e6a23c',
        info: '#909399',        
      };       
    }
  
    attributeChangedCallback(attrName, oldVal, newVal) {
      console.log(attrName, 'changed from', oldVal, 'to', newVal);
      switch (attrName) {
        case 'type':
        //   this.style.color = (newVal && 'white') || '#606266';
        //   this.style.backgroundColor = this.colMap[newVal] || 'white';
          break;
        case 'href':
        // this.style..replace(newVal)
          break;          
        case 'underline':
        // should be changing on hover underline
          this.style.textDecoration = (this.hasAttribute('underline') && this.getAttribute('underline').toLowerCase() == 'false') ? 'none' : 'underline';
          break;
        case 'disabled':
          this.style.opacity = this.hasAttribute('disabled') ? '0.5' : '1';
          this.style.cursor = this.hasAttribute('disabled') ? 'not-allowed' : 'pointer';
          break;
        case 'icon':
          break;
        default:
          this.style.backgroundColor = 'black';
          this.style.borderRadius = '0px';
      }
    }
  }
  
  window.customElements.define('core-link', CoreLink);
  
