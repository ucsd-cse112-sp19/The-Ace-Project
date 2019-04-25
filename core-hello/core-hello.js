const template = document.createElement('template');
template.innerHTML = `
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

const langMap = {
  en: 'Hello World',
  pt: 'Olá Mundo',
  jp: 'こんにちは世界',
};

class CoreHello extends HTMLElement {
  static get observedAttributes() {
    return ['rainbow', 'lang'];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (this.hasAttribute('lang') && newVal in langMap) {
      this.shadowRoot.children[0].innerHTML = `${langMap[newVal]} <slot/>`;
    }

    if (this.hasAttribute('rainbow')) {
      this.shadowRoot.children[0].classList.add('rainbow-text');
    } else {
      this.shadowRoot.children[0].classList.remove('rainbow-text');
    }
  }
}

window.customElements.define('core-hello', CoreHello);
