describe('core-button', () => {
  let component;
  let componentDOM;
  // create define and create core-button to test before each test
  beforeEach((done) => {
    if (window.customElements.get('core-button')) {
      component = document.createElement('core-button');
      component.setAttribute('id', 'customButton');

      done();
    } else {
      console.log('core-button not defined!');
    }
  });
  afterEach(() => {
    document.body.removeChild(component);
  });

  describe('DOM Tree Tests', () => {
    describe('Exists in DOM', () => {
      it('Element should at least exist', () => {
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        should.exist(componentDOM);
      });
    });

    describe('Correct component exists in DOM', () => {
      it('Check DOM tree for correct element ', () => {
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        component.should.equal(componentDOM);
      });

      it('InnerHTML', () => {
        component.innerHTML = 'This is a test button';
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        componentDOM.innerHTML.should.equal('This is a test button');
      });

      it('Renders core-button a', () => {
        document.body.append(component);
        assert.isOk(component.shadowRoot.querySelector('a'));
      });
    });


    /*
    describe('Disabled attribute tests', () => {
      function testDisabled(isDisabled, expected) {
        if (isDisabled) {
          component.setAttribute('disabled', isDisabled);
        }
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        componentDOM.style.cursor.should.equal(expected);
      }
      it('Default test cursor', () => {
        testDisabled(false, '');
      });
      it('Disabled test cursor', () => {
        testDisabled(true, 'not-allowed');
      });
    });

*/

    describe('Plain attribute tests', () => {
      function testPlain(typeVal, expected) {
        component.setAttribute('type', typeVal);
        component.setAttribute('plain', '');
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        window.getComputedStyle(componentDOM).border.should.equal(expected);
      }
      it('primay plain', () => {
        testPlain('primary', '1px solid rgb(64, 158, 255)');
      });
      it('success plain', () => {
        testPlain('success', '1px solid rgb(103, 194, 58)');
      });
      it('warning plain', () => {
        testPlain('warning', '1px solid rgb(230, 162, 60)');
      });
      it('danger plain', () => {
        testPlain('danger', '1px solid rgb(245, 108, 108)');
      });
      it('info plain', () => {
        testPlain('info', '1px solid rgb(144, 147, 153)');
      });
    });


    describe('Type attribute tests', () => {
      function testType(isDefault, typeVal, expected) {
        if (!isDefault) {
          component.setAttribute('type', typeVal);
        }
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        window.getComputedStyle(componentDOM).backgroundColor.should.equal(expected);
      }

      it('Default test', () => {
        testType(true, '', 'rgba(0, 0, 0, 0)');
      });
      it('Primary test', () => {
        testType(false, 'primary', 'rgb(64, 158, 255)');
      });
      it('Success test', () => {
        testType(false, 'success', 'rgb(103, 194, 58)');
      });
      it('Warning test', () => {
        testType(false, 'warning', 'rgb(230, 162, 60)');
      });
      it('Danger test', () => {
        testType(false, 'danger', 'rgb(245, 108, 108)');
      });
      it('Info test', () => {
        testType(false, 'info', 'rgb(144, 147, 153)');
      });
    });


    describe('Size attribute tests', () => {
      function testSize(isDefault, sizeVal, expected) {
        if (!isDefault) {
          component.setAttribute('size', sizeVal);
        }
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        window.getComputedStyle(componentDOM).padding.should.equal(expected);
      }

      it('Default test', () => {
        testSize(true, '', '12px 20px');
      });
      it('Medium test', () => {
        testSize(false, 'medium', '10px 20px');
      });
      it('Small test', () => {
        testSize(false, 'small', '9px 15px');
      });
      it('Mini test', () => {
        testSize(false, 'mini', '7px 15px');
      });
    });
  });
});
