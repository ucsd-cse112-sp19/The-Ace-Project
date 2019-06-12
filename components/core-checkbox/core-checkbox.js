// @ts-check

import CoreBase from '../core-base';

// @ts-ignore
import htmlTemplate from './core-checkbox.html';
// @ts-ignore
import cssTemplate from './core-checkbox.css';

/**
 * A checkbox that can be clicked on.
 * @module CoreCheckbox
 * @example <core-checkbox> Text </core-checkbox>
 * @property {string} [name="default"] - The name of the button
 * @property {boolean} [border=false] - Determines if border will be rendered.
 * @property {boolean} [checked=false] - If present, the checkbox will be checked.
 * @property {boolean} [disabled=false] - Determines if the checkbox is disabled.
 * @playground <core-checkbox> Checkbox </core-checkbox>
 */

class CoreCheckbox extends CoreBase {
  static get observedAttributes() {
    return ['value', 'v-model', 'disabled', 'name', 'checked', 'border'];
  }

  constructor() {
    super(htmlTemplate, cssTemplate);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case 'disabled':
        this.shadowRoot.querySelector('input').style.cursor = this.hasAttribute('disabled') ? 'not-allowed' : 'pointer';
        this.shadowRoot.querySelector('input').disabled = this.hasAttribute('disabled');
        break;
      case 'name':
        this.shadowRoot.querySelector('input').name = newVal;
        break;
      case 'checked':
        this.shadowRoot.querySelector('input').checked = this.hasAttribute('checked');
        break;
      case 'border':
        break;
      default:
        this.style.borderRadius = '0px';
    }
  }
}

window.customElements.define('core-checkbox', CoreCheckbox);
