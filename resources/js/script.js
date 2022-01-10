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
}];
var startQuiz = function (){
    instructionsEl.style.display = "none";
    quizEl.style.display = "block";
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
        console.log("correct!");
    }
    else{
        console.log("incorrect");
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