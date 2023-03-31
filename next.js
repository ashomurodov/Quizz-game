const quizContainer = document.querySelector(".quiz_container");
let questionEl = [];
let answerEl = [];
let operators = ["+", "-", "*", "/"];
let operator,
  correctAnswer,
  correctIndex,
  interval,
  hasAnswer,
  permissionForClick,
  NUMBER_OF_LEVEL,
  BONUS,
  earnedBonus,
  correctQuestions,
  seconds;

let NUMBER_OF_QUESTIONS = 10;

let highScore = +localStorage.getItem("quizz:highScore") || 0;
let playingTime = +localStorage.getItem("quizz:playingTime") || 0;

const newGame = document.getElementById("new_game");
const overLay = document.querySelector(".overlay");
const startGameoverLay = document.querySelector(".startGameOverlay");
const startGame = document.getElementById("start_game");

startGameoverLay.classList.remove("none");

const time = document.getElementById("time");
const bonus_in_time = document.getElementById("bonusBytime");
const bonus = document.getElementById("bonus");
const level = document.getElementById("level");
const highScoreStart = document.querySelector(".hightScore");
const PlayTime = document.querySelector(".playing_time");

highScoreStart.textContent = `high score: ${highScore}`;
PlayTime.textContent = `You play this game: ${playingTime} times`;

startGame.addEventListener("click", () => {
  startGameoverLay.classList.add("none");
  renderGame();
});

function init() {
  NUMBER_OF_LEVEL = 1;
  BONUS = 200;
  earnedBonus = 0;
  correctQuestions = 0;
  seconds = 10;
}

init();

function HighScore(newHighScore) {
  if (highScore < newHighScore) {
    highScore = newHighScore;
    localStorage.setItem("quizz:highScore", newHighScore);
  }
  playingTime++;
  let newPlayTime = playingTime;
  localStorage.setItem("quizz:playingTime", newPlayTime);
}

function getTime() {
  let currentecond = seconds;
  let currentBonus = BONUS;
  if (seconds == 0) {
    clearInterval(interval);
    nextLevel();
  }
  seconds--;
  BONUS -= 20;
  time.textContent = `time: 00:${
    currentecond >= 10 ? currentecond : "0" + currentecond
  }`;
  bonus_in_time.textContent = `level bonus: ${currentBonus}`;
}

function renderGame() {
  interval = setInterval(getTime, 1000);

  questionEl = [];
  answerEl = [];
  hasAnswer = false;
  permissionForClick = true;
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

  answersArray = answersArray.sort((a, b) => Math.random() - 0.5);
  answersArray.filter((item, idx) => {
    if (item === correctAnswer) {
      correctIndex = idx;
    }
  });

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
  if (permissionForClick) {
    permissionForClick = false;
    let elm = e.target;
    if (elm.textContent == correctAnswer) {
      elm.classList.add("correct");
      correctQuestions++;
      console.log(correctQuestions);
      setTimeout(() => {
        nextLevel();
      }, 1000);
    } else {
      elm.classList.add("failed");
      answerEl[correctIndex].classList.add("correct");
      setTimeout(() => {
        BONUS = 0;
        nextLevel();
      }, 1000);
    }
  }
}

function nextLevel() {
  clearInterval(interval);
  seconds = 10;
  earnedBonus += BONUS;
  BONUS = 200;
  NUMBER_OF_LEVEL !== 10 && renderGame();
  NUMBER_OF_LEVEL++;
  if (NUMBER_OF_LEVEL == 11) resultOfGame();
  bonus.textContent = `your bonus: ${earnedBonus}`;
  level.textContent = `level: ${
    NUMBER_OF_LEVEL == 11 ? 10 : NUMBER_OF_LEVEL
  }/10`;
}

function resultOfGame() {
  HighScore(earnedBonus);

  overLay.classList.remove("none");
  const RESULT_ANSWERS = document.querySelector(".correctAnswers");
  const RESULT_BONUS = document.querySelector(".resultBonus");
  const HIGHSCORE = document.querySelector(".higthBonus");

  HIGHSCORE.textContent = `high score: ${highScore}`;
  RESULT_ANSWERS.textContent = `correct answers: ${correctQuestions}/10`;
  RESULT_BONUS.textContent = `earned bonus: ${earnedBonus}`;
}

newGame.addEventListener("click", () => {
  init();
  bonus.textContent = `your bonus: 0`;
  time.textContent = "time: 00:10";
  level.textContent = "level: 1/10";
  overLay.classList.add("none");
  renderGame();
});
