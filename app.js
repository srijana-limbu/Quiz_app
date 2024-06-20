let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("content");
let nextBtn = document.getElementById("next-btn");
let countQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startBtn = document.getElementById("start-btn");
let questionCount;
let scoreCount = 0;
let count = 16;
let countDown;

//10 questions with options and answer array
const quizArray = [
  {
    id: "0",
    question: "What does the 'DOMContentLoaded' event do in JavaScript?",
    options: [
      "It triggers when the HTML document has been completely loaded and parsed",
      "It triggers when all images and sub-resources have loaded",
      "It triggers when the user interacts with the page",
      "It triggers when the JavaScript file has been completely loaded",
    ],
    correct:
      "It triggers when the HTML document has been completely loaded and parsed",
  },
  {
    id: "1",
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-style", "text-size", "font-size"],
    correct: "font-size",
  },
  {
    id: "2",
    question: "How can you create a hyperlink in HTML?",
    options: [
      "<a url='http://www.example.com'>Example</a>",
      "<a>http://www.example.com</a>",
      "<a href='http://www.example.com'>Example</a>",
      "<a link='http://www.example.com'>Example</a>",
    ],
    correct: "<a href='http://www.example.com'>Example</a>",
  },
  {
    id: "3",
    question: "Which CSS property is used to change the background color?",
    options: ["bgcolor", "background-color", "color", "bg-color"],
    correct: "background-color",
  },
  {
    id: "4",
    question:
      "Which method is used to add an element at the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correct: "push()",
  },
  {
    id: "5",
    question: "How do you comment out a line of CSS?",
    options: [
      "// This is a comment",
      "&lt;!-- This is a comment --&gt;",
      "' This is a comment",
      "/* This is a comment */",
    ],
    correct: "/* This is a comment */",
  },
  {
    id: "6",
    question: "What does the 'box-sizing' property do in CSS?",
    options: [
      "Defines the box model used by an element",
      "Sets the size of the box",
      "Changes the border style of the box",
      "Adjusts the padding of the box",
    ],
    correct: "Defines the box model used by an element",
  },
  {
    id: "7",
    question:
      "Which HTML element is used to specify a footer for a document or section?",
    options: [
      "&lt; bottom&gt;",
      "&lt; footer&gt;",
      "&lt; section&gt;",
      "&lt; foot&gt;",
    ],
    correct: "&lt; footer&gt;",
  },
  {
    id: "8",
    question:
      "What is the correct JavaScript syntax to change the content of the HTML element below? \n\n <p id='demo'>This is a demonstration.</p>",
    options: [
      "document.getElementByName('p').innerHTML = 'Hello World!';",
      "document.getElement('p').innerHTML = 'Hello World!';",
      "document.getElementById('demo').innerHTML = 'Hello World!';",
      "document.getElementByTagName('p').innerHTML = 'Hello World!';",
    ],
    correct: "document.getElementById('demo').innerHTML = 'Hello World!';",
  },
  {
    id: "9",
    question: "How do you select an element with the id 'header' in CSS?",
    options: ["#header", ".header", "header", "*header"],
    correct: "#header",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;

    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML =
        "Your Score is &nbsp" + scoreCount + "&nbsp out of &nbsp"+questionCount + "&nbsp";
    } else {
      countQuestion.innerHTML =
        questionCount + 1 + "&nbsp of &nbsp" +
        quizArray.length + "&nbsp Question";
      quizDisplay(questionCount);
      count = 16;
      clearInterval(countDown);
      timerDisplay();
    }
  })
);

const timerDisplay = () => {
  countDown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countDown);
      displayNext();
    }
  }, 1000);
};

// to display current question in a quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");

  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //accesses the specific question card corresponding to the current question index
  quizCards[questionCount].classList.remove("hide");
};

//To dynamically create and append quiz questions to a container element in HTML
function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);
  //shuffle the options of each question
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    countQuestion.innerHTML =
      1 + "&nbsp of &nbsp" + quizArray.length + "&nbsp Question";

    let questionDiv = document.createElement("p");
    questionDiv.classList.add("question");
    //contains question retrieved from quizArray.
    questionDiv.innerHTML = i.question;
    div.appendChild(questionDiv);

    div.innerHTML += `
    <button class = "option-div" onclick = "checker(this)">
    ${i.options[0]}</button>
    <button class = "option-div" onclick = "checker(this)">
    ${i.options[1]}</button>
    <button class = "option-div" onclick = "checker(this)">
    ${i.options[2]}</button>
    <button class = "option-div" onclick = "checker(this)">
    ${i.options[3]}</button>
    `;

    quizContainer.appendChild(div);
  }
}

// to manage user's answer selection
function checker(userOption) {
  // Get the user's selected option
  let userSolution = userOption.innerText;
  // Get the current question container
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  // Get all options within the current question
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    // Incorrect comparison 
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countDown); // Stop the countdown timer
  options.forEach((element) => {
    element.Disabled = true; // Disable all option buttons
  });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 16;
    clearInterval(countDown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

startBtn.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};