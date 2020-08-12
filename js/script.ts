// Calculator Class
class Calculator {
  previousOperandTextElement: any;
  currentOperandTextElement: any;
  currentOperand: any;
  previousOperand: any;
  operation: any;

  constructor(previousOperandTextElement: any, currentOperandTextElement: any) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  //Clear the display
  clear() {
    this.currentOperand = ``;
    this.previousOperand = ``;
    this.operation = undefined;
  }

  //Delete Button
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  //Appending Number
  appendNumber(number: any) {
    if (number === `.` && this.currentOperand.includes(`.`)) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  //Choosing Operation
  chooseOperation(operation: any) {
    if (this.currentOperand === ``) return;
    if (this.previousOperand !== ``) {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ``;
  }

  //Compute Function
  compute() {
    let computation: any;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case `+`:
        computation = prev + current;
        break;
      case `-`:
        computation = prev - current;
        break;
      case `*`:
        computation = prev * current;
        break;
      case `/`:
        computation = prev / current;
        break;

      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = ``;
  }

  //Getting numbrs formatted for display
  getDisplayNumber(number: any) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(`.`)[0]);
    const decimalDigits = stringNumber.split(`.`)[1];
    let integerDisplay: any;

    if (isNaN(integerDigits)) {
      integerDisplay = ``;
    } else {
      integerDisplay = integerDigits.toLocaleString(`en`, {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  //Updating the display
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = ``;
    }
  }
}

//Selecting the buttons from DOM
const numberButtons = document.querySelectorAll<HTMLInputElement>(
  `[data-number]`
);
const operationButtons = document.querySelectorAll<HTMLInputElement>(
  `[data-operation]`
);
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(`[data-delete]`);
const acButton = document.querySelector(`[data-ac]`);
const previousOperandTextElement = document.querySelector(
  `[data-previous-operand]`
);
const currentOperandTextElement = document.querySelector(
  `[data-current-operand]`
);

//Calculator Instance
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//Number buttons click events
numberButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//Operation buttons click events
operationButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//Equals button click event
equalsButton.addEventListener(`click`, () => {
  calculator.compute();
  calculator.updateDisplay();
});

//AC button click event
acButton.addEventListener(`click`, () => {
  calculator.clear();
  calculator.updateDisplay();
});

//Delete button click event
deleteButton.addEventListener(`click`, () => {
  calculator.delete();
  calculator.updateDisplay();
});
