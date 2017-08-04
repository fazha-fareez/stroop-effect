
app.service('randomInteger', function() {
	this.gen= function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
})

app.controller('mainController', function($scope, randomInteger){
	$scope.homeShow = true;
	$scope.wordShow = false;
	var words = ["purple", "green", "red", "blue", "yellow", "orange", "pink", "white", "brown"];
	var colors = ["darkpurple", "lightpurple", "medpurple", "darkgreen", "lightgreen", "medgreen", "darkred", "lightred", "medred",
	"darkblue", "lightblue", "medblue", "darkyellow", "lightyellow", "darkorange", "lightorange", "medorange", 
	"hotpink", "darkpink", "lightpink", "medpink", "white", "darkbrown", "lightbrown", "medbrown"];
	var dict = {
		purple: ["darkpurple", "lightpurple", "medpurple"],
		green: ["darkgreen", "lightgreen", "medgreen"],
		red: ["darkred", "lightred", "medred"],
		blue: ["darkblue", "lightblue", "medblue"],
		yellow: ["darkyellow", "lightyellow"],
		orange: ["darkorange", "lightorange", "medorange"],
		pink: ["hotpink", "darkpink", "lightpink"],
		white: ["white"],
		brown: ["darkbrown", "lightbrown", "medbrown"]
	};
	$scope.changeClass = function() {
		$scope.colorNumber = randomInteger.gen(0,2);
		$scope.class = words[$scope.colorNumber];
	}
	$scope.change = function() {
		$scope.homeShow = !($scope.homeShow);
		$scope.wordShow = !($scope.wordShow);
	}
	$scope.reloadPage = function() {
		window.location.reload();
	}
	$scope.diffWord = function() {
		$scope.wordNumber = randomInteger.gen(0,8);
		$scope.color = words[$scope.wordNumber];
	}


	$scope.startBtn = function() {
		$scope.change();
		$scope.diffWord();
		$scope.changeClass();
	}

	$scope.nextBtn = function() {
		$scope.diffWord();
		$scope.changeClass();
	}

});

