const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

// Different question sets for each subject
const htmlQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
];

const cssQuestions = [
  {
    question: "What does CSS stand for?",
    choice1: "Creative Style Sheets",
    choice2: "Cascading Style Sheets",
    choice3: "Computer Style Sheets",
    choice4: "Colorful Style Sheets",
    answer: 2
  },
  {
    question: "Which property is used to change the background color?",
    choice1: "color",
    choice2: "bgcolor",
    choice3: "background-color",
    choice4: "background",
    answer: 3
  },
  {
    question: "Which CSS property controls the text size?",
    choice1: "font-style",
    choice2: "text-size",
    choice3: "font-size",
    choice4: "text-style",
    answer: 3
  },
  {
    question: "Which CSS property controls the text size?",
    choice1: "font-style",
    choice2: "text-size",
    choice3: "font-size",
    choice4: "text-style",
    answer: 3
  },
  {
    question: "Which CSS property controls the text size?",
    choice1: "font-style",
    choice2: "text-size",
    choice3: "font-size",
    choice4: "text-style",
    answer: 3
  }
];

const jsQuestions = [
  {
    question: "What is the correct way to declare a JavaScript variable?",
    choice1: "var carName;",
    choice2: "variable carName;",
    choice3: "v carName;",
    choice4: "var: carName;",
    answer: 1
  },
  {
    question: "How do you create a function in JavaScript?",
    choice1: "function myFunction()",
    choice2: "function = myFunction()",
    choice3: "function:myFunction()",
    choice4: "function => myFunction()",
    answer: 1
  },
  {
    question: "How do you call a function named 'myFunction'?",
    choice1: "myFunction()",
    choice2: "call function myFunction()",
    choice3: "call myFunction()",
    choice4: "call.myFunction()",
    answer: 1
  },
  {
    question: "How do you call a function named 'myFunction'?",
    choice1: "myFunction()",
    choice2: "call function myFunction()",
    choice3: "call myFunction()",
    choice4: "call.myFunction()",
    answer: 1
  },
  {
    question: "How do you call a function named 'myFunction'?",
    choice1: "myFunction()",
    choice2: "call function myFunction()",
    choice3: "call myFunction()",
    choice4: "call.myFunction()",
    answer: 1
  },
  
];

// CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

// Function to start the game
startGame = () => {
  questionCounter = 0;
  score = 0;

  // Retrieve the selected quiz from localStorage
  const selectedQuiz = localStorage.getItem("selectedQuiz");

  // Load questions based on the selected subject
  if (selectedQuiz === "html") {
    availableQuesions = [...htmlQuestions];
  } else if (selectedQuiz === "css") {
    availableQuesions = [...cssQuestions];
  } else if (selectedQuiz === "javascript") {
    availableQuesions = [...jsQuestions];
  }

  getNewQuestion();
};

// Function to get a new question
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // Go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// Handle choice selection
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Function to increment the score
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// Start the game when the page loads
startGame();
