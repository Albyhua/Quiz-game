

// amalgamation of gpt/w3schools/own questions

const quizQuestions = [
    {
        question: "Which of these is not a data type in JavaScript?",
        choices: ["Integer" ,"Null", "BigInt", "Symbol"],
        answers: 0,
    },
    {
        question: "Which of the following methods is used to add an element to the end of an array in JavaScript?",
        choices: ["Push()", "Pop()", "Shift()", "Unshift()"],
        answers: 0,

    },
    {
        question: "What is the purpose of the (typeof) operator in JavaScript? ",
        choices: ["22", "4", " /22/ ", "Type Error"],
        answers: 2,

    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["document.write()", "console.log()", "window.alert()", "all of the above"],
        answers: 2,

    },
    {
        question: "What is the correct way to write a comment in JavaScript?",
        choices: ["<!-- Comment -->", "// Comment", "/* Comment */", "** Comment **"],
        answers: 1,

    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choices: ["X", "*", "-", "="],
        answers: 3,

    },
    {
        question: "How to write an IF statement for executing some code if i is NOT equal to 5?",
        choices: ["if i <> 5", "if (i <> 5)", "if i =! 5 then", "if (i != 5)"],
        answers: 3,

    },

]




var play = document.querySelector("#play");
var timer = document.querySelector("#timer")
var tryAgain = document.querySelector("#tryAgain") //not used yet
var choiceEl = document.querySelector("#choices"); //need to string this to options

var quizContainer = document.querySelector("#quizContainer") //not used yet
// document targets the doc and queryselector targets the element

var score = 0
var secondsLeft = 60
var currentQuestionIndex = 0;



play.style.visibility = "visible";


play.addEventListener('click', startGame);
// optionEl.addEventListener('click', checkAnswer);

function startTimer() {

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000)

}


function startGame() {

    displayQuestions(); // displaying the Q
    startTimer();

    play.style.visibility = "hidden"; // this should hide my button afterwards
}

function displayQuestions() {
    var currentQuestionIndex = 0 //start with question 1
    var currentQuestion = quizQuestions[currentQuestionIndex]; // grabbing Q from the array
    var questionEl = document.querySelector("#question"); // a way to attach Q to an el

    questionEl.textContent = currentQuestion.question; // attaching q to el
    console.log(currentQuestion)

    choiceEl.innerHTML = '';

    currentQuestion.choices.forEach((choices, index) => {
        var optionEl = document.createElement('li'); // creating an element
        optionEl.classList.add("choices"); // listing those choices onto li
        optionEl.textContent = choices; // allowing the text to appear on li
        choiceEl.appendChild(optionEl); // appending to html

        optionEl.addEventListener('click', checkAnswer);
    });
    console.log(choiceEl)
}


function checkAnswer(event) {
    // var userSelectedAns = document.querySelectorAll("li");
    var userAnswer = event.target; // not working
    // its one big block? wont let me distinguish them 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    if (userAnswer.classList.contains("choices")) {
        const selectedChoiceIndex = Array.from(choiceEl.children).indexOf(userAnswer);
            console.log(selectedChoiceIndex);
            console.log(currentQuestionIndex);
            console.log(quizQuestions[currentQuestionIndex].answers);
            console.log(currentQuestionIndex);
            console.log(displayQuestions);
        if (selectedChoiceIndex === quizQuestions[currentQuestionIndex].answers) {
            score++;
            window.alert('Correct!');
            currentQuestionIndex++;
            
        }
        else {
            secondsLeft--;
            window.alert('Incorrect!');
        }

        if (currentQuestionIndex < quizQuestions.length) {

            displayQuestions();
        }
        else {
            endQuiz();
        }
    }

}

function endQuiz() {
    window.alert('Quiz ended. Your score: ' + score);
    saveScore();
}

function resetGame() {

}

function saveScore() {
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");

    highScores.push(score);

    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function displayScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    console.log(highScores);
}

play.addEventListener('click', startGame);