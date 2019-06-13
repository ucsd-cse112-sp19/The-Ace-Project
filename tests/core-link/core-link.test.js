import { Selector, ClientFunction } from 'testcafe';

fixture('core-link Integration')
  .skip
  .page('./core-link.test.html');

const getPageUrl = ClientFunction(() => window.location.href);

test('Default link Clicks', async (t) => {
  const defaultLink = await Selector('#default');
  await t
    .click(defaultLink)
    .expect(getPageUrl())
    .eql('https://element.eleme.io/#/en-US/component/link');
});
