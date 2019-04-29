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
  describe('Language Attribute Tests', () => {
    it('English Test', () => {
      const helloDiv = component.shadowRoot.querySelector('div');
      component.setAttribute('lang', 'en');
      document.body.append(component);
      helloDiv.innerHTML.should.equal('Hello World <slot></slot>');
    });
    it('Portugese Test', () => {
      const helloDiv = component.shadowRoot.querySelector('div');
      component.setAttribute('lang', 'pt');
      document.body.append(component);
      helloDiv.innerHTML.should.equal('Olá Mundo <slot></slot>');
    });
    it('Japanese Test', () => {
      const helloDiv = component.shadowRoot.querySelector('div');
      component.setAttribute('lang', 'jp');
      document.body.append(component);
      helloDiv.innerHTML.should.equal('こんにちは世界 <slot></slot>');
    });
    it('No Attribute Test', () => {
      const helloDiv = component.shadowRoot.querySelector('div');
      document.body.append(component);
      helloDiv.innerHTML.should.equal(' Hello World <slot></slot>');
    });
    it('Non-supported Language Test', () => {
      const helloDiv = component.shadowRoot.querySelector('div');
      component.setAttribute('lang', 'fr');
      document.body.append(component);
      helloDiv.innerHTML.should.equal(' Hello World <slot></slot>');
    });
  });
});
