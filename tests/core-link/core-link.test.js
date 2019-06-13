import { Selector, ClientFunction } from 'testcafe';

fixture('core-link Integration')
  .page('./core-link.test.html');

const getPageUrl = ClientFunction(() => window.location.href);

async function checkBehavior(link, disabled, t) {
  const defaultPage = await getPageUrl();
  const expected = disabled ? defaultPage : 'https://www.google.com';
  await t
    .click(link)
    .expect(getPageUrl())
    .contains(expected)
    .navigateTo(defaultPage);
}

async function testClicks(containerId, disabled, t) {
  const linkList = await Selector(containerId).child();
  const count = await linkList.count;
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const link = linkList.nth(i);
    results.push(checkBehavior(link, disabled, t));
  }
  return Promise.all(results);
}

test('Default Link Clicks', async (t) => {
  await testClicks('#defaultLinks', false, t);
});
test('Default Bootstrap Link Clicks', async (t) => {
  await testClicks('#defaultBootstrapLinks', false, t);
});

// TODO link is still clickable
/*
test('Disabled Link Clicks', async (t) => {
   await testClicks('#disabledLinks', true, t);
});

test('Disabled Bootstrap Link Clicks', async(t) => {
  await testClicks('#disabledBoostrapLinks', true, t);
});
*/
test('No Underline Link Clicks', async (t) => {
  await testClicks('#noUnderlineLinks', false, t);
});
test('No Underline Bootstrap Link Clicks', async (t) => {
  await testClicks('#noUnderlineLinks', false, t);
});
