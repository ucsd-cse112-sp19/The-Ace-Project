let component;
let componentDOM;
// create define and create core-hello to test before each test
beforeEach((done) => {
  const script = document.createElement('script');
  script.src = '../core-hello/core-hello.js';

  document.getElementsByTagName('body')[0].appendChild(script);

  const scriptLoaded = setInterval(() => {
    if (window.customElements.get('core-hello')) {
      clearInterval(scriptLoaded);
      component = document.createElement('core-hello');
      component.setAttribute('id', 'customElement');
      done();
    }
  }, 10);
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
  });
});
