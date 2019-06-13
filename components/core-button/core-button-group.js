/* eslint-disable no-param-reassign */
// @ts-check

/**
 * A composite component that groups core-button components together
 * @external
 * @property {CoreButton[]} children - children CoreButtons to be grouped
 * @playground
 * <core-button-group>
 *  <core-button type='primary'> Default </core-button>
 *  <core-button type='primary' icon='el-icon-delete'></core-button>
 *  <core-button type='primary' icon='el-icon-share'></core-button>
 * </core-button-group>
 */

class CoreButtonGroup extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  /** This is the lifecycle method that runs when the component is mounted
   * It will get all the children button elements and change their style,
   * depending if their the first, middle or last child. The childrenConnectedCallback
   * is needed because it takes some time for the children to mount and become available.
   */
  connectedCallback() {
    const childrenConnectedCallback = () => {
      this.style.fontSize = '0';
      const children = /** @type {Array<HTMLElement>} */ (Array.from(this.children));
      children.filter(c => c.tagName === 'CORE-BUTTON').forEach((c, i) => {
        if (i === 0) {
          c.style.borderBottomRightRadius = '0';
          c.style.borderTopRightRadius = '0';
        } else if (i === children.length - 1) {
          c.style.borderLeft = '1px solid hsla(0,0%,100%,.5)';
          c.style.borderBottomLeftRadius = '0';
          c.style.borderTopLeftRadius = '0';
        } else {
          c.style.borderLeft = '1px solid hsla(0,0%,100%,.5)';
          c.style.borderRadius = '0';
        }
      });
    };

    const observer = new MutationObserver(childrenConnectedCallback);
    const config = { attributes: false, childList: true, subtree: true };
    observer.observe(this, config);
    childrenConnectedCallback();
  }

//   attributeChangedCallback(attrName, oldVal, newVal) {
//   }
}

window.customElements.define('core-button-group', CoreButtonGroup);
