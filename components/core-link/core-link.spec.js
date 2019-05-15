describe('core-link', () => {
  let component;
  let componentDOM;
  // create define and create core-link to test before each test
  beforeEach((done) => {
    if (window.customElements.get('core-link')) {
      component = document.createElement('core-link');
      component.setAttribute('id', 'customLink');

      done();
    } else {
      console.log('core-link not defined!');
    }
  });
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
      function testDisabled(dis, type, expected) {
        if (dis === 'true') {
          component.setAttribute('disabled', dis);
        }
        document.body.append(component);
        componentDOM = document.getElementById('customLink');
        if (type === 'pointer') {
          componentDOM.style.cursor.should.equal(expected);
        } else if (type === 'opacity') {
          componentDOM.style.opacity.should.be.equal(expected);
        } else {
          should.fail('invalid test type');
        }
      }
      // TODO equal 1??
      it('Default test opacity', () => {
        testDisabled('false', 'opacity', '');
      });
      it('Disabled test opacity', () => {
        testDisabled('true', 'opacity', '0.5');
      });
      // TODO equal pointer??
      it('Default test cursor', () => {
        testDisabled('false', 'pointer', '');
      });
      it('Disabled test cursor', () => {
        testDisabled('true', 'pointer', 'not-allowed');
      });
    });

    describe('Underline attribute tests', () => {
      function testUnderline(underline) {
        if (underline === 'true' || underline === 'false') {
          component.setAttribute('underline', underline);
        }
        document.body.append(component);
        componentDOM = document.getElementById('customLink');
        if (underline === 'default') {
          should.not.exist(componentDOM.getAttribute('underline'));
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
        if (isDefault) {
          should.not.exist(componentDOM.getAttribute('href'));
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
    // TODO type attribute tests
    /*
    describe('Type attribute tests', () => {
    });
    */
  });
});
