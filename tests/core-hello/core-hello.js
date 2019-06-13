import { Selector } from 'testcafe';

fixture('core-hello Integration')
  .skip
  .page('./core-hello.html');

test('Renders', async (t) => {
  // Check if the component appears
  await t.expect(Selector('core-hello')).ok();
});
