// @ts-check

import CoreBase from '../core-base';

// @ts-ignore
import htmlTemplate from './core-link.html';
// @ts-ignore
import cssTemplate from './core-link.css';

/**
 * Text hyperlink
 * @example <core-link> Text </core-link>
 * @property {string} [href=""] - href
 * @property {string} [type="default"] - Button type
 * @property {string} [icon=""] - class name of icon
 * @property {boolean} [underline=true] - determine whether the component has underline
 * @property {boolean} [disabled=false] - determine whether the component is disabled
 * @playground <core-link> link </core-link>
 */

export default class CoreLink extends CoreBase {
  static get observedAttributes() {
    return ['type', 'href', 'underline', 'disabled', 'icon'];
  }

  constructor() {
    super(htmlTemplate, cssTemplate);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'type':
        break;
      case 'href':
        this.addEventListener('click', this.createOnClickListener(window, newVal), true);
        break;
      case 'underline':
        break;
      case 'disabled':
        this.style.cursor = this.hasAttribute('disabled') ? 'not-allowed' : 'pointer';
        break;
      case 'icon':
        break;
      default:
        this.style.borderRadius = '0px';
    }
  }

  createOnClickListener(window, newLocation) {
    return () => {
      if (this.hasAttribute('target') && this.getAttribute('target') === '_blank') {
        window.open(newLocation);
      } else {
        window.location.assign(newLocation);
      }
    };
  }
}

window.customElements.define('core-link', CoreLink);
