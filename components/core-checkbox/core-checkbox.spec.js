import './core-checkbox';
import {
  basicElementTests, containsTag, appendToDom, setup, teardown,
} from '../common.spec';

describe('core-checkbox', () => {
  let component;
  let componentDOM;
  // create define and create core-button to test before each test
  beforeEach((done) => {
    component = setup('core-checkbox', 'customCheckbox');
    done();
  });
  afterEach(() => {
    teardown('core-checkbox');
  });

  it('Shared Tests', () => {
    basicElementTests(component, 'customCheckbox');
  });

  describe('Basic core-link tests', () => {
    it('Renders core-link span', () => {
      containsTag(component, 'span');
    });
  });

  describe('Attribute Tests', () => {
    describe('Disabled Attribute', () => {
      function testDisabled(isDisabled, expected) {
        if (isDisabled) {
          component.setAttribute('disabled', '');
          console.log(component.style.cursor);
        }
        componentDOM = appendToDom('customCheckbox', component);
        window.getComputedStyle(componentDOM).cursor.should.equal(expected);
      }
      it('Default behavior', () => {
        testDisabled(false, 'pointer');
      });
      it('Disabled behavior', () => {
        testDisabled(true, 'not-allowed');
      });
    });

    describe('Border Attribute', () => {
      function testBorder(borderOn, expected) {
        if (borderOn) {
          component.setAttribute('border', 'true');
        }
        componentDOM = appendToDom('customCheckbox', component);
        window.getComputedStyle(componentDOM).getPropertyValue('border-style').should.equal(expected);
      }
      it('Default behavior', () => {
        testBorder(false, 'none');
      });

      it('Border set', () => {
        testBorder(true, 'solid');
      });
    });

    describe('Name Attribute', () => {
      it('Name Set', () => {
        component.setAttribute('name', 'testName');
        componentDOM = appendToDom('customCheckbox', component);
        componentDOM.shadowRoot.querySelector('input').name = 'testName';
      });
    });

    describe('Checked Attribute', () => {
      function testChecked(checked) {
        if (checked) {
          component.setAttribute('checked', '');
        }
        componentDOM = appendToDom('customCheckbox', component);
        componentDOM.shadowRoot.querySelector('input').checked.should.equal(checked);
      }
      it('Unchecked', () => {
        testChecked(false);
      });
      it('Checked', () => {
        testChecked(true);
      });
    });
  });
});
