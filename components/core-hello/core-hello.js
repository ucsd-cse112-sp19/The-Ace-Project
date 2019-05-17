/**
 * A custom element that renders Hello World followed by whatever
 * children it is given. </br>
 * It can also accept the attributes <code>lang</code> to change the
 * Hello World language and <code>rainbow</code> for extra swag
 * @example <core-hello rainbow lang="pt"> Joseph </core-hello>
 * @property {string} [lang="en"] - Language of Hello World - Accepts "en" | "jp" | "pt"
 * @property {boolean} [rainbow=false] - If present, animates the text with a rainbow effect
 * @playground <core-hello lang='jp' rainbow> Peter </core-hello>
 */
export default class CoreHello extends HTMLElement {
  static get observedAttributes() {
    return ['rainbow', 'lang'];
  }

  constructor() {
    super();
    this.template = document.createElement('template');
    this.langMap = {
      en: 'Hello World',
      pt: 'Olá Mundo',
      jp: 'こんにちは世界',
    };
    this.template.innerHTML = `
      <div> Hello World <slot/></div>
      <style>
      :host {
        --main-font-size: 18px;
        --main-font-family: 'arial'; 
      }

      .rainbow-text {
        background-image: repeating-linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);   -webkit-background-clip: text;
        color: transparent;
        animation: hue 8s ease infinite;
      }

      div {
        font-size: var(--main-font-size);
        font-family: var(--main-font-family);
      }

      @keyframes hue {
        from {
          filter: hue-rotate(0deg);
        }
        to {
          filter: hue-rotate(-360deg);
        }
      }
    </style>
  `;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (this.hasAttribute('lang') && newVal in this.langMap) {
      this.shadowRoot.children[0].innerHTML = `${this.langMap[newVal]} <slot/>`;
    }

    if (this.hasAttribute('rainbow')) {
      this.shadowRoot.children[0].classList.add('rainbow-text');
    } else {
      this.shadowRoot.children[0].classList.remove('rainbow-text');
    }
  }
}

window.customElements.define('core-hello', CoreHello);
