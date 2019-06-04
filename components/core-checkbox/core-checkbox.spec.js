import './core-checkbox';

describe('core-checkbox', () => {
  let component;
  let componentDOM;
  // create define and create core-button to test before each test
  beforeEach((done) => {
    if (window.customElements.get('core-checkbox')) {
      component = document.createElement('core-checkbox');
      component.setAttribute('id', 'customCheckbox');

      done();
    } else {
      console.log('core-checkbox not defined!');
    }
  });
  afterEach(() => {
    document.body.removeChild(component);
  });

  function addToDom(addedComponent) {
    document.body.append(addedComponent);
    return document.getElementById('customCheckbox');
  }

  describe('DOM Tree Tests', () => {
    describe('Exists in DOM', () => {
      it('Element should at least exist', () => {
        componentDOM = addToDom(component);
        should.exist(componentDOM);
      });
    });

    describe('Correct component exists in DOM', () => {
      it('Check DOM tree for correct element ', () => {
        componentDOM = addToDom(component);
        component.should.equal(componentDOM);
      });

      it('InnerHTML', () => {
        component.innerHTML = 'This is a test checkbox';
        componentDOM = addToDom(component);
        componentDOM.innerHTML.should.equal('This is a test checkbox');
      });

      it('Renders core-checkbox span', () => {
        componentDOM = addToDom(component);
        assert.isOk(component.shadowRoot.querySelector('span'));
      });
    });
  });

  describe('Attribute Tests', () => {
    describe('Disabled Attribute', () => {
      function testDisabled(isDisabled, expected) {
        if (isDisabled) {
          component.setAttribute('disabled', '');
        }
        componentDOM = addToDom(component);
        window.getComputedStyle(componentDOM).cursor.should.equal(expected);
      }
      it('Default behavior', () => {
        testDisabled(false, 'pointer');
      });
      it('Disabled behavior', () => {
        testDisabled(true, 'not-allowed');
      });
    });

    describe('Border Attribute', () => {
      function testBorder(borderOn, expected) {
        if (borderOn) {
          component.setAttribute('border', 'true');
        }
        componentDOM = addToDom(component);
        window.getComputedStyle(componentDOM).borderRadius.should.equal(expected);
      }
      it('Default behavior', () => {
        testBorder(false, '0px');
      });

      it('Border set', () => {
        // TODO border set not yet implemented
        testBorder(true, '0px');
      });
    });
  });
});
