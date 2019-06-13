import { Selector } from 'testcafe';

fixture('core-checkbox Integration')
  .page('./core-checkbox.test.html');

const getInnerInput = Selector(checkId => document.getElementById(checkId).shadowRoot.querySelector('input'));

async function testCheckboxBehavior(checkId, disabled, t) {
  const checkbox = await Selector(`#${checkId}`);
  const innerInput = getInnerInput(checkId);
  const currentState = await checkbox.hasAttribute('checked');
  await t.click(checkbox);
  const expected = disabled ? currentState : !currentState;
  await t.expect(innerInput.checked)
    .eql(expected);
}
test('Default Links', async (t) => {
  await testCheckboxBehavior('default', false, t);
  await testCheckboxBehavior('defaultChecked', false, t);
});

test('Disabled Links', async (t) => {
  await testCheckboxBehavior('disabled', true, t);
  await testCheckboxBehavior('disabledChecked', true, t);
});

test('Named Links', async (t) => {
  await testCheckboxBehavior('named', false, t);
  await testCheckboxBehavior('namedChecked', false, t);
  await testCheckboxBehavior('namedDisabled', true, t);
});

test('Bordered Links', async (t) => {
  await testCheckboxBehavior('bordered', false, t);
  await testCheckboxBehavior('borderedChecked', false, t);
  await testCheckboxBehavior('disabledBordered', true, t);
  await testCheckboxBehavior('disabledBorderedChecked', true, t);
});
