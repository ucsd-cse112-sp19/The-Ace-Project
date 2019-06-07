
export function setup(componentTag, componentId) {
  if (window.customElements.get(componentTag)) {
    const component = document.createElement(componentTag);
    component.setAttribute('id', componentId);
    return component;
  }
  console.log(`${componentTag} not defined!`);
  return null;
}

export function teardown(componentTag) {
  const component = document.querySelector(componentTag);
  if (component) {
    document.body.removeChild(component);
  }
}

export function appendToDom(appendId, appendComp) {
  document.body.append(appendComp);
  return document.getElementById(appendId);
}

export function basicElementTests(component, componentId) {
  describe('Generic DOM Tree Tests', () => {
    describe('Exists in DOM', () => {
      it('Element should at least exist', () => {
        document.body.append(component);
        const componentDOM = document.getElementById(componentId);
        should.exist(componentDOM);
      });
    });

    describe('Correct component exists in DOM', () => {
      it('Check DOM tree for correct element ', () => {
        document.body.append(component);
        const componentDOM = document.getElementById(componentId);
        component.should.equal(componentDOM);
      });

      it('InnerHTML', () => {
        const localComponent = component;
        localComponent.innerHTML = 'This is a test component';

        document.body.append(localComponent);
        const componentDOM = document.getElementById(componentId);
        componentDOM.innerHTML.should.equal('This is a test component');
      });
    });
  });
}
