import './core-button-group';

describe('core-button-group', () => {
  let component;
  let childbutton;
  let componentDOM;
  // create define and create core-button-group to test before each test
  beforeEach((done) => {
    if (window.customElements.get('core-button-group')) {
      component = document.createElement('core-button-group');
      component.setAttribute('id', 'customButton');

      done();
    } else {
      console.log('core-button-group not defined!');
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
    });

    describe('Fontsize tests', () => {
      it('Fontsize should equal 0px', () => {
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        componentDOM.style.fontSize.should.equal('0px');
      });
    });

    describe('Children do not exist in DOM', () => {
      it('Children should not exist', () => {
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        componentDOM.hasChildNodes().should.equal(false);
      });
    });

    describe('Children do exist in DOM', () => {
      function checkFirstButtonStyle(button) {
        button.style.borderBottomRightRadius.should.equal('0px');
        button.style.borderTopRightRadius.should.equal('0px');
      }
      function checkLastButtonStyle(button) {
        button.style.borderBottomLeftRadius.should.equal('0px');
        button.style.borderTopLeftRadius.should.equal('0px');
      }
      function checkMiddleButtonStyle(button) {
        button.style.borderRadius.should.equal('0px');
      }
      it('Children should at least exist', () => {
        document.body.append(component);
        componentDOM = document.getElementById('customButton');

        childbutton = document.createElement('core-button-group');
        childbutton.setAttribute('id', 'customChildButton');

        componentDOM.appendChild(childbutton);
        componentDOM.hasChildNodes().should.equal(true);
      });
      it('2 Children Test', () => {
        const child1 = document.createElement('core-button');
        const child2 = document.createElement('core-button');

        component.appendChild(child1);
        component.appendChild(child2);
        document.body.append(component);

        componentDOM = document.getElementById('customButton');
        checkFirstButtonStyle(child1);
        checkLastButtonStyle(child2);
      });
      it('3 Children Test', () => {
        const child1 = document.createElement('core-button');
        const child2 = document.createElement('core-button');
        const child3 = document.createElement('core-button');

        component.appendChild(child1);
        component.appendChild(child2);
        component.appendChild(child3);
        document.body.append(component);

        componentDOM = document.getElementById('customButton');
        checkFirstButtonStyle(child1);
        checkMiddleButtonStyle(child2);
        checkLastButtonStyle(child3);
      });
    });
  });
});
