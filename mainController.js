app.service('randomInteger', function() {
	this.gen= function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
})


app.controller('mainController', function($scope, randomInteger, $timeout){
	// Colour-Word Test Logic

	$scope.homeShow = true;
	$scope.wordShow = false;
	$scope.resultShow = false;
	$scope.openWord = false;
	$scope.plusButtonWord = true;
	$scope.openNum = false;
	$scope.plusButtonNum = true;
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
	$scope.panelConfigWord = function() {
		$scope.openWord = !($scope.openWord);
		$scope.plusButtonWord = !($scope.plusButtonWord);
	}
	$scope.panelConfigNum = function() {
		$scope.openNum = !($scope.openNum);
		$scope.plusButtonNum = !($scope.plusButtonNum);
	}
	$scope.changeClass = function() {
		$scope.colorNumber = randomInteger.gen(0,22);
		$scope.class = colors[$scope.colorNumber];
	}
	$scope.changeWordPage = function() {
		$scope.homeShow = !($scope.homeShow);
		$scope.wordShow = !($scope.wordShow);
	}
	$scope.resultPage = function() {
		$scope.stopWordTimer();
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
		var nums = [];
		while (nums.length < 5) {
			var randnum = randomInteger.gen(0,8);
			if (nums.indexOf(randnum) > -1) continue;
			nums[nums.length] = randnum;
		}
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

	// Timer:

	$scope.stopWordTimer = function() {
		$timeout.cancel(timer);
		timer = null;
	};
	$scope.startWordTimer = function() {
		$scope.time = 3;
		if (timer == null) {
			updateWordTimer();
		}
	};
	var updateWordTimer = function() {
		$scope.time--;
		timer = $timeout(updateWordTimer, 1000);
		if ($scope.time == 0) {
			$scope.next();
		}
	};


	$scope.verify = function(x) {
		if (x === $scope.answer) {
			$scope.score++;
			console.log(x);
		}
		$scope.question++;
	}

	$scope.startBtn = function() {
		$scope.score = 0;
		$scope.question = 1;
		$scope.startWordTimer();
		$scope.changeWordPage();
		$scope.diffWord();
		$scope.changeClass();
		$scope.genOptions();
	}

	$scope.next = function(x) {
		$scope.stopWordTimer();
		$scope.startWordTimer();
		if ($scope.question === 10) {
			$scope.verify(x);
			$scope.stopWordTimer();
			$scope.resultPage();
		}
		else {
			$scope.verify(x);
			$scope.diffWord();
			$scope.changeClass();
			$scope.genOptions();
		}
		
	}


	// Number Test Logic

	var sizes = ["tiny", "small", "medsmall", "medium", "big", "verybig", "large"];
	$scope.numberShow = false;
	$scope.changeNumberPage = function() {
		$scope.homeShow = !($scope.homeShow);
		$scope.numberShow = !($scope.numberShow);
	}
	$scope.changeSizeClass = function() {
		$scope.sizeNumberOne = randomInteger.gen(0,6);
		$scope.sizeClassOne = sizes[$scope.sizeNumberOne];
		$scope.sizeNumberTwo = randomInteger.gen(0,6);
		$scope.sizeClassTwo = sizes[$scope.sizeNumberTwo];
	}
	$scope.diffNum = function() {
		$scope.numOne = randomInteger.gen(0,9);
		$scope.numTwo = randomInteger.gen(0,9);
	}
	$scope.verifyNum= function(x) {
		if ($scope.numOne > $scope.numTwo) {
			if (x == $scope.numOne) {
				$scope.score++;
				console.log(x);
			}
		}
		else if ($scope.numOne < $scope.numTwo) {
			if (x == $scope.numTwo) {
				$scope.score++;
				console.log(x);
			}
		}
		else {
			$scope.score++;
			console.log(x);
		}
		$scope.question++;
	}

	$scope.stopNumTimer = function() {
		$timeout.cancel(timer);
		timer = null;
	};
	$scope.startNumTimer = function() {
		$scope.time = 2;
		if (timer == null) {
			updateNumTimer();
		}
	};
	var updateNumTimer = function() {
		$scope.time--;
		timer = $timeout(updateNumTimer, 1000);
		if ($scope.time == 0) {
			$scope.nextNum();
		}
	};

	$scope.quit = function() {
		$scope.stopNumTimer();
		$scope.numberShow = !($scope.numberShow);
		$scope.resultShow = !($scope.resultShow);
	}

	$scope.startNumberBtn = function() {
		$scope.score = 0;
		$scope.question = 1;
		$scope.startNumTimer();
		$scope.changeNumberPage();
		$scope.changeSizeClass();
		$scope.diffNum();
	}
	$scope.nextNum = function(x) {
		$scope.stopNumTimer();
		$scope.startNumTimer();
		if ($scope.question === 10) {
			$scope.verifyNum(x);
			$scope.stopNumTimer();
			$scope.quit();
		}
		else {
			$scope.verifyNum(x);
			$scope.diffNum();
			$scope.changeSizeClass();
		}
	}

});
