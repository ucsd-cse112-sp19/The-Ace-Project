import { Selector } from 'testcafe';

fixture('core-button integration tests')
  .page('./core-button.test.html');

test('Default Button Clicks', async (t) => {
  const buttonList = Selector('#defaultButtons').child();
  const count = await buttonList.count;

  for (let i = 0; i < count; i += 1) {
    const button = buttonList.nth(i);
    console.log(button);
    console.log(t);
    // await t.click(button);
  }
});
/*
test('Disabled Button Clicks', async (t) => {
  testClicks('#disabledButtons', true, t);
 });

test('Plain Button Clicks', async (t) => {
  testClicks('#plainButtons', false, t);
});

test('Icon Button Clicks', async (t) => {
  testClicks('#iconButtons', false, t);
});

test('Loading Button Clicks', async (t) => {
  testClicks('#loadingButtons', false, t);
});

test('Round Button Clicks', async (t) => {
  testClicks('#roundButtons', false, t);
});

test('Circle Button Clicks', async (t) => {
  testClicks('#circleButtons', false, t);
});
*/
