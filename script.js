
function createDivSpan(tag, attrtype, attrName) {
    var div = document.createElement(tag);
    div.setAttribute(attrtype, attrName);
    return div;
  }
  function operatorButton(tag, className, dataType, dataKey, txt) {
    var button = document.createElement(tag);
    button.className = className;
    button.setAttribute("id", dataKey);
    button.setAttribute("data-type", dataType);
    button.setAttribute("data-key", dataKey);
    button.innerHTML = txt;
    return button;
  }
  function contentButton(tag, dataType, txt) {
    var btn = document.createElement(tag);
    btn.setAttribute("id", txt);
    btn.setAttribute("data-type", dataType);
    btn.innerHTML = txt;
    return btn;
  }
  
  // DOM elements - DIV and SPAN
  let h1 = createDivSpan("h1", "id", "title");
  h1.innerHTML = "JS Calculator";
  let p1 = createDivSpan("p", "id", "description");
  let div1 = createDivSpan("div", "class", "playground");
  let div2 = createDivSpan("div", "class", "display");
  let div3 = createDivSpan("div", "class", "button");
  let div4 = createDivSpan("div", "class", "heading");
  let div5 = createDivSpan("div", "class", "memory");
  p1.innerHTML = "This is a calculator created using JS and DOM";
  let span = createDivSpan("span");
  span.innerHTML = 0;
  
  // DOM elements - Buttons
  
  let clear = operatorButton("button", "clear", "clear", "clear", "C");
  let backspace = contentButton("button", "backspace", "⌫");
  let percentage = operatorButton(
    "button",
    "operator",
    "operator",
    "modulus",
    "%"
  );
  let divide = operatorButton("button", "operator", "operator", "divide", "÷");
  let num1 = contentButton("button", "number", "1");
  let num2 = contentButton("button", "number", "2");
  let num3 = contentButton("button", "number", "3");
  let multiply = operatorButton(
    "button",
    "operator",
    "operator",
    "multiply",
    "x"
  );
  let num4 = contentButton("button", "number", "4");
  let num5 = contentButton("button", "number", "5");
  let num6 = contentButton("button", "number", "6");
  let subtract = operatorButton(
    "button",
    "operator",
    "operator",
    "subtract",
    "-"
  );
  let num7 = contentButton("button", "number", "7");
  let num8 = contentButton("button", "number", "8");
  let num9 = contentButton("button", "number", "9");
  let add = operatorButton("button", "operator", "operator", "add", "+");
  let num0 = contentButton("button", "number", "0");
  let zerozero = contentButton("button", "number", "00");
  let decimal = operatorButton("button", "number", "decimal", "", ".");
  let equal = operatorButton("button", "operator", "equal", "equal", "=");
  let mPlus = operatorButton(
    "button",
    "memorybtn operator",
    "mPlus",
    "mPlus",
    "M+"
  );
  let mMinus = operatorButton(
    "button",
    "memorybtn operator",
    "mMinus",
    "mMinus",
    "M-"
  );
  let mClear = operatorButton(
    "button",
    "memorybtn operator",
    "mClear",
    "mClear",
    "MC"
  );
  
  // Adding them to the HTML body
  
  div3.append(
    clear,
    backspace,
    percentage,
    divide,
    num1,
    num2,
    num3,
    multiply,
    num4,
    num5,
    num6,
    subtract,
    num7,
    num8,
    num9,
    add,
    num0,
    zerozero,
    decimal,
    equal
  );
  
  div5.append(mPlus, mMinus, mClear);
  div2.append(span);
  div4.append(h1, p1);
  div1.append(div4, div2, div3, div5);
  document.body.append(div1);
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  
  // JS Part
  
  // Calculation function
  
  const toCalculate = (firstNumber, operator, secondNumber) => {
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
  
    if (operator === "add") return firstNumber + secondNumber;
    if (operator === "subtract") return firstNumber - secondNumber;
    if (operator === "multiply") return firstNumber * secondNumber;
    if (operator === "divide") return firstNumber / secondNumber;
    if (operator === "modulus") return firstNumber % secondNumber;
  };
  
  // Setting Local Storage functions
  
  const setLocalStorage = () => {
    localStorage.setItem("calcMemory", JSON.stringify(calculation));
  };
  
  const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("calcMemory"));
    if (!data) return;
    else return data;
  };
  
  // Element Selection
  
  const calculator = document.querySelector(".playground");
  const display = document.querySelector("span");
  const keys = document.querySelector(".button");
  const operatorKeys = document.querySelectorAll(".operator");
  let calculation = [];
  
  // adding the data from local storage if available
  calculation = getLocalStorage();
  
  // Adding onclick events for the buttons
  let previousKeyType;
  let pressType;
  let pressedValue;
  
  keys.addEventListener("click", (e) => {
    pressedValue = e.target.textContent;
    pressType = e.target.dataset.type;
    previousKeyType = calculator.dataset.previousKeyType;
  
    // If pressed button is a number
  
    if (pressType === "number") {
      if (
        display.textContent === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "equal"
      )
        display.textContent = pressedValue;
      else display.textContent += pressedValue;
    }
  
    // if pressed button is a decimal
  
    if (pressType === "decimal") {
      if (!display.textContent.includes(".")) display.textContent += ".";
      if (previousKeyType === "operator" || previousKeyType === "equal")
        display.textContent = "0.";
    }
  
    // if backspace is clicked
  
    if (pressType === "backspace") {
      currentValue = display.textContent;
      if (currentValue === "0" || currentValue.length < 2)
        display.textContent = "0";
      display.textContent = currentValue.substr(
        0,
        display.textContent.length - 1
      );
    }
  
    // assigning the operator for calculation
  
    if (pressType === "operator") {
      // creating a data-type = state each time once the operator button is pressed
      operatorKeys.forEach((el) => {
        el.dataset.state = "";
      });
  
      e.target.dataset.state = "selected";
      if (e.target.dataset.state === "selected") {
        e.target.classList.add("active");
      }
  
      const firstNum = calculator.dataset.firstNum;
      const operator = calculator.dataset.operator;
      const secondNum = display.textContent;
  
      if (
        firstNum &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "equal"
      ) {
        const toCalcValue = toCalculate(firstNum, operator, secondNum);
        display.textContent = toCalcValue;
        calculator.dataset.firstNum = toCalcValue;
      } else {
        calculator.dataset.firstNum = display.textContent;
      }
  
      calculator.dataset.operator = e.target.dataset.key;
      previousKeyType = "operator";
    }
  
    if (pressType === "equal") {
      let firstNum = calculator.dataset.firstNum;
      const operator = calculator.dataset.operator;
      let secondNum = display.textContent;
  
      operatorKeys.forEach((el) => {
        el.classList.remove("active");
      });
  
      if (firstNum) {
        if (previousKeyType === "equal") {
          firstNum = display.textContent;
          secondNum = calculator.dataset.modValue;
        }
        display.textContent = toCalculate(firstNum, operator, secondNum);
      } else display.textContent = 0;
      calculation.push(display.textContent);
      calculator.dataset.modValue = secondNum;
    }
  
    if (pressType === "clear") {
      // Clearing all the values created earlier
      calculator.classList.remove("active");
      calculator.dataset.firstNum = "";
      calculator.dataset.secondNum = "";
      calculator.dataset.modValue = "";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "";
      display.textContent = 0;
      operatorKeys.forEach((el) => {
        el.dataset.state = "";
        el.classList.remove("active");
      });
    }
  
    // Created to check what is the previous pressed button
    calculator.dataset.previousKeyType = pressType;
  
    // Adding all the data to the localStorage
    setLocalStorage();
  });
  setLocalStorage();
  
  // using the memory functions to calculate
  document.querySelector(".memory").addEventListener("click", (e) => {
    pressType = e.target.dataset.type;
    totValue = display.textContent;
  
    if (pressType === "mPlus") {
      display.textContent = +display.textContent + +calculation.slice(-1);
    }
  
    if (pressType === "mMinus") {
      display.textContent = +display.textContent - +calculation.slice(-1);
    }
  
    if (pressType === "mClear") {
      calculation = [];
      localStorage.clear();
    }
  
    setLocalStorage();
  });
  
  // keydown event for attending the keyboard events on numbers alone
  
  let num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  
  document.body.addEventListener("keydown", (e) => {
    if (isNaN(e.key)) alert("Only numbers are allowed to press");
  
    let isNum = num.find((el) => el === e.key);
    if (isNum) {
      pressType = "number";
      pressedValue = e.key;
      if (display.textContent === "0") display.textContent = pressedValue;
      else display.textContent += pressedValue;
  
      if (previousKeyType === "operator") display.textContent = pressedValue;
    }
    setLocalStorage();
  });
  