$("#game").hide();
$("#reveal").hide();
$("#endGame").hide();


// Set seconds per question
var difficulty = 10;

// Global variables
var round = 0;
var countCorrect = 0;
var countIncorrect = 0;
var countUnanswered = 0;

function gameReset() {
	round = 0;
	countCorrect = 0;
	countIncorrect = 0;
	countUnanswered = 0;
	hideAll();
	$("#startButton").show();
}

//Question bank
var questions = [
	{
	question: "Question 1",
	options: ["Option 1", "Option 2", "Option 3", "Option 4"],
	answer: "Option 1",
	image: ""
	},
	{
	question: "Question 2",
	options: ["Option 1", "Option 2", "Option 3", "Option 4"],
	answer: "Answer 2",
	image: ""
	},
	{
	question: "Question 3",
	options: ["Option 1", "Option 2", "Option 3", "Option 4"],
	answer: "Answer 3",
	image: ""
	},
	{
	question: "Question 4",
	options: ["Option 1", "Option 2", "Option 3", "Option 4"],
	answer: "Answer 4",
	image: ""
	},
	{
	question: "Question 5",
	options: ["Option 1", "Option 2", "Option 3", "Option 4"],
	answer: "Answer 5",
	image: ""
	}
];


// Create timer object
var interval;
var running = false;
var timer = {
	s: difficulty,
	reset: function() {
		timer.s = difficulty;
	},
	start: function() {
		timer.reset();
		$("#timer").text(timer.s);
		if (!running) {
			interval = setInterval(timer.count,1000)
			running = true;
		};
	},
	count: function() {
		if (timer.s === 0) {
			timer.pause();
			console.log("times up")
			return;
		} else {
			timer.s --;
			$("#timer").text(timer.s);
			console.log(timer.s);
		};
	},
	pause: function() {
		clearInterval(interval);
		running = false;
	}
}

// function countDown(seconds) {
// 	var s = seconds
// 	$("#timer").text(s);
// 	var count = setInterval(function() {
// 		if (s === 0) {
// 			clearInterval(count);
// 			console.log("times up")
// 			return;
// 		}
// 			s --;
// 			$("#timer").text(s);
// 			console.log(s);
// 	}, 1000);
// }

// function countdown(seconds) {
// 	remaining = seconds
// 	function sub(){
// 		if (remaining === 0) {
// 			outOfTime();
// 			return;
// 		} else {
// 			remaining --;
// 			$("#timer").text(remaining);
// 			setTimeout(sub, 1000);
// 		}
// 	}
// 	sub();
// };

// Proceed to next question, or end game
function next() {
	round ++;
	timer.pause();
	if (round === 5) {
		setTimeout(endGame,2000);
	} else {
		setTimeout(function(){displayNum(round)},2000);

	}
};

// End game
function endGame() {
	hideAll();
	$("#graphic").hide();
	$("#endGame").show();
};

$("#restart").on("click", function() {
	gameReset();
});

function correct() {
	console.log("correct")
	hideAll();
	$("#correct").show();
	countCorrect ++;
	next();
};

function wrong() {
	console.log("wrong")
	hideAll();
	$("#wrong").show();
	countIncorrect ++;
	next();
};

function outOfTime() {
	$("#reveal").show();
	hideAll();
	$("#outOfTime").show();
	countUnanswered ++;
	next();
};

function hideAll() {
	$("#question").hide();
	$("#options").hide();
	$("#correct").hide();
	$("#wrong").hide();
	$("#outOfTime").hide();
};

function displayNum(q) {
	hideAll();
	$("#question").show();
	$("#options").show();
	//Start timer
	timer.start();
	//Display question
	$("#question").text(questions[q].question)
	//Display options
	var optionsList = questions[q].options
	$("#options").text("")
	for (var i = 0; i < optionsList.length; i++) {
		$("#options").append("<p class='button'>" + optionsList[i] + "</p>")
	};

	//Change gif
	$("#graphic").html("<img src='" + questions[q].image + "'>")
	//When an option is clicked
	$(".button").on("click", function (){
		$("#reveal").show();
		if (questions[q].answer === $(this).text()) {
			correct();
		} else {
			wrong();
		};
		
	});
};

function run() {
	$("#startButton").hide();
	//Display timer
	console.log("Run");
	$("#game").show();

	//Display question and options

	displayNum(round);

		

};

$("#startButton").on("click", run);

