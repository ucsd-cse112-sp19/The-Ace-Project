/**
 * TODO
 */
export default class CoreBase extends HTMLElement {
  constructor(htmlTemplate, cssTemplate) {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = htmlTemplate;
    this.styleNode = document.createElement('style');
    this.styleNode.innerHTML = cssTemplate;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.template.content.cloneNode(true));
    shadowRoot.appendChild(this.styleNode);
  }
}
