

// amalgamation of gpt/w3schools/own questions

const quizQuestions = [
    {
        question: "Which of these is not a data type in JavaScript?",
        choices: ["Integer", "Null", "BigInt", "Symbol"],
        answers: "Integer",
    },
    {
        question: "Which of the following methods is used to add an element to the end of an array in JavaScript?",
        choices: ["Push()", "Pop()", "Shift()", "Unshift()"],
        answers: "Push()",

    },
    {
        question: "What is the purpose of the (typeof) operator in JavaScript? ",
        choices: ["22", "4", "To determine the variable's data type", "Type Error",],
        answers: "To determine the variable's data type ",

    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["document.write()", "console.log()", "window.alert()", "all of the above"],
        answers: "window.alert()",

    },
    {
        question: "What is the correct way to write a comment in JavaScript?",
        choices: ["<!-- Comment -->", "// Comment", "/* Comment */", "** Comment **"],
        answers: "// Comment",

    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choices: ["X", "*", "-", "="],
        answers: "=",

    },
    {
        question: "How to write an IF statement for executing some code if i is NOT equal to 5?",
        choices: ["if i <> 5", "if (i <> 5)", "if i =! 5 then", "if (i != 5)"],
        answers: "if (i != 5)",

    },

]

var newScore = "";


var play = document.querySelector("#play");
var timer = document.querySelector("#timer")
var tryAgain = document.querySelector("#tryAgain") //not used yet
var choiceEl = document.querySelector("#choices"); //need to string this to options
var scoreTable = document.querySelector("#scoreTable")
var quizContainer = document.querySelector("#quizContainer") //not used yet
// document targets the doc and queryselector targets the element

var score = 0
var secondsLeft = 60
var currentQuestionIndex = 0;

var playAgain = document.querySelector("#reset");
// playAgain.addEventListener('click', reset);

play.style.visibility = "visible";


play.addEventListener('click', startGame);
// optionEl.addEventListener('click', checkAnswer);

function startTimer() {

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            secondsLeft = 0
            timer.textContent = secondsLeft;
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000)

}


function startGame() {

    displayQuestions(); // displaying the Q
    startTimer();
    document.querySelector("#scoreTable").parentElement.classList.add("hidden");
    play.style.visibility = "hidden"; // this should hide my button afterwards

}

function displayQuestions() {
    var currentQuestion = quizQuestions[currentQuestionIndex]; // grabbing Q from the array
    var questionEl = document.querySelector("#question"); // a way to attach Q to an el

    questionEl.textContent = currentQuestion.question; // attaching q to el
    console.log(currentQuestion)

    choiceEl.innerHTML = '';

    currentQuestion.choices.forEach((choices, index) => {
        var optionEl = document.createElement('li'); // creating an element
        // optionEl.classList.add("choices"); // listing those choices onto li
        optionEl.textContent = choices; // allowing the text to appear on li
        choiceEl.appendChild(optionEl); // appending to html

        optionEl.addEventListener('click', checkAnswer);
    });
    console.log(choiceEl)
}


function checkAnswer(event) {
    var userAnswer = event.target.textContent; // not working
    // its one big block? wont let me distinguish them 
    var currentQuestion = quizQuestions[currentQuestionIndex];


    if (userAnswer === currentQuestion.answers) {
        score++;
        window.alert('Correct!');


    }
    else {
        secondsLeft -= 100;
        window.alert('Incorrect!');
    }

    currentQuestionIndex++;
    if (currentQuestionIndex === quizQuestions.length) {
        endQuiz()
    } else {
        displayQuestions()
    }
}



function endQuiz() {
    document.getElementById('game').classList.add("hidden")
    document.getElementById('initials').classList.remove("hidden")// this will remove the hidden
    window.alert('Quiz ended. Your score: ' + score);
    document.querySelector("#saveBtn").onclick = saveScore;


}


function saveScore() {
    var initials = document.querySelector("input").value.trim();
    if (!initials) {
        alert("Please add your initials!")
        return;
    }

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var newScore = { initials, score };
    highScores.push(newScore);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayScores();
    document.getElementById('initials').classList.add("hidden");
    document.querySelector("#scoreTable").parentElement.classList.remove("hidden");
}

function displayScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(highScores);
    var scoreTable = document.querySelector("#scoreTable")
    scoreTable.innerHTML = '';

    for (var i = 0; i < highScores.length; i++) {
        var scoreList = document.createElement('li');
        scoreList.textContent = highScores[i].initials + ": " + highScores[i].score; // able to get values from the array stored
        scoreTable.appendChild(scoreList);
    }
}

function reset() {
    score = 0;
    secondsLeft = 60;
    currentQuestionIndex = 0

    document.getElementById('game').classList.remove("hidden")
    document.getElementById('initials').classList.add("hidden")
    document.getElementById('initials').classList.remove("hidden");
    document.querySelector("#scoreTable").parentElement.classList.add("hidden");
    document.getElementById('reset').classList.add("hidden");
    startGame();



}

playAgain.addEventListener('click', reset);
play.addEventListener('click', startGame);