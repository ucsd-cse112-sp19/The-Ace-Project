describe('core-hello', () => {
  let component;
  let componentDOM;
  // create define and create core-hello to test before each test
  beforeEach((done) => {
    if (window.customElements.get('core-hello')) {
      component = document.createElement('core-hello');
      component.setAttribute('id', 'customElement');
      done();
    } else {
      console.log('Core-hello not defined!');
    }
  });

  // delete component after each test
  afterEach(() => {
    document.body.removeChild(component);
  });

  describe('DOM Tree Tests', () => {
    describe('Exists in DOM', () => {
      it('Element should at least exist', () => {
        document.body.append(component);
        componentDOM = document.getElementById('customElement');
        should.exist(componentDOM);
      });
    });

    describe('Correct component exists in DOM', () => {
      it('Check DOM tree for correct element ', () => {
        document.body.append(component);
        componentDOM = document.getElementById('customElement');
        component.should.equal(componentDOM);
      });

      it('InnerHTML', () => {
        component.innerHTML = 'Test text';
        document.body.append(component);
        componentDOM = document.getElementById('customElement');
        componentDOM.innerHTML.should.equal('Test text');
      });

      it('Renders Hello World div', () => {
        document.body.append(component);
        assert.isOk(component.shadowRoot.querySelector('div'));
      });
    });
  });
});
