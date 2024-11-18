let questions = [
  {
    question: "Wer hat HTML erfunden?",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Was bedeutet das HTML Tag &lt;a&gt;?",
    answer_1: "Text Fett",
    answer_2: "Container",
    answer_3: "Ein Link",
    answer_4: "Kursiv",
    right_answer: 3,
  },
  {
    question: "Wie bindet man eine Webseite in eine Webseite ein?",
    answer_1: "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
    answer_2: "&lt;iframe&gt;",
    answer_3: "&lt;frame&gt;",
    answer_4: "&lt;frameset&gt;",
    right_answer: 2,
  },
  {
    question: "Wie stellt man Text am BESTEN fett dar?",
    answer_1: "&lt;strong&gt;",
    answer_2: "CSS nutzen",
    answer_3: "&lt;bold&gt;",
    answer_4: "&lt;b&gt;",
    right_answer: 1,
  },
  {
    question: "Welches Attribut kann man NICHT für Textarea verwenden?",
    answer_1: "readonly",
    answer_2: "max",
    answer_3: "from",
    answer_4: "spellcheck",
    right_answer: 1,
  },
  {
    question:
      "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?",
    answer_1: "a[title]{...}",
    answer_2: "a > title{...}",
    answer_3: "a.title{...}",
    answer_4: "a=title{...}",
    right_answer: 1,
  },
  {
    question: "Wie definiert man in JavaScript eine Variable?",
    answer_1: "let 100 = rate;",
    answer_2: "100 = let rate;",
    answer_3: "rate = 100;",
    answer_4: "let rate = 100",
    right_answer: 4,
  },
];
let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio("audio/success.mp3");
let AUDIO_FAIL = new Audio("audio/fail.mp3");

function init() {
  document.getElementById("allQuestions").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function answer(selection) {
  let question = questions[currentQuestion];
  //   console.log(" ausgesucht", selection);
  let selectedQuestionNumber = selection.slice(-1);
  //   console.log(" selected question Number:", selectedQuestionNumber);
  //   console.log("question is:", question["right_answer"]);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (selectedQuestionNumber == question["right_answer"]) {
    console.log("richtige Antwort");
    document.getElementById(selection).parentNode.classList.add("bg-success");
    AUDIO_SUCCESS.play();
    rightQuestions++;
  } else {
    console.log("falsche Antwort");
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add("bg-success");
    AUDIO_FAIL.play();
  }
  document.getElementById("nextButton").disabled = false;
}

function nextQuestion() {
  currentQuestion++; //z.B. von Frage 0 auf 1
  showQuestion();
  document.getElementById("nextButton").disabled = true;
  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
  document
    .getElementById("answer_1")
    .parentNode.classList.remove("bg-success", "bg-danger");
  document
    .getElementById("answer_2")
    .parentNode.classList.remove("bg-success", "bg-danger");
  document
    .getElementById("answer_3")
    .parentNode.classList.remove("bg-success", "bg-danger");
  document
    .getElementById("answer_4")
    .parentNode.classList.remove("bg-success", "bg-danger");
}

function restartGame() {
  document.getElementById("headerImage").src =
    "images/quiz-time-9163843_1280.jpg";
  document.getElementById("endScreen").style = "display: none";
  document.getElementById("questionBody").style = "";
  currentQuestion = 0;
  rightQuestions = 0;
  init();
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndScreen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("questionBody").style = "display: none";
  document.getElementById("CorrectAnswerTotal").innerHTML = questions.length;
  document.getElementById("CorrectAnswer").innerHTML = rightQuestions;
  document.getElementById("headerImage").src =
    "./images/carnival-631151_1280.jpg";
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progressBar").innerHTML = `${percent}%`;
  document.getElementById("progressBar").style = `width:${percent}%`;
  console.log("fortschritt:", percent);
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];
  document.getElementById("currentQuestionSite").innerHTML =
    currentQuestion + 1;

  document.getElementById("questionText").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}
