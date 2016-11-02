var app = {};

app.keyCodes = {
	'65': 'A',
	'67': 'C',
	'82': 'R',
	'83': 'S',
	'86': 'V',
	'88': 'X',
	'91': 'CMD'
};

app.combos = ['Save','Cut','Copy','Select All','Paste','Refresh'];

app.keyEvent = function() {
	$(document).on('keydown', function(e) {
		e.preventDefault();
	});
};

app.init = function() {
	//Run a tutorial first
	//Then start the game
	//Give them 2mins to get as many command right, each is 10 points
	//When they get one wrong...lose points?
	app.keyEvents();
};

$(app.init);