describe('core-button-group', () => {
  /*
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


    describe('Round attribute tests', () => {
      function testRound(expected) {
        component.setAttribute('round', '');
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        window.getComputedStyle(componentDOM).getPropertyValue('border-radius').should.equal(expected);
      }
      it('Test round', () => {
        testRound('20px');
      });
    });
  });
  */
});
