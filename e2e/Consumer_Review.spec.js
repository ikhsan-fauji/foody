Feature('Consumer Review');

Before(({ I }) => {
	I.amOnPage('/#/restaurant');
});

Scenario('showing the review form', async ({ I }) => {
	I.amOnPage('/#/restaurant');
	I.seeElement('.restaurant-title a');
	const card = locate('.restaurant-title').first();
	const cardTitle = await I.grabTextFrom(card);
	I.click(cardTitle);

	I.seeElement('#review-form');
	I.seeElement('#name-input', '#review-form');
	I.seeElement('#review-input', '#review-form');
	I.seeElement('.btn-submit', '#review-form');
});

Scenario('validate fields if all empty', async ({ I }) => {
	I.amOnPage('/#/restaurant');
	I.seeElement('.restaurant-title a');
	const card = locate('.restaurant-title').first();
	const cardTitle = await I.grabTextFrom(card);
	I.click(cardTitle);

	I.seeElement('#review-form');
	I.seeElement('#name-input', '#review-form');
	I.seeElement('#review-input', '#review-form');
	I.seeElement('.btn-submit', '#review-form');
	I.click('.btn-submit', '#review-form');
	I.see('Name is required', '#review-form');
	I.see('Message is required', '#review-form');
});

Scenario('validate review field if empty', async ({ I }) => {
	I.amOnPage('/#/restaurant');
	I.seeElement('.restaurant-title a');
	const card = locate('.restaurant-title').first();
	const cardTitle = await I.grabTextFrom(card);
	I.click(cardTitle);

	I.seeElement('#review-form');
	I.seeElement('#name-input', '#review-form');
	I.fillField('Name Input', 'Ikhsan Fauji');
	I.seeElement('#review-input', '#review-form');
	I.seeElement('.btn-submit', '#review-form');
	I.click('.btn-submit', '#review-form');
	I.dontSee('Name is required', '#review-form');
	I.see('Message is required', '#review-form');
});

Scenario('validate name field if empty', async ({ I }) => {
	I.amOnPage('/#/restaurant');
	I.seeElement('.restaurant-title a');
	const card = locate('.restaurant-title').first();
	const cardTitle = await I.grabTextFrom(card);
	I.click(cardTitle);

	I.seeElement('#review-form');
	I.seeElement('#name-input', '#review-form');
	I.seeElement('#review-input', '#review-form');
	I.fillField('Review Input', 'Recommended Restaurant');
	I.seeElement('.btn-submit', '#review-form');
	I.click('.btn-submit', '#review-form');
	I.see('Name is required', '#review-form');
	I.dontSee('Message is required', '#review-form');
});

Scenario('submit the review input', async ({ I }) => {
	I.amOnPage('/#/restaurant');
	I.seeElement('.restaurant-title a');
	const card = locate('.restaurant-title').first();
	const cardTitle = await I.grabTextFrom(card);
	I.click(cardTitle);

	const reviewer = 'Ikhsan Fauji';
	const reviewMessage = 'Recommended Restaurant';

	I.seeElement('#review-form');
	I.seeElement('#name-input', '#review-form');
	I.fillField('Name Input', reviewer);
	I.seeElement('#review-input', '#review-form');
	I.fillField('Review Input', reviewMessage);
	I.seeElement('.btn-submit', '#review-form');
	I.click('.btn-submit', '#review-form');
	I.dontSee('Name is required', '#review-form');
	I.dontSee('Message is required', '#review-form');

	I.wait(2);
	I.see(reviewer, '.review-item');
	I.see(reviewMessage, '.review-item');
});