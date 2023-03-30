const quizContainer = document.querySelector(".quiz_container");
let questionEl = [];
let answerEl = [];
let operators = ["+", "-", "*"];
let operator;
let hasAnswer = false;
let correctAnswer;
let correctIndex;
function renderGame() {
  questionEl = [];
  answerEl = [];
  hasAnswer = false;
  [...quizContainer.children].forEach((elm) => elm.remove());
  const questionSection = document.createElement("div");
  questionSection.className = "question-section";
  for (let i = 0; i < 3; i++) {
    const questionSpan = document.createElement("span");
    if (i == 1) {
      questionSpan.className = "operator-box";
      let randomIdx = randomNumber(3);
      operator = operators[randomIdx];
      questionSpan.textContent = operator;
    } else {
      questionSpan.className = "number-box";
      questionSpan.textContent = randomNumber(15);
      questionEl.push(questionSpan);
    }

    questionSection.appendChild(questionSpan);
  }

  correctAnswer = calcAnswer(
    questionEl[0].textContent,
    operator,
    questionEl[1].textContent
  );
  let answersArray = [
    correctAnswer,
    correctAnswer + 2,
    correctAnswer - 2,
    correctAnswer + 1,
  ];

  console.log(correctAnswer);

  answersArray = answersArray.sort((a, b) => Math.random() - 0.5);
  answersArray.filter((item, idx) => {
    if (item === correctAnswer) {
      correctIndex = idx;
    }
  });

  console.log(answersArray);

  console.log(correctIndex);

  const answerSection = document.createElement("div");
  answerSection.className = "answers-section";
  for (let i = 0; i < 4; i++) {
    const answer = document.createElement("button");
    answer.className = "answer";
    answer.textContent = answersArray[i];
    answerEl.push(answer);
    answer.addEventListener("click", handleBtn);
    answerSection.appendChild(answer);
  }

  quizContainer.append(questionSection, answerSection);
}

function handleBtn(e) {
  let elm = e.target;
  if (elm.textContent == correctAnswer) {
    elm.classList.add("correct");
    setTimeout(renderGame, 1000);
  } else {
    elm.classList.add("failed");
    answerEl[correctIndex].classList.add("correct");
    setTimeout(renderGame, 1000);
  }
}

renderGame();

console.log(questionEl, correctAnswer);
