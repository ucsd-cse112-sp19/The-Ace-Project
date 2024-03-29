import './core-link';
import {
  basicElementTests, containsTag, appendToDom, setup, teardown,
} from '../common.spec';

describe('core-link', () => {
  let component;
  let componentDOM;
  // Create define and create core-link to test before each test.
  beforeEach((done) => {
    component = setup('core-link', 'customLink');
    done();
  });
  afterEach(() => {
    teardown('core-link');
  });

  function createMockWindow(assignCallback, openCallback) {
    // define a mock location class
    class MockLocation {
      assign(location) {
        assignCallback(location);
      }
    }

    // define a mock window class
    class MockWindow {
      constructor() {
        this.location = new MockLocation();
      }

      open(hrefLoc) {
        openCallback(hrefLoc);
      }
    }

    return new MockWindow();
  }

  it('Shared Tests', () => {
    basicElementTests(component, 'customLink');
  });

  describe('Basic core-link tests', () => {
    it('Renders core-link span', () => {
      containsTag(component, 'span');
    });
  });
  describe('Disabled attribute tests', () => {
    function testDisabled(isDisabled, expected) {
      if (isDisabled) {
        component.setAttribute('disabled', '');
      }
      componentDOM = appendToDom('customLink', component);
      componentDOM.style.cursor.should.equal(expected);
    }
    it('Default test cursor', () => {
      testDisabled(false, '');
    });
    it('Disabled test cursor', () => {
      testDisabled(true, 'not-allowed');
    });
  });

  describe('Underline attribute tests', () => {
    function testUnderline(underline) {
      if (underline === 'true' || underline === 'false') {
        component.setAttribute('underline', underline);
      }
      componentDOM = appendToDom('customLink', component);
      // Checks that the underline attribute does not exist.
      if (underline === 'default') {
        should.not.exist(componentDOM.getAttribute('underline'));
        // Checks that the underline attribute is correct.
      } else {
        componentDOM.getAttribute('underline').should.equal(underline);
      }
    }
    it('Default underline', () => {
      testUnderline('default');
    });

    it('No underline', () => {
      testUnderline('false');
    });
    it('With underline', () => {
      testUnderline('true');
    });
  });

  describe('href attribute tests', () => {
    function testHrefNoTarget(isDefault, link) {
      if (!isDefault) {
        component.setAttribute('href', link);
      }

      let assignRan = false;

      const assignCallback = (location) => {
        location.should.equal(link);
        should.not.exist(component.getAttribute('target'));
        assignRan = true;
      };

      const mockWindow = createMockWindow(assignCallback, () => {});
      const listener = component.createOnClickListener(mockWindow, link);

      listener(link);

      assignRan.should.equal(true);
    }

    function testHrefWithTargetBlank(isDefault, link) {
      if (!isDefault) {
        component.setAttribute('href', link);
      }

      component.setAttribute('target', '_blank');

      let openRan = false;

      const openCallback = (hrefLoc) => {
        hrefLoc.should.equal(link);
        component.getAttribute('target').should.equal('_blank');
        openRan = true;
      };

      const mockWindow = createMockWindow(() => {}, openCallback);
      const listener = component.createOnClickListener(mockWindow, link);

      listener(link);

      openRan.should.equal(true);
    }
    it('Default', () => {
      testHrefNoTarget(true, '');
    });
    it('Href value, no target', () => {
      testHrefNoTarget(false, 'www.google.com');
    });
    it('Href value, with target', () => {
      testHrefWithTargetBlank(false, 'www.google.com');
    });
  });

  describe('Type attribute tests', () => {
    function testType(isDefault, isDisabled, typeVal, expected) {
      if (!isDefault) {
        component.setAttribute('type', typeVal);
      }
      // Color is different when disabled, so need to check the disabled attribute too.
      if (isDisabled) {
        component.setAttribute('disabled', '');
      }
      componentDOM = appendToDom('customLink', component);
      window.getComputedStyle(componentDOM).color.should.equal(expected);
    }
    it('Default Enabled test', () => {
      testType(true, false, '', 'rgb(0, 0, 0)');
    });
    it('Default Disabled type test', () => {
      testType(true, true, '', 'rgb(192, 196, 204)');
    });
    it('Primary Enabled test', () => {
      testType(false, false, 'primary', 'rgb(64, 158, 255)');
    });
    it('Primary Disabled test', () => {
      testType(false, true, 'primary', 'rgb(160, 207, 255)');
    });
    it('Success Enabled test', () => {
      testType(false, false, 'success', 'rgb(103, 194, 58)');
    });
    it('Success Disabled test', () => {
      testType(false, true, 'success', 'rgb(179, 225, 157)');
    });
    it('Warning Enabled test', () => {
      testType(false, false, 'warning', 'rgb(230, 162, 60)');
    });
    it('Warning Disabled test', () => {
      testType(false, true, 'warning', 'rgb(243, 209, 158)');
    });
    it('Danger Enabled test', () => {
      testType(false, false, 'danger', 'rgb(245, 108, 108)');
    });
    it('Danger Disabled test', () => {
      testType(false, true, 'danger', 'rgb(250, 182, 182)');
    });
    it('Info Enabled test', () => {
      testType(false, false, 'info', 'rgb(144, 147, 153)');
    });
    it('Info Disabled test', () => {
      testType(false, true, 'info', 'rgb(200, 201, 204)');
    });
  });
});
