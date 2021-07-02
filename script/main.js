// Theming
const toggle1 = {
  control: document.getElementById('change1'),
  input: document.getElementById('input1'),
  theme: 'theme1',
};
const toggle2 = {
  control: document.getElementById('change2'),
  input: document.getElementById('input2'),
  theme: 'theme2',
};
const toggle3 = {
  control: document.getElementById('change3'),
  input: document.getElementById('input3'),
  theme: 'theme3',
};

const changeTheme = (theme) => {
  document.body.className = theme;
};

for (let toggle of [toggle1, toggle2, toggle3]) {
  toggle.control.addEventListener('click', () => {
    if (!toggle.input.checked) {
      toggle.input.checked = true;
      changeTheme(toggle.theme);
    }
  });
}

// Calculator Logic
const display = document.getElementById('displayNumber');
const operator = document.getElementById('displayOperator');
const buttons = document.querySelectorAll('.button');

const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

const checkLimit = (number) => {
  return number.length < 15;
};

const updateDisplay = () => {
  display.innerText = calculator.displayNumber;
};

const updateOperator = () => {
  console.log('aa');
  operator.innerText = calculator.operator;
};

const clearCalculator = () => {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
};

const inputDigit = (digit) => {
  if (
    calculator.waitingForSecondNumber &&
    calculator.firstNumber === calculator.displayNumber
  ) {
    calculator.displayNumber = digit;
  } else {
    if (calculator.displayNumber === '0') {
      if (digit == '.') {
        calculator.displayNumber += digit;
      } else {
        calculator.displayNumber = digit;
      }
    } else {
      if (checkLimit(calculator.displayNumber)) {
        calculator.displayNumber += digit;
      }
    }
  }
};

const inverseNumber = () => {
  if (calculator.displayNumber === '0') {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
};

const handleOperator = (operator) => {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    updateOperator();
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;
  } else {
    alert('Operator sudah ditetapkan');
  }
};

const checkResult = (number) => {
  let result;
  if (number.length > 15) {
    if (number.includes('.')) {
      result = number.slice(0, 14);
    } else {
      result = '∞';
    }
  } else {
    if (number === 'Infinity') {
      result = '∞';
    } else {
      result = number;
    }
  }

  return result;
};

const performCalculation = () => {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert('Anda belum menetapkan operator');
    return;
  }

  let result = 0;

  switch (calculator.operator) {
    case '+':
      result =
        parseFloat(calculator.firstNumber) +
        parseFloat(calculator.displayNumber);
      break;

    case '-':
      result =
        parseFloat(calculator.firstNumber) -
        parseFloat(calculator.displayNumber);
      break;

    case '/':
      result =
        parseFloat(calculator.firstNumber) /
        parseFloat(calculator.displayNumber);
      break;

    case 'x':
      result =
        parseFloat(calculator.firstNumber) *
        parseFloat(calculator.displayNumber);
      break;

    default:
      break;
  }

  calculator.displayNumber = checkResult(result.toString());
};

for (let button of buttons) {
  button.addEventListener('click', (event) => {
    // mendapatkan objek elemen yang diklik
    const target = event.target;

    if (target.classList.contains('reset-button')) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains('equal-button')) {
      performCalculation();
      updateDisplay();
      calculator.operator = null;
      calculator.waitingForSecondNumber = false;
      updateOperator();
      return;
    }

    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      updateDisplay();
      return;
    }

    if (target.classList.contains('comma')) {
      if (calculator.displayNumber.includes('.')) {
        return;
      }
    }

    if (target.classList.contains('delete-button')) {
      if (calculator.displayNumber.length == 1) {
        calculator.displayNumber = '0';
      } else {
        calculator.displayNumber = calculator.displayNumber.slice(0, -1);
      }
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
