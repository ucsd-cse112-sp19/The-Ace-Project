import './core-link';

describe('core-link', () => {
  let component;
  let componentDOM;
  // Create define and create core-link to test before each test.
  beforeEach((done) => {
    if (window.customElements.get('core-link')) {
      component = document.createElement('core-link');
      component.setAttribute('id', 'customLink');

      done();
    } else {
      console.log('core-link not defined!');
    }
  });

  // Removes core-link element from DOM tree after every test.
  afterEach(() => {
    document.body.removeChild(component);
  });

  describe('DOM Tree Tests', () => {
    describe('Exists in DOM', () => {
      it('Element should at least exist', () => {
        document.body.append(component);
        componentDOM = document.getElementById('customLink');
        should.exist(componentDOM);
      });
    });

    describe('Correct component exists in DOM', () => {
      it('Check DOM tree for correct element ', () => {
        document.body.append(component);
        componentDOM = document.getElementById('customLink');
        component.should.equal(componentDOM);
      });

      it('InnerHTML', () => {
        component.innerHTML = 'This is a test link';
        document.body.append(component);
        componentDOM = document.getElementById('customLink');
        componentDOM.innerHTML.should.equal('This is a test link');
      });

      it('Renders core-link span', () => {
        document.body.append(component);
        assert.isOk(component.shadowRoot.querySelector('span'));
      });
    });
    describe('Disabled attribute tests', () => {
      function testDisabled(isDisabled, expected) {
        if (isDisabled) {
          component.setAttribute('disabled', '');
        }
        document.body.append(component);
        componentDOM = document.getElementById('customLink');
        componentDOM.style.cursor.should.equal(expected);
      }
      it('Default test cursor', () => {
        testDisabled(false, '');
      });
      it('Disabled test cursor', () => {
        testDisabled(true, 'not-allowed');
      });
    });

    describe('Underline attribute tests', () => {
      function testUnderline(underline) {
        if (underline === 'true' || underline === 'false') {
          component.setAttribute('underline', underline);
        }
        document.body.append(component);
        componentDOM = document.getElementById('customLink');
        // Checks that the underline attribute does not exist.
        if (underline === 'default') {
          should.not.exist(componentDOM.getAttribute('underline'));
        // Checks that the underline attribute is correct.
        } else {
          componentDOM.getAttribute('underline').should.equal(underline);
        }
      }
      it('Default underline', () => {
        testUnderline('default');
      });

      it('No underline', () => {
        testUnderline('false');
      });
      it('With underline', () => {
        testUnderline('true');
      });
    });

    describe('href attribute tests', () => {
      function testHref(isDefault, link) {
        if (!isDefault) {
          component.setAttribute('href', link);
        }
        document.body.append(component);
        componentDOM = document.getElementById('customLink');
        // Checks that the href attribute does not exist.
        if (isDefault) {
          should.not.exist(componentDOM.getAttribute('href'));
        // Checks that the href attribute is correct.
        } else {
          componentDOM.getAttribute('href').should.equal(link);
        }
      }
      it('default value', () => {
        testHref(true, '');
      });
      it('valid href value', () => {
        testHref(false, 'www.google.com');
      });
      it('blank href value', () => {
        testHref(false, '');
      });
    });

    describe('Type attribute tests', () => {
      function testType(isDefault, isDisabled, typeVal, expected) {
        if (!isDefault) {
          component.setAttribute('type', typeVal);
        }
        // Color is different when disabled, so need to check the disabled attribute too.
        if (isDisabled) {
          component.setAttribute('disabled', '');
        }
        document.body.append(component);
        componentDOM = document.getElementById('customLink');
        window.getComputedStyle(componentDOM).color.should.equal(expected);
      }
      it('Default Enabled test', () => {
        testType(true, false, '', 'rgb(0, 0, 0)');
      });
      it('Default Disabled type test', () => {
        testType(true, true, '', 'rgb(192, 196, 204)');
      });
      it('Primary Enabled test', () => {
        testType(false, false, 'primary', 'rgb(64, 158, 255)');
      });
      it('Primary Disabled test', () => {
        testType(false, true, 'primary', 'rgb(160, 207, 255)');
      });
      it('Success Enabled test', () => {
        testType(false, false, 'success', 'rgb(103, 194, 58)');
      });
      it('Success Disabled test', () => {
        testType(false, true, 'success', 'rgb(179, 225, 157)');
      });
      it('Warning Enabled test', () => {
        testType(false, false, 'warning', 'rgb(230, 162, 60)');
      });
      it('Warning Disabled test', () => {
        testType(false, true, 'warning', 'rgb(243, 209, 158)');
      });
      it('Danger Enabled test', () => {
        testType(false, false, 'danger', 'rgb(245, 108, 108)');
      });
      it('Danger Disabled test', () => {
        testType(false, true, 'danger', 'rgb(250, 182, 182)');
      });
      it('Info Enabled test', () => {
        testType(false, false, 'info', 'rgb(144, 147, 153)');
      });
      it('Info Disabled test', () => {
        testType(false, true, 'info', 'rgb(200, 201, 204)');
      });
    });
  });
});
