import './core-checkbox';

describe('core-button', () => {
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
        componentDOM.style.cursor.should.equal(expected);
      }
      it('Default behavior', () => {
        testDisabled(false, '');
      });
      it('Disabled behavior', () => {
        testDisabled(true, 'not-allowed');
      });
    });


    describe('Name Attribute', () => {
      it('Name not set', () => {
        componentDOM = addToDom(component);
        should.not.exist(componentDOM.getAttribute('name'));
      });

      it('Name set', () => {
        component.setAttribute('name', 'testName');
        componentDOM = addToDom(component);
        componentDOM.getAttribute('name').should.equal('testName');
      });
    });

    describe('Border Attribute', () => {
      function testBorder(borderOn, expected) {
        if (borderOn) {
          component.setAttribute('border', 'true');
          componentDOM = addToDom(component);
          componentDOM.style.borderRadius.should.not.equal('0px');
        } else {
          componentDOM = addToDom(component);
          componentDOM.style.borderRadius.should.equal(expected);
        }
      }
      it('Default behavior', () => {
        testBorder(false, '');
      });

      it('Border set', () => {
        testBorder(true, '1px');
      });
    });


    describe('Size Attribute', () => {
      function testSize(size) {
        component.setAttribute('border', 'true');
        component.setAttribute('size', size);
        componentDOM = addToDom(component);

        // size requires border attribute to be present.
        if (!componentDOM.getAttribute('border')) {
          should.fail();
        }
        componentDOM.getAttribute('size').should.equal(size);
      }
      it('Default behavior', () => {
        componentDOM = addToDom(component);
        should.not.exist(componentDOM.getAttribute('size'));
      });

      it('Size medium', () => {
        testSize('medium');
      });

      it('Size small', () => {
        testSize('small');
      });
      it('Size mini', () => {
        testSize('mini');
      });
    });

    describe('Checked Attribute', () => {
      function testChecked(checkedVal) {
        component.setAttribute('checked', checkedVal);
        componentDOM = addToDom(component);
        componentDOM.getAttribute('checked').should.equal(checkedVal);
      }
      it('Unchecked', () => {
        testChecked('false');
      });

      it('Checked', () => {
        testChecked('true');
      });
    });
  });
});
