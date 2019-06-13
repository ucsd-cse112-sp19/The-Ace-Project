import { Selector } from 'testcafe';

fixture('core-slider Integration')
  .page('./core-slider.test.html');


async function testSliderBehavior(sliderId, t) {
  const slider = await Selector(sliderId);
  await t
    .expect(slider.visible).ok() // TODO slider not visible??
    .click(slider)
    .expect(slider.getAttribute('value'))
    .eql('50')
    .drag(slider, -150, 0);
}

test('Slide Left', async (t) => {
  await testSliderBehavior('#sliderLeft', t);
});
