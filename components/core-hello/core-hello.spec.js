import './core-hello';
import {
  basicElementTests, setup, teardown,
} from '../common.spec';

describe('core-hello', () => {
  let component;
  let helloDiv;

  beforeEach((done) => {
    component = setup('core-hello', 'customHello');
    helloDiv = component.shadowRoot.querySelector('div');
    done();
  });
  afterEach(() => {
    teardown('core-hello');
  });

  it('Shared Tests', () => {
    basicElementTests(component, 'customHello');
  });

  describe('Basic core-hello tests', () => {
    it('Renders Hello World div', () => {
      document.body.append(component);
      assert.isOk(component.shadowRoot.querySelector('div'));
    });
    describe('Language Attribute Tests', () => {
      function testLang(lang, expected) {
        component.setAttribute('lang', lang);
        document.body.append(component);
        helloDiv.innerHTML.should.equal(`${expected} <slot></slot>`);
      }

      it('English Test', () => {
        testLang('en', 'Hello World');
      });

      it('Portugese Test', () => {
        testLang('pt', 'Olá Mundo');
      });

      it('Japanese Test', () => {
        testLang('jp', 'こんにちは世界');
      });

      it('No Attribute Test', () => {
        document.body.append(component);
        helloDiv.innerHTML.should.equal('Hello World <slot></slot>');
      });

      it('Non-supported Language Test', () => {
        testLang('fr', 'Hello World');
      });
    });
  });
});
