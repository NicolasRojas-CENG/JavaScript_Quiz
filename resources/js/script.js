const quizEl = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answerAEl = document.getElementById("a_answer");
const answerBEl = document.getElementById("b_answer");
const answerCEl = document.getElementById("c_answer");
const answerDEl = document.getElementById("d_answer");
const nextEl = document.getElementById("submit");
const startEl = document.getElementById("start");
const instructionsEl = document.getElementById("instructions");

let quizData = [];
let questionNum = 0;
var score = 0;

quizEl.style.display = "none";

function clearAnswer() {
    //To unselect all of the options.
    const answers = document.querySelectorAll(".answer");
    answers.forEach((answers) => {
      answers.checked = false;
    });
}

quizData = [
    {
      question: "Commonly used data types DO NOT include?",
      a: "strings",
      b: "booleans",
      c: "alerts",
      d: "numbers",
      answer: "c",
    },
    {
        question: "A ________ is a predefined action that we can call or invoke in our code.?",
        a: "Object",
        b: "Function",
        c: "Variable",
        d: "All of the above",
        answer: "b",
    },
    {
        question: "_______ is plain-language description ofthe steps that an algorithm or application must complete.",
        a: "Low-level code",
        b: "Plain code",
        c: "High-Level code",
        d: "Pseudo code",
        answer: "d",
    },
    {
        question: "Which one is the correct implementation of a for loop?",
        a: "for (var i = 0; i < 10; i++){...}",
        b: "for (; i < 10; i++){...}",
        c: "for (var i = 0; i < 10; ){...}",
        d: "All of the above",
        answer: "d",
      },
      {
          question: "Which keyword is used to exit out a loop.",
          a: "break",
          b: "stop",
          c: "exit",
          d: "return",
          answer: "a",
      },
      {
          question: "The first letter of a name is lowercase, but the first letter of every word that follows is uppercase.",
          a: "CrowCaseing",
          b: "CamelCaseing",
          c: "CraneCaseing",
          d: "CarpCaseing",
          answer: "b",
      },
      {
        question: "What is Math.random() is used for?.",
        a: "returns a random number between 0 and 10, not including 10.",
        b: "returns a random number between 0 and 1, including 1.",
        c: "returns a random number between 0 and 10, including 10",
        d: "returns a random number between 0 and 1, not including 1",
        answer: "d",
    },
    {
        question: "The first index of an array is.",
        a: "-1",
        b: "0",
        c: "1",
        d: "None of the above",
        answer: "b",
    },
    {
        question: "An event listener is the ",
        a: "Response to an event",
        b: "User behaviour",
        c: "Observation of an event",
        d: "Creation of an event",
        answer: "c",
    },
    {
        question: "_______ tells the browser to not carry out its default behaviour.",
        a: "event.stopDefault()",
        b: "event.haltDefault()",
        c: "event.preventDefault()",
        d: "event.pauseDefault()",
        answer: "c",
    },];
var startQuiz = function (){
    instructionsEl.style.display = "none";
    quizEl.style.display = "block";
    loadQuiz();
}

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

startEl.addEventListener("click", startQuiz);

var nextQuestion = function(){
    const answer = getAnswers();
  if (answer) {
    if (answer === quizData[questionNum].answer) {
        score = score + 5;
        console.log("correct!" + score);
    }
    else{
        console.log("incorrect");
    }
    questionNum++;
    if (questionNum < quizData.length) {
        loadQuiz();
    }
    else{
        quizEl.innerHTML = `<h2>You have completed the quiz.</h2>
            <h3>Your score is ${score} out of a possible ${quizData.length}</h3>
            <h3>Excellent!</h3>
            <button onclick="location.reload()">Try Again</button>`;
    }
}
}

function getAnswers() {
    const answersEl = document.querySelectorAll(".answer");
    let option = undefined;
    //To check which option was checked by the user.
    answersEl.forEach((answersEl) => {
      if (answersEl.checked) {
        option = answersEl.id;
      }
    });
    return option;
}

nextEl.addEventListener("click", nextQuestion);