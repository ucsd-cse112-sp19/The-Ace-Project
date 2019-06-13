import testClicks from '../common.test';

fixture('core-button integration tests')
  .page('./core-button.test.html');

test('Default Button Clicks', async (t) => {
  await testClicks('#defaultButtons', false, t, 'button');
});

test('Disabled Button Clicks', async (t) => {
  await testClicks('#disabledButtons', true, t, 'button');
});

test('Plain Button Clicks', async (t) => {
  await testClicks('#plainButtons', false, t, 'button');
});

test('Icon Button Clicks', async (t) => {
  await testClicks('#iconButtons', false, t, 'button');
});

test('Loading Button Clicks', async (t) => {
  await testClicks('#loadingButtons', false, t, 'button');
});

test('Round Button Clicks', async (t) => {
  await testClicks('#roundButtons', false, t, 'button');
});

test('Circle Button Clicks', async (t) => {
  await testClicks('#circleButtons', false, t, 'button');
});
