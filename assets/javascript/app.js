var myQuestions = [
  {
    question: "What does Espresso literally mean?",
    choices: ["Speed it up", "To go", "Forced out", "Black and intense"],
    answer: "Forced out"
  },
  {
    question: "Which country produces the most coffee in the world?",
    choices: ["Colombia", "Brazil", "Turkey", "Vietnam"],
    answer: "Brazil"
  },
  {
    question: "The word 'coffee' comes from the Arabic word for ___?",
    choices: ["Fruit", "Wine", "Cocaine", "Medicine"],
    answer: "Wine"
  },
  {
    question: "How many calories of one cup of black coffee contian?",
    choices: ["0 calorie", "1 calories", "10 calories", "11 calories"],
    answer: "1 calories"
  },
  {
    question: "Which country consumes the most coffee in the world per capita?",
    choices: ["USA", "Italy", "Finland", "Japan"],
    answer: "Finland"
  },
  {
    question: "Coffee has more ____ than wine.",
    choices: ["Potassium", "Vitamin", "Antioxidants", "All of them"],
    answer: "Antioxidants"
  },
  {
    question: "Drinking coffee regulary may lower your chance of ___?",
    choices: ["Cancer", "Diabetes", "Alzheimer's", "All of them"],
    answer: "All of them"
  },
  {
    question: "The average seven-ounce cup of coffee contains about ____ caffeine?",
    choices: ["10 milligrams", "50 milligrams", "150 milligrams", "300 milligrams"],
    answer: "150 milligrams"
  },
  {
    question: "In Italy, during the 16th century coffee was banned as being ___ .",
    choices: ["Over-stimulating", "Satanic", "Unhealthy", "Addictive"],
    answer: "Satanic"
  },
  {
    question: "What is considered a lethal dose of caffeine?",
    choices: ["1 g", "5 g", "10 g", "50 g"],
    answer: "10 g"
  }
]

var chosenQuestion;
var correctScore = 0;
var wrongScore = 0;
var unanswered = 0;
var timer = 15;
var indexCount = 0;

var correctImage = "assets/images/correct.png";
var wrongImage = "assets/images/wrong.png";
var timeisupImage = "assets/images/timeisup.png";

//show question
function showQuestion(num) {
  chosenQuestion = myQuestions[num];
  console.log(chosenQuestion);

  $("#game").show();
  $("#gameAnswer").hide();

  $("#showQuestion").html("<p>" + chosenQuestion.question + "</p>");
  $("#showChoices").html("<button class='choice'>" + chosenQuestion.choices[0] + "</button>");
  $("#showChoices").append("<button class='choice'>" + chosenQuestion.choices[1] + "</button>");
  $("#showChoices").append("<button class='choice'>" + chosenQuestion.choices[2] + "</button>");
  $("#showChoices").append("<button class='choice'>" + chosenQuestion.choices[3] + "</button>");
}

//start timer
function startTimer() {
  $("#timer").show();
  timer = 15;
  $("#timer").html("<p>" + timer + "</p>");
  intervalId = setInterval(decrement, 1000);
}
//decrement timer by 1 
function decrement() {
  timer--;
  $("#timer").html("<p>" + timer + "</p>");
  console.log("time remaining: " + timer);

  if (timer === 0) {
    //stop timer
    stopTimer();

    $("#timer").hide();
    $("#gameAnswer").show();
    $("#gameAnswerImage").attr("src", timeisupImage);
    $("button").prop("disabled", true).removeClass("choice");
    unanswered++;
    console.log(indexCount + " from stopTimer");

    //if there're more questions,
    if (indexCount < myQuestions.length - 1) {  //if indexCount is 0 or 1, not 2
      //show next question after 3 sec
      setTimeout(
        function () {
          indexCount = indexCount + 1;  //++count is same as count + 1
          console.log(indexCount + " from setTimeout");
          runGame();
        }, 3000);
      console.log("time up, next question!");
    } else {
      //show result after 3 sec
      setTimeout(
        function () {
          showResult();
        }, 3000);
    }
  }
}
function stopTimer() {
  clearInterval(intervalId);
}

//show result at the end of game
function showResult() {
  $("#timer").hide();
  $("#game").hide();
  $("#gameAnswer").hide();
  $("#result").show();

  console.log("correctScore is: " + correctScore);

  var message = "";
  if (correctScore > myQuestions.length - 2) {  //less than 3 mistakes
    message = "You are a coffee master!";
  } else if (correctScore > myQuestions.length * 0.5) {  //less than 50% mistakes
    message = "Good job!";
  } else {
    message = "Try again!";
  }

  var yourMessage = $("<p>").html(message);
  var yourCorrectScore = $("<p>Correct answers</p><p class='score'>" + correctScore + "</p>");
  var yourWrongScore = $("<p>Wrong answers</p><p class='score'>" + wrongScore + "</p>");
  var yourUnanswered = $("<p>Unanswered</p><p class='score'>" + unanswered + "</p>");
  var resetButton = $("<button id='restart'>").html("restart");

  $("#result").append(yourMessage);
  $("#result").append(yourCorrectScore);
  $("#result").append(yourWrongScore);
  $("#result").append(yourUnanswered);
  $("#result").append(resetButton);

  //when user click restart button,
  $("#restart").click(function () {
    reset();
  });
}

//reset game
function reset() {
  $("#result").empty().hide();
  correctScore = 0;
  wrongScore = 0;
  unanswered = 0;
  indexCount = 0;

  runGame();
}

//run question
function runGame() {
  startTimer();
  showQuestion(indexCount);

  console.log(indexCount + " from runGame");

  //when choice button is clicked
  $(".choice").click(function () {
    stopTimer();
    $("#timer").hide();
    $("#gameAnswer").show();
    $("button").prop("disabled", true).removeClass("choice");

    //if user choice is correct/wrong,
    if ($(this).text() === chosenQuestion.answer) {
      $("#gameAnswerImage").attr("src", correctImage);
      $(this).addClass("correct");
      correctScore++;
    } else {
      $("#gameAnswerImage").attr("src", wrongImage);
      $(this).addClass("wrong");
      wrongScore++;

      //test
      // $(".choice:contains('" + chosenQuestion.answer + "')").addClass("correct-2");
      // console.log(chosenQuestion.answer);

    }

    //if there're more questions,
    if (indexCount < myQuestions.length - 1) {
      //show next question after 3 sec
      setTimeout(
        function () {
          indexCount++;   //++count is same as count + 1
          runGame();
        }, 3000);
    } else {
      //show result after 3 sec
      setTimeout(
        function () {
          showResult();
        }, 3000);
    }

  });
}

//when dom is loaded,
$(document).ready(function () {
  $("#gameAnswer").hide();
  $("#result").hide();

  //when start button is clicked, game starts
  $("#start").click(function () {
    $("span").addClass("height");
    $("#start").addClass("opacity");
    setTimeout(
      function () {
        $("#start").hide();
        runGame();
      }, 1000);
  });
});


