import './core-button';
import {
  basicElementTests, containsTag, setup, teardown, appendToDom,
} from '../common.spec';

describe('core-button', () => {
  let component;
  let componentDOM;

  // create define and create core-button to test before each test
  beforeEach((done) => {
    component = setup('core-button', 'customButton');
    done();
  });
  afterEach(() => {
    teardown('core-button');
  });

  // Helper functions
  function setAttribute(isDefault, attributeName, value) {
    if (!isDefault) {
      component.setAttribute(attributeName, value);
    }
  }

  function applyAttributeForStyle(isDefault, attributeName, value) {
    setAttribute(isDefault, attributeName, value);
    componentDOM = appendToDom('customButton', component);
    return window.getComputedStyle(componentDOM);
  }

  // Test Suite
  it('Shared Tests', () => {
    basicElementTests(component, 'customButton');
  });

  describe('Basic Button Tests', () => {
    it('Renders core-button a', () => {
      containsTag(component, 'a');
    });

    describe('Round attribute tests', () => {
      function testRound(expected) {
        component.setAttribute('round', '');
        componentDOM = appendToDom('customButton', component);
        window.getComputedStyle(componentDOM).getPropertyValue('border-radius').should.equal(expected);
      }
      it('Test round', () => {
        testRound('20px');
      });
    });

    describe('Disabled attribute tests', () => {
      function testDisabled(isDisabled, expected) {
        if (isDisabled) {
          component.setAttribute('disabled', isDisabled);
        }
        componentDOM = appendToDom('customButton', component);
        window.getComputedStyle(componentDOM).getPropertyValue('cursor').should.equal(expected);
      }
      it('Default test cursor', () => {
        testDisabled(false, 'pointer');
      });
      it('Disabled test cursor', () => {
        testDisabled(true, 'not-allowed');
      });
    });
    describe('Loading attribute tests', () => {
      function testLoading(isLoading) {
        if (isLoading) {
          component.setAttribute('loading', '');
        }
        componentDOM = appendToDom('customButton', component);
        componentDOM.iconSlot.classList.contains('el-icon-loading').should.equal(isLoading);
      }
      it('Default behavior', () => {
        testLoading(false);
      });
      it('Test loading', () => {
        testLoading(true);
      });
    });

    describe('Circle attribute tests', () => {
      function testCircle(expected1, expected2, expected3) {
        component.setAttribute('circle', '');
        componentDOM = appendToDom('customButton', component);
        window.getComputedStyle(componentDOM).getPropertyValue('padding').should.equal(expected1);
        window.getComputedStyle(componentDOM).getPropertyValue('width').should.equal(expected2);
        window.getComputedStyle(componentDOM).getPropertyValue('height').should.equal(expected3);
      }
      it('Test circle', () => {
        testCircle('12px', '14px', '14px');
      });
    });

    describe('Icon attribute tests', () => {
      function testIcon(withIcon, expected) {
        if (withIcon) {
          component.setAttribute('icon', 'el-icon-search');
        }
        componentDOM = appendToDom('customButton', component);
        componentDOM.iconSlot.classList.length.should.equal(expected);
      }

      it('No icon test', () => {
        testIcon(false, 0);
      });

      it('With icon Test', () => {
        testIcon(true, 1);
      });
    });

    describe('Plain attribute tests', () => {
      function testPlain(typeVal, expected) {
        component.setAttribute('type', typeVal);
        component.setAttribute('plain', '');
        componentDOM = appendToDom('customButton', component);
        window.getComputedStyle(componentDOM).backgroundColor.should.equal(expected);
      }
      it('primary plain', () => {
        testPlain('primary', 'rgba(64, 158, 255, 0.1)');
      });
      it('success plain', () => {
        testPlain('success', 'rgba(103, 194, 58, 0.1)');
      });
      it('warning plain', () => {
        testPlain('warning', 'rgba(230, 162, 60, 0.1)');
      });
      it('danger plain', () => {
        testPlain('danger', 'rgba(245, 108, 108, 0.1)');
      });
      it('info plain', () => {
        testPlain('info', 'rgba(144, 147, 153, 0.1)');
      });
    });


    describe('Type attribute tests', () => {
      function testType(isDefault, typeVal, expected) {
        applyAttributeForStyle(isDefault, 'type', typeVal).backgroundColor.should.equal(expected);
      }

      it('Default test', () => {
        testType(true, '', 'rgba(0, 0, 0, 0)');
      });
      it('Primary test', () => {
        testType(false, 'primary', 'rgb(64, 158, 255)');
      });
      it('Success test', () => {
        testType(false, 'success', 'rgb(103, 194, 58)');
      });
      it('Warning test', () => {
        testType(false, 'warning', 'rgb(230, 162, 60)');
      });
      it('Danger test', () => {
        testType(false, 'danger', 'rgb(245, 108, 108)');
      });
      it('Info test', () => {
        testType(false, 'info', 'rgb(144, 147, 153)');
      });
    });


    describe('Size attribute tests', () => {
      function testSize(isDefault, sizeVal, expected) {
        applyAttributeForStyle(isDefault, 'size', sizeVal).padding.should.equal(expected);
      }

      it('Default test', () => {
        testSize(true, '', '12px 20px');
      });
      it('Medium test', () => {
        testSize(false, 'medium', '10px 20px');
      });
      it('Small test', () => {
        testSize(false, 'small', '9px 15px');
      });
      it('Mini test', () => {
        testSize(false, 'mini', '7px 15px');
      });
    });
  });
});
