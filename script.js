/*
	Countdown
*/
// Set the date we're counting down to
var countdownDate = new Date(
	"December 25, 2021 00:00:00"
).getTime(); /* hrs: min: sec */

// Update the count down every 1 second
var x = setInterval(function () {
	// Get todays date and time
	var now = new Date().getTime();

	// Find the distance between now and the count down date
	var distance = countdownDate - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Display the result in the element
	$("#d").text(addZero(days));
	$("#h").text(addZero(hours));
	$("#m").text(addZero(minutes));
	$("#s").text(addZero(seconds));

	// If the count down is finished, write some text
	if (distance < 0) {
		clearInterval(x);
		document.getElementById("countdown-box").innerHTML =
			"<span class='cdi'>Merry Christmas!!</span>";
		$(".title").text("");
	}
}, 1000);
function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
function isMobile() {
	if (window.innerWidth < 775) {
		return true;
	} else {
		return false;
	}
}

/*
	Music
*/
var audioFiles = [
	"christmas-party.mp3",
	"christmas-rock.mp3",
	"happy-new-year.mp3",
	"jingle-bells.mp3",
	"snowflake.mp3",
	"upbeat-countdown.mp3"
];
var audio;
var playlist;
var tracks;
var current;

generateShuffle();

function generateShuffle() {
	var shuff = shuffle(audioFiles);
	init();

	document.querySelector("#music-list ul").innerHTML = "";

	for (var i = 0; i < shuff.length; i++) {
		var li = document.createElement("li");
		li.innerHTML = shuff[i].toString().replace("-", " ").replace(".mp3", "");
		document.querySelector("#music-list ul").appendChild(li);
	}

	document
		.querySelectorAll("#music-list ul li")
		[current].classList.add("active");
}

function init() {
	current = 0;
	audio = document.getElementById("audio");
	//audio[0].volume = .40;
	len = audioFiles.length;

	run(audioFiles[current], audio);

	audio.addEventListener("ended", function (e) {
		current++;
		if (current == len) {
			current = 0;
		}
		run(audioFiles[current], audio);
		//added
		if (current !== 0) {
			document
				.querySelectorAll("#music-list ul li")
				[current - 1].classList.remove("active");
		} else {
			document
				.querySelectorAll("#music-list ul li")
				[audioFiles.length - 1].classList.remove("active");
		}
		document
			.querySelectorAll("#music-list ul li")
			[current].classList.add("active");
	});
}

function run(link, player) {
	player.src =
		"https://raw.githubusercontent.com/ZaneWesley/image-dropbox/main/christmas-audio/" +
		link;
	audio.load();
	audio.play();
}

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

document.getElementById("play-toggle").addEventListener("click", function (e) {
	if (this.innerHTML == "volume_off") {
		audio.play();
		this.innerHTML = "volume_up";
	} else {
		audio.pause();
		this.innerHTML = "volume_off";
	}
});

document.getElementById("queue-toggle").addEventListener("click", function (e) {
	if (this.innerHTML == "arrow_circle_up") {
		document.getElementById("music-list").classList.add("open");
		this.innerHTML = "arrow_circle_down";
	} else {
		document.getElementById("music-list").classList.remove("open");
		this.innerHTML = "arrow_circle_up";
	}
});

/*
	Canvas
*/
(function () {
	"use strict";
	window.addEventListener("load", function () {
		var canvas = document.getElementById("canvas");

		if (!canvas || !canvas.getContext) {
			return false;
		}

		/********************
          Random Number
        ********************/

		function rand(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		/********************
          Var
        ********************/

		// canvas
		var ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		var X = canvas.width;
		var Y = canvas.height;

		/********************
          Animation
        ********************/

		window.requestAnimationFrame =
			window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (cb) {
				setTimeout(cb, 17);
			};

		/* var bgImg = 'https://raw.githubusercontent.com/ZaneWesley/image-dropbox/main/christmas/bg.jpg';

         function drawBg() {
         	//
         }*/

		/********************
          Snow
        ********************/

		// var
		var snowNum = 80;
		var backSnowNum = 80;
		var snows = [];
		var backSnows = [];

		if (X < 768) {
			snowNum = 25;
			backSnowNum = 25;
		}

		function Snow(ctx, x, y, r, g) {
			this.ctx = ctx;
			this.init(x, y, r, g);
		}

		Snow.prototype.init = function (x, y, r, g) {
			this.x = x;
			this.y = y;
			this.r = r;
			this.c = "255, 255, 255";
			this.v = {
				x: 0,
				y: g
			};
		};

		Snow.prototype.updatePosition = function () {
			this.y += this.v.y;
		};

		Snow.prototype.wrapPosition = function () {
			if (this.x - this.r > X) {
				this.x = 0;
			}
			if (this.x + this.r < 0) {
				this.x = X;
			}
			if (this.y - this.r > Y) {
				this.y = 0;
			}
			if (this.y + this.r < 0) {
				this.y = Y;
			}
		};

		Snow.prototype.draw = function () {
			ctx = this.ctx;
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = this.gradient();
			ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		};

		Snow.prototype.gradient = function () {
			var col = this.c;
			var g = this.ctx.createRadialGradient(
				this.x,
				this.y,
				0,
				this.x,
				this.y,
				this.r
			);
			g.addColorStop(0, "rgba(" + col + ", " + 1 * 1 + ")");
			g.addColorStop(0.5, "rgba(" + col + ", " + 1 * 0.2 + ")");
			g.addColorStop(1, "rgba(" + col + ", " + 1 * 0 + ")");
			return g;
		};

		Snow.prototype.resize = function () {
			this.x = rand(0, X);
			this.y = rand(0, Y);
		};

		Snow.prototype.render = function () {
			this.updatePosition();
			this.wrapPosition();
			this.draw();
		};

		for (var i = 0; i < backSnowNum; i++) {
			var snow = new Snow(ctx, rand(0, X), rand(0, Y), rand(1, 5), Math.random());
			backSnows.push(snow);
		}

		for (var i = 0; i < snowNum; i++) {
			var snow = new Snow(
				ctx,
				rand(0, X),
				rand(0, Y),
				rand(7, 10),
				Math.random() + 0.3
			);
			snows.push(snow);
		}

		/********************
          Render
        ********************/

		function render() {
			ctx.clearRect(0, 0, X, Y);
			//drawBg();
			for (var i = 0; i < backSnows.length; i++) {
				backSnows[i].render();
			}
			for (var i = 0; i < snows.length; i++) {
				snows[i].render();
			}
			requestAnimationFrame(render);
		}

		render();

		/********************
          Event
        ********************/

		// resize
		function onResize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			X = canvas.width;
			Y = canvas.height;
			//drawBg();
			for (var i = 0; i < backSnows.length; i++) {
				backSnows[i].resize();
			}
			for (var i = 0; i < snows.length; i++) {
				snows[i].resize();
			}
		}

		window.addEventListener("resize", function () {
			onResize();
		});
	});
})();
