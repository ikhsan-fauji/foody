Feature('Liking Restaurant');

Before(({ I }) => {
	I.amOnPage('/#/restaurant');
});

Scenario('test something', ({ I }) => {
	I.seeElement('#restaurant');	
});
