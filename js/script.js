var app = {};

app.score = 0;

app.canvas = document.querySelector('.points-canvas');
app.ctx = app.canvas.getContext('2d');


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

app.fanFairColours = ['#FFD636','#FF5912','#F28C4B','#47A6FF','#7F2B7D','#64CC41'];

app.activeKeys = [];

app.currentCombo = {};

app.fanFairBalls = [];

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
	var random = getRandomItem(app.combos);
	app.currentCombo = random;
	$('.combo').html(random.title);
}

app.checkCombo = function() {
	var keys = app.activeKeys.map(function(key,i) {
		if(key === app.currentCombo.combo[i]) {
			return true;
		}
	}).filter(function(value) { return value});

	if(keys.length === 2) {
		app.score++;
		$('.points').text(app.score);
		app.fanFair();
	}
	setTimeout(function() {
		app.randomCombo();
		app.activeKeys = [];
		app.renderKeys();
	},200);
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

app.time = 60000;

app.timer = function() {
	app.interval = setInterval(function() {
		app.time -= 1000;
		var mins = Math.floor((app.time / 1000) / 60);
		var secs = (app.time / 1000) % 60;
		$('.mins').text(mins);
		$('.secs').text(secs);
		if(app.time === 0) {
			clearInterval(app.interval);
			clearInterval(app.gameInterval);
		}
	},1000);
};

app.fanFair = function() {
	for(var i = 0; i < 50; i++) {
		app.fanFairBalls.push({
			colour: getRandomItem(app.fanFairColours),
			life: 1,
			radius: Math.floor(Math.random() * 5) + 2,
			x: app.pointsCanvas.width() / 2,
			y: app.pointsCanvas.height() / 2
		});
	}
}

app.gameLoop = function() {
	app.ctx.fillStyle = '#eee';
	app.ctx.fillRect(0,0,app.pointsCanvas.width(), app.pointsCanvas.height());	

	app.fanFairBalls.forEach(function(ball,i) {
		ball.life -= 0.1;
		app.ctx.beginPath();
		app.ctx.fillStyle = ball.colour;
		app.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
		app.ctx.fill();
		ball.x -= randomNum(15) - 8;
		ball.y -= randomNum(18) - 3;
		if(ball.opacity === 0) {
			app.fanFairBalls.splice(i,1);
		}
	});
};

app.init = function() {
	app.pointsCanvas = $('.points-canvas');
	app.canvas.height = app.pointsCanvas.height();
	app.canvas.width = app.pointsCanvas.width();
	//Run a tutorial first
	//Then start the game
	//Give them 2mins to get as many command right, each is 10 points
	//When they get one wrong...lose points? 
	// when they get one right extra time - positive not negative reinforcement 
	$(document).one('click',function() {
		app.keyEvents();
		app.randomCombo();
		app.timer();
		app.gameInterval = setInterval(app.gameLoop,1000/60);
	});
};

$(app.init);


function getRandomItem(arr) {
	return arr[randomNum(arr.length)];
}

function randomNum(limit) {
	return Math.floor(Math.random() * limit);
}