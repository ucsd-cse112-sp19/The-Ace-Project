import { Selector } from 'testcafe';

fixture('Getting Started')
  .skip
  .page('http://devexpress.github.io/testcafe/example');

test('My first test', async (t) => {
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button');

  const articleHeader = await Selector('#article-header');

  // Obtain the text of the article header
  const headerText = await articleHeader.innerText;

  await t.expect(headerText).eql('Thank you, John Smith!');
});
