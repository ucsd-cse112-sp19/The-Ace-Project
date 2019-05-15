describe('core-button', () => {
  let component;
  let componentDOM;
  // create define and create core-button to test before each test
  beforeEach((done) => {
    if (window.customElements.get('core-button')) {
      component = document.createElement('core-button');
      component.setAttribute('id', 'custombutton');

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
        componentDOM = document.getElementById('custombutton');
        should.exist(componentDOM);
      });
    });

    describe('Correct component exists in DOM', () => {
      it('Check DOM tree for correct element ', () => {
        document.body.append(component);
        componentDOM = document.getElementById('custombutton');
        component.should.equal(componentDOM);
      });

      it('InnerHTML', () => {
        component.innerHTML = 'This is a test button';
        document.body.append(component);
        componentDOM = document.getElementById('custombutton');
        componentDOM.innerHTML.should.equal('This is a test button');
      });
    });
  });
});
