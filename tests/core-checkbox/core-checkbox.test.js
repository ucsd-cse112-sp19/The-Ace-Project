import { Selector } from 'testcafe';

fixture('core-checkbox Integration')
  .page('./core-checkbox.test.html');

const getInnerInput = Selector(checkId => document.getElementById(checkId).shadowRoot.querySelector('input'));

async function checkBehavior(checkId, disabled, t) {
  const checkbox = await Selector(`#${checkId}`);
  const innerInput = getInnerInput(checkId);
  const currentState = await checkbox.hasAttribute('checked');
  await t.click(checkbox);
  const expected = disabled ? currentState : !currentState;
  await t.expect(innerInput.checked)
    .eql(expected);
}
test('Default Links', async (t) => {
  await checkBehavior('default', false, t);
  await checkBehavior('defaultChecked', false, t);
});

test('Disabled Links', async (t) => {
  await checkBehavior('disabled', true, t);
  await checkBehavior('disabledChecked', true, t);
});

test('Named Links', async (t) => {
  await checkBehavior('named', false, t);
  await checkBehavior('namedChecked', false, t);
  await checkBehavior('namedDisabled', true, t);
});

test('Bordered Links', async (t) => {
  await checkBehavior('bordered', false, t);
  await checkBehavior('borderedChecked', false, t);
  await checkBehavior('disabledBordered', true, t);
  await checkBehavior('disabledBorderedChecked', true, t);
});
