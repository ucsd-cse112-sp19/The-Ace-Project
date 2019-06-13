import { Selector } from 'testcafe';

fixture('core-button integration tests')
  .page('./core-button.test.html');

async function checkBehavior(button, disabled, t) {
  // async stuff here
  const buttonType = await button.textContent;
  await t.click(button);
  const expected = disabled ? buttonType : `${buttonType} Clicked!`;
  await t.expect(button.textContent)
    .contains(expected);
}

async function testClicks(containerId, disabled, t) {
  const buttonList = await Selector(containerId).child();
  const count = await buttonList.count;
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const button = buttonList.nth(i);
    results.push(checkBehavior(button, disabled, t));
  }
  return Promise.all(results);
}

test('Default Button Clicks', async (t) => {
  await testClicks('#defaultButtons', false, t);
});

test('Disabled Button Clicks', async (t) => {
  await testClicks('#disabledButtons', true, t);
});

test('Plain Button Clicks', async (t) => {
  await testClicks('#plainButtons', false, t);
});

test('Icon Button Clicks', async (t) => {
  await testClicks('#iconButtons', false, t);
});

test('Loading Button Clicks', async (t) => {
  await testClicks('#loadingButtons', false, t);
});

test('Round Button Clicks', async (t) => {
  await testClicks('#roundButtons', false, t);
});

test('Circle Button Clicks', async (t) => {
  await testClicks('#circleButtons', false, t);
});
