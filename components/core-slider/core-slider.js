
// @ts-check

// @ts-ignore
import htmlTemplate from './core-slider.html';

// @ts-ignore
import cssTemplate from './core-slider.css';

/**
 * A basic slider
 * @example ---
 * @property {float} [value = 0]  - the binded value of the slider. Default is set to 0.
 * @property {float} [min = 0]    - the minimum value of the slider. Default is set to 0.
 * @property {float} [max = 100]  - the maximum value of the slider. Default is set to 100.
 * @property {float} [step = 1]   - the size of the step.           Default is set to 1
 */

class CoreSlider extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'min', 'max', 'step'];
  }

  constructor() {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = htmlTemplate;
    this.styleNode = document.createElement('style');
    this.styleNode.innerHTML = cssTemplate;
    this.value = 50;


    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.template.content.cloneNode(true));
    shadowRoot.appendChild(this.styleNode);

    this.slider = shadowRoot.querySelector('input');
  }

  connectedCallback() {
    const initialValue = this.getAttribute('value');
    if (initialValue) {
      this.slider.value = initialValue;
    }
    this.slider.addEventListener('input', (ev) => {
      // @ts-ignore
      this.value = ev.target.value;
    });
    const initialmin = this.getAttribute('min');
    if (initialmin) {
      this.slider.min = initialmin;
    }
    const initialmax = this.getAttribute('max');
    if (initialmax) {
      this.slider.max = initialmax;
    }
    const initialstep = this.getAttribute('step');
    if (initialstep) {
      this.slider.step = initialstep;
    }


    //     // Update the current slider value (each time you drag the slider handle)
    //     slider.oninput = function() {
    //     output.innerHTML = this.value;
    // }
  }
}

window.customElements.define('core-slider', CoreSlider);
