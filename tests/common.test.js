import { Selector, ClientFunction } from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);

async function testButtonBehavior(button, disabled, t) {
  const buttonType = await button.textContent;
  await t.click(button);
  const expected = disabled ? buttonType : `${buttonType} Clicked!`;
  await t.expect(button.textContent)
    .contains(expected);
}

async function testLinkBehavior(link, disabled, t) {
  const defaultPage = await getPageUrl();
  const expected = disabled ? defaultPage : 'https://www.google.com';
  await t
    .click(link)
    .expect(getPageUrl())
    .contains(expected)
    .navigateTo(defaultPage);
}

export default async function testClicks(containerId, disabled, t, type) {
  const componentList = await Selector(containerId).child();
  const count = await componentList.count;
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const component = componentList.nth(i);
    if (type === 'button') {
      results.push(testButtonBehavior(component, disabled, t));
    } else if (type === 'link') {
      results.push(testLinkBehavior(component, disabled, t));
    } else {
      console.log('Invalid type');
    }
  }
  return Promise.all(results);
}
