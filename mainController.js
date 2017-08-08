
app.service('randomInteger', function() {
	this.gen= function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
})


app.controller('mainController', function($scope, randomInteger){
	$scope.homeShow = true;
	$scope.wordShow = false;
	$scope.resultShow = false;
	var timer;
	var words = ["purple", "green", "red", "blue", "yellow", "orange", "pink", "white", "brown"];
	var colors = ["darkpurple", "lightpurple", "medpurple", "darkgreen", "lightgreen", "medgreen", "darkred", "lightred", "medred",
	"darkblue", "lightblue", "medblue", "darkyellow", "lightyellow", "darkorange", "hotpink", "darkpink", "lightpink", "medpink", "white", "darkbrown", "lightbrown", "medbrown"];
	var dict = {
		"purple": ["darkpurple", "lightpurple", "medpurple"],
		"green": ["darkgreen", "lightgreen", "medgreen"],
		"red": ["darkred", "lightred", "medred"],
		"blue": ["darkblue", "lightblue", "medblue"],
		"yellow": ["darkyellow", "lightyellow"],
		"orange": ["darkorange"],
		"pink": ["hotpink", "darkpink", "lightpink"],
		"white": ["white"],
		"brown": ["darkbrown", "lightbrown", "medbrown"]
	};
	$scope.changeClass = function() {
		$scope.colorNumber = randomInteger.gen(0,22);
		$scope.class = colors[$scope.colorNumber];
	}
	$scope.change = function() {
		$scope.homeShow = !($scope.homeShow);
		$scope.wordShow = !($scope.wordShow);
	}
	$scope.resultPage = function() {
		$scope.wordShow = !($scope.wordShow);
		$scope.resultShow = !($scope.resultShow);
	}
	$scope.reloadPage = function() {
		window.location.reload();
	}
	$scope.diffWord = function() {
		$scope.wordNumber = randomInteger.gen(0,8);
		$scope.color = words[$scope.wordNumber];
	}
	$scope.genOptions = function() {
		$scope.arr = [];
		var nums = chance.unique(chance.natural, 5, {min: 0, max: 8});
		var i = 0;
		while (i < nums.length) {
			$scope.arr.push(words[nums[i]]);
			i++;
		}
		var a = 0;
		var match = false;
		while (a < $scope.arr.length) {
			if ($scope.class.indexOf($scope.arr[a]) !== -1) {
				$scope.answer = $scope.arr[a];
				match = true;
				break;
			}
			else { a++; }
		}
		if (match === false) {
			var index = randomInteger.gen(0,4);
			var pos = 0;
			while (pos < Object.keys(dict).length) {
				if ($scope.class.indexOf(Object.keys(dict)[pos]) !== -1) {
					$scope.answer = Object.keys(dict)[pos];
					$scope.arr[index] = Object.keys(dict)[pos];
					break;
				}
				else { pos++; }
			}
		}
		console.log($scope.arr);
	}

	$scope.timer = function() {
		$scope.startTime = 3;
		$scope.x = setInterval(function() {
			$scope.startTime--;
			$scope.$apply();
			if ($scope.startTime <= 0) {
				$scope.question++;
				$scope.next();
			}
		}, 1000);
	}

	$scope.verify = function(x) {
		if (x === $scope.answer) {
			$scope.score++;
			$scope.question++;
		}
		else { $scope.question++; }
	}


	$scope.startBtn = function() {
		$scope.score = 0;
		$scope.question = 0;
		$scope.change();
		$scope.timer();
		$scope.diffWord();
		$scope.changeClass();
		$scope.genOptions();
	}

	$scope.next = function(x) {
		if ($scope.question === 9) {
			clearInterval($scope.x);
			$scope.resultPage();
		}
		else {
			clearInterval($scope.x);
			$scope.timer();
			$scope.verify(x);
			$scope.diffWord();
			$scope.changeClass();
			$scope.genOptions();
		}
		
	}

});

