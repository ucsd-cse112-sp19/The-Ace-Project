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
    });
  });
});
