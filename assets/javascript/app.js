$("#game").hide();
$("#reveal").hide();
$("#endGame").hide();


// Set seconds per question
var difficulty = 20;

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
	$("#game").hide();
	$("#endGame").hide();
}

//Question bank
var questions = [
	{
	question: "Kowloon Walled City once had a population density of?",
	options: ["3,250 people per square mile", "7,250 people per square mile", "725,000 people per square mile", "3,250,000 people per square mile"],
	answer: "3,250,000 people per square mile",
	image: "assets/images/crowd.gif"
	},
	{
	question: "In 2012, how much USD did a Hong Kong billionaire offer to any man able to woo and marry his lesbian daughter?",
	options: ["$1 million", "$10 million", "$25 million", "$65 million"],
	answer: "$65 million",
	image: "assets/images/makeitrain.gif"
	},
	{
	question: "How many skyscrapers does Hong Kong have?",
	options: ["589", "755", "1,223", "1,502"],
	answer: "1,223",
	image: "assets/images/skyscraper.gif"
	},
	{
	question: "What percentage of Hong Kong Island is urbanized?",
	options: ["25%", "46%", "78%", "85%"],
	answer: "25%",
	image: "assets/images/nature.gif"
	},
	{
	question: "Hong Kong's subway system is on-time ____ of the time?",
	options: ["34%", "78%", "94%", "99%"],
	answer: "99%",
	image: "assets/images/punctual.gif"
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
			outOfTime();
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
		setTimeout(endGame,3000);
	} else {
		setTimeout(function(){displayNum(round)},4000);

	}
};

// End game
function endGame() {
	$("#countCorrect").text(countCorrect);
	$("#countIncorrect").text(countIncorrect);
	$("#countUnanswered").text(countUnanswered);
	
	hideAll();
	$("#reveal").hide();
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
	console.log("out of time")
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
	// $("#graphic").hide();
};

function displayNum(q) {
	hideAll();
	$("#reveal").hide();
	$("#question").show();
	$("#options").show();
	// Start timer
	timer.start();
	// Display question
	$("#question").text(questions[q].question)
	// Display options
	var optionsList = questions[q].options
	$("#options").text("")
	for (var i = 0; i < optionsList.length; i++) {
		$("#options").append("<p class='button'>" + optionsList[i] + "</p>")
	};
	// Correct answer
	$("#answer").text(questions[q].answer)
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

