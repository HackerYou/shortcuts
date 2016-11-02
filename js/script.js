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

app.combos = [
	{
		title: 'Save',
		combo: ['CMD','S']
	},
	{
		title: 'Cut',
		combo: ['CMD','X']
	},
	{
		title: 'Copy',
		combo: ['CMD', 'C']
	},
	{
		title: 'Select All',
		combo: ['CMD', 'A']
	},
	{
		title: 'Paste',
		combo: ['CMD', 'V']
	},
	{
		title: 'Refresh',
		combo: ['CMD', 'R']
	}
];

app.activeKeys = [];
app.currentCombo = {};


app.renderKeys = function() {
	var html = app.activeKeys.map(function(code) {
		if (code === undefined) {
			code = 'Other'
		} 
		return `
			<div class="key">${code}</div>
		`
	});
	$('.keys').html(html.join(''));
};

app.randomCombo = function() {
	var random = app.combos[Math.floor(Math.random() * app.combos.length)];
	app.currentCombo = random;
	$('.combo').html(random.title);
}

app.checkCombo = function() {
	var keys = app.activeKeys.map(function(key,i) {
		if(key === app.currentCombo.combo[i]) {
			return true;
		}
	});
	
	app.activeKeys = [];
}

app.keyEvents = function() {
	$(document).on('keydown', function(e) {
		e.preventDefault();
		app.activeKeys.push(app.keyCodes[e.keyCode]);
		if(app.activeKeys.length > 1) {
			app.checkCombo();
		}
		app.renderKeys();
	});
};

app.init = function() {
	//Run a tutorial first
	//Then start the game
	//Give them 2mins to get as many command right, each is 10 points
	//When they get one wrong...lose points? 
	// when they get one right extra time - positive not negative reinforcement 
	app.keyEvents();
	app.randomCombo();
};

$(app.init);