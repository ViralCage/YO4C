var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope, $interval) {
	$scope.showAltCard = false;
	var currentYear = moment().format('YYYY');
	var target = new Date(moment(currentYear + '-12-25T00:00:00.000Z'));

	if (moment() < target) {
		$scope.year = moment().format('YYYY');
		$scope.deadline = moment($scope.year + '-12-25T00:00:00.000Z').valueOf();
	} else {
		$scope.year = moment().add(1, 'year').format('YYYY');
		$scope.deadline = moment($scope.year + '-12-25T00:00:00.000Z').valueOf();

	}

	;

	$scope.showCard = function(cardToShow) {
		$scope.showAltCard = true;
		$scope.show = cardToShow;
	};

	var updateClock = function() {
		var now = moment().valueOf();
		var diffTime = $scope.deadline - now;

		var myDuration = moment.duration(diffTime, 'seconds');

		now = moment().valueOf();
		$scope.displayNow = now;
		myDuration = moment.duration(myDuration.asSeconds() - 1, 'seconds');
		$scope.days = Math.floor(moment.duration(diffTime).asDays());
		$scope.hours = Math.floor(moment.duration(diffTime).asHours() % 24);
		$scope.minutes = Math.floor(moment.duration(diffTime).asMinutes() % 60);
		$scope.seconds = Math.floor(moment.duration(diffTime).asSeconds() % 60);

		$scope.monthsToGo = Math.floor(moment.duration(diffTime).asMonths()).toLocaleString();
		$scope.weeksToGo = Math.floor(moment.duration(diffTime).asWeeks()).toLocaleString();
		$scope.daysToGo = Math.floor(moment.duration(diffTime).asDays()).toLocaleString();
		$scope.sleepsToGo = Math.floor(moment.duration(diffTime).asDays() + 1).toLocaleString();
		$scope.hoursToGo = Math.floor(moment.duration(diffTime).asHours()).toLocaleString();
		$scope.minutesToGo = Math.floor(moment.duration(diffTime).asMinutes()).toLocaleString();
		$scope.secondsToGo = Math.floor(moment.duration(diffTime).asSeconds()).toLocaleString();
	};
	$interval(updateClock, 1000)

	snowStorm.excludeMobile = false;
	snowStorm.snowStick = true;
	snowStorm.randomizeWind();
});
