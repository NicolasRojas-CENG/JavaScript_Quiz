//Different screens.
const instructionsScreenEl = document.getElementById("instructions");
const quizScreenEl = document.getElementById("quiz");
const resultsScreenEl = document.getElementById("results");
const scoresScreenEl = document.getElementById("scoreScreen");
//Different buttons.
const startButtonEl = document.getElementById("start");
const nextButtonEl = document.getElementById("submit");
const saveButtonEl = document.getElementById("save");
const scoresButtonEl = document.getElementById("scores");
const backButtonEl = document.getElementById("back");
//Question elements.
const questionEl = document.getElementById("question");
const answerAEl = document.getElementById("a_answer");
const answerBEl = document.getElementById("b_answer");
const answerCEl = document.getElementById("c_answer");
const answerDEl = document.getElementById("d_answer");
//Content/text elements.
const timeContentEl = document.getElementById("time");
const resultContentEl = document.getElementById("resultContent");
const scoreContentEl = document.getElementById("scoresContent");
const messageContentEl = document.getElementById("message");
//Variable declaration.
let highScores = [];//Array for scores.
let quizData = [];//Array for the questions/answers. 
let questionNum = 0;//Question tracker.
let counter;//For the timer.
var time = 200;//Time ;imit.
var score = 0;//Quiz score.
var temparr = "";//Used to help save to localStorage.
var saveSlot = 0;//Index for saving to localStorage.

quizData = [
    {
      question: "Commonly used data types DO NOT include?",
      a: "strings",
      b: "booleans",
      c: "alerts",
      d: "numbers",
      answer: "c",
    },{
        question: "A ________ is a predefined action that we can call or invoke in our code.?",
        a: "Object",
        b: "Function",
        c: "Variable",
        d: "All of the above",
        answer: "b",
    },{
        question: "_______ is plain-language description ofthe steps that an algorithm or application must complete.",
        a: "Low-level code",
        b: "Plain code",
        c: "High-Level code",
        d: "Pseudo code",
        answer: "d",
    },{
        question: "Arrays in JavaScript can be used to store ______.",
        a: "Other Arrays",
        b: "Booleans",
        c: "Numbers and Strings",
        d: "All of the above",
        answer: "d",
    },{
          question: "The condition in an if/else statement is enclosed with _______.",
          a: "curly brackets {}",
          b: "parenthesis ()",
          c: "square brackets []",
          d: "quotes \"\"",
          answer: "b",
    },{
          question: "The first letter of a name is lowercase, but the first letter of every word that follows is uppercase.",
          a: "CrowCaseing",
          b: "CamelCaseing",
          c: "CraneCaseing",
          d: "CarpCaseing",
          answer: "b",
    },{
        question: "What is Math.random() is used for?.",
        a: "returns a random number between 0 and 10, not including 10.",
        b: "returns a random number between 0 and 1, including 1.",
        c: "returns a random number between 0 and 10, including 10",
        d: "returns a random number between 0 and 1, not including 1",
        answer: "d",
    },{
        question: "The first index of an array is.",
        a: "-1",
        b: "0",
        c: "1",
        d: "None of the above",
        answer: "b",
    },{
        question: "An event listener is the ",
        a: "Response to an event",
        b: "User behaviour",
        c: "Observation of an event",
        d: "Creation of an event",
        answer: "c",
    },{
        question: "_______ tells the browser to not carry out its default behaviour.",
        a: "event.stopDefault()",
        b: "event.haltDefault()",
        c: "event.preventDefault()",
        d: "event.pauseDefault()",
        answer: "c",
    }];
//Process of getting values from localStorage.
var savedScores = localStorage.getItem("High-scores");
savedScores = JSON.parse(savedScores);//Converts to array. Original format.
if (savedScores){
    highScores = savedScores;
    saveSlot = highScores.length;
}else{
    saveSlot = 0;
}

//Function used to start the quiz.
var startQuiz = function (){
    instructionsScreenEl.style.display = "none";
    scoresButtonEl.style.display = "none";
    quizScreenEl.style.display = "block";
    loadQuiz();
    timeContentEl.textContent = time; 
    time--;
    timeCall();    
}

//Function used to load the quiz questions/answers.
function loadQuiz(){
    clearAnswer();
    const currentQuestionNum = quizData[questionNum];
    questionEl.innerText = currentQuestionNum.question;
    //Load the possible answers.
    answerAEl.innerText = currentQuestionNum.a;
    answerBEl.innerText = currentQuestionNum.b;
    answerCEl.innerText = currentQuestionNum.c;
    answerDEl.innerText = currentQuestionNum.d;
}

//Function used to deselect any previous answer from the user.
function clearAnswer() {
    const answers = document.querySelectorAll(".answer");
    answers.forEach((answers) => {
      answers.checked = false;
    });
}

//Function used to set the timer.
function timeCall(){
    counter = setInterval(timer, 1000);
    function timer(){
        timeContentEl.textContent = time; 
        time--;
        if (questionNum == quizData.length){
            clearTimer();
        }
        if (time < 0){
            endQuiz();
            clearTimer();
        }
    }
}

//Function used to end the quiz.
function endQuiz(){
    time = Math.max(0, time);
    score = score + (time * 2);
    resultsScreenEl.style.display = "block";
    quizScreenEl.style.display = "none";
    resultContentEl.textContent="Your score is " + score;
}

//Function used to clear the timer at the end of the quiz.
function clearTimer() {
    clearInterval(counter);
    timeContentEl.style.display = "none";
}
quizScreenEl.style.display = "none";
resultsScreenEl.style.display = "none";
scoresScreenEl.style.display = "none";
startButtonEl.addEventListener("click", startQuiz);

//Function used to show the next question.
var nextQuestion = function(){
    const answer = getAnswers();
    if (answer) {
        if (answer === quizData[questionNum].answer) {
            score = score + 5;
        }else{
            time-=20;
        }
        questionNum++;
        if (questionNum < quizData.length) {
            loadQuiz();
        }else{
            endQuiz();
        }
    }
}

//Function used to get the 
function getAnswers() {
    const answersEl = document.querySelectorAll(".answer");
    let option = undefined;
    answersEl.forEach((answersEl) => {
        if (answersEl.checked) {
            option = answersEl.id;
        }
    });
    return option;
}

nextButtonEl.addEventListener("click", nextQuestion);

//Function to save scores to local storage.
function saveScore () {
    var scoreKeyVal = {
        userScore: 0,
        userName: ""
    }
    scoreKeyVal.userName = document.querySelector("input[name='userName']").value;
    if (scoreKeyVal.userName){
        scoreKeyVal.userScore = score;
        temparr = scoreKeyVal;
        highScores[saveSlot] = temparr;
        saveSlot++;
        localStorage.setItem("High-scores", JSON.stringify(highScores));
        resultsScreenEl.style.display = "none";
        instructionsScreenEl.style.display ="block";
        scoresButtonEl.style.display = "block";
        resetQuiz();
    }else{
        messageContentEl.textContent = "Please enter your name";
        saveScore();
    }  
}

//function used to reset the quiz.
function resetQuiz () {
    questionNum = 0;
    score = 0;
    time = 200;
    timeContentEl.style.display = "block";
}

saveButtonEl.addEventListener("click", saveScore);

//Function used to show the scores.
function showScores() {
    var string = "";
    scoresScreenEl.style.display = "block";
    scoresButtonEl.style.display = "none";
    instructionsScreenEl.style.display = "none";
    if (highScores.length == 0){
        scoreContentEl.textContent = "There are no scores to show.";
    }
    for (var i = 0; i < highScores.length; i++){
        string = string.concat("User: " + highScores[i].userName + ", score: " + highScores[i].userScore + "<br>")
        scoreContentEl.innerHTML = string;  
    }
}

scoresButtonEl.addEventListener("click", showScores);

//Function used to back out the score screen.
function backToInstructions(){
    instructionsScreenEl.style.display = "block";
    scoresScreenEl.style.display = "none";
    scoresButtonEl.style.display = "block";
}

backButtonEl.addEventListener("click", backToInstructions);