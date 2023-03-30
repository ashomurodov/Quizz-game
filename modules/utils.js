// functions for arthmetics
let result;
const sum = (a, b) => a + b;
const difference = (a, b) => a - b;
const multiply = (a, b) => a * b;

// function for random number generation

function randomNumber(num) {
  let randomNumber = Math.floor(Math.random() * num);
  return randomNumber;
}

function calcAnswer(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      result = sum(+firstNumber, +secondNumber);
      break;
    case "-":
      result = difference(+firstNumber, +secondNumber);
      break;
    default:
      result = multiply(+firstNumber, +secondNumber);
  }

  return result;
}
