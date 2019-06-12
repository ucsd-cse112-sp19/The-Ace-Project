
import CoreBase from '../core-base';

import htmlTemplate from './core-hello.html';
import cssTemplate from './core-hello.css';

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
export default class CoreHello extends CoreBase {
  static get observedAttributes() {
    return ['rainbow', 'lang'];
  }

  constructor() {
    super(htmlTemplate, cssTemplate);

    this.langMap = {
      en: 'Hello World',
      pt: 'Olá Mundo',
      jp: 'こんにちは世界',
    };
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
