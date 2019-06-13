import testClicks from '../common.test';

fixture('core-link Integration')
  .page('./core-link.test.html');

test('Default Link Clicks', async (t) => {
  await testClicks('#defaultLinks', false, t, 'link');
});
test('Default Bootstrap Link Clicks', async (t) => {
  await testClicks('#defaultBootstrapLinks', false, t, 'link');
});

// TODO disabled link is still clickable
test('Disabled Link Clicks', async (t) => {
  await testClicks('#disabledLinks', true, t, 'link');
});

test('Disabled Bootstrap Link Clicks', async (t) => {
  await testClicks('#disabledBoostrapLinks', true, t, 'link');
});

test('No Underline Link Clicks', async (t) => {
  await testClicks('#noUnderlineLinks', false, t, 'link');
});
test('No Underline Bootstrap Link Clicks', async (t) => {
  await testClicks('#noUnderlineBootstrapLinks', false, t, 'link');
});
