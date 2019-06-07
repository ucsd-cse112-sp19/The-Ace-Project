import './core-button';
import {
  basicElementTests, containsTag, setup, teardown,
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
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
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
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        window.getComputedStyle(componentDOM).getPropertyValue('cursor').should.equal(expected);
      }
      it('Default test cursor', () => {
        testDisabled(false, 'pointer');
      });
      it('Disabled test cursor', () => {
        testDisabled(true, 'not-allowed');
      });
    });

    /* TODO LOADING TEST FAILS
    describe('Loading attribute tests', () => {
      function testLoading() {
        component.setAttribute('loading', '');
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        componentDOM.iconSlot.classList.contains('el-icon-loading').should.equal(true);
      }
      it('Test loading', () => {
        testLoading();
      });
    });
    */


    describe('Circle attribute tests', () => {
      function testCircle(expected1, expected2, expected3) {
        component.setAttribute('circle', '');
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        window.getComputedStyle(componentDOM).getPropertyValue('padding').should.equal(expected1);
        window.getComputedStyle(componentDOM).getPropertyValue('width').should.equal(expected2);
        window.getComputedStyle(componentDOM).getPropertyValue('height').should.equal(expected3);
      }
      it('Test circle', () => {
        testCircle('12px', '14px', '14px');
      });
    });


    describe('Plain attribute tests', () => {
      function testPlain(typeVal, expected) {
        component.setAttribute('type', typeVal);
        component.setAttribute('plain', '');
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        window.getComputedStyle(componentDOM).border.should.equal(expected);
      }
      it('primay plain', () => {
        testPlain('primary', '1px solid rgb(64, 158, 255)');
      });
      it('success plain', () => {
        testPlain('success', '1px solid rgb(103, 194, 58)');
      });
      it('warning plain', () => {
        testPlain('warning', '1px solid rgb(230, 162, 60)');
      });
      it('danger plain', () => {
        testPlain('danger', '1px solid rgb(245, 108, 108)');
      });
      it('info plain', () => {
        testPlain('info', '1px solid rgb(144, 147, 153)');
      });
    });


    describe('Type attribute tests', () => {
      function testType(isDefault, typeVal, expected) {
        if (!isDefault) {
          component.setAttribute('type', typeVal);
        }
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        window.getComputedStyle(componentDOM).backgroundColor.should.equal(expected);
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
        if (!isDefault) {
          component.setAttribute('size', sizeVal);
        }
        document.body.append(component);
        componentDOM = document.getElementById('customButton');
        window.getComputedStyle(componentDOM).padding.should.equal(expected);
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
