"use strict";
// Variables
const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
const audio = new Audio();
audio.src = "./sound/mixkit-modern-click-box-check-1120.wav";
// Fonctions

let input = "";
for (const key of keys) {
  const value = key.dataset.key;
  key.addEventListener("click", (e) => {
    audio.play();
    if (value == "clear") {
      input = "";
      display_input.innerHTML = input;
      display_output.innerHTML = input;
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = clearInput(input);
    } else if (value == "=") {
      let result = eval(prepareInputpercent(input));
      display_output.innerHTML = CleanOutput(result);
      CleanOutput(result);
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      display_input.innerHTML = clearInput(input);
    } else {
      if (ValidateInput(value)) {
        console.log("i am here");
        input += value;
        display_input.innerHTML = clearInput(input);
      }
    }
  });
}
let clearInput = (input) => {
  let input__array = input.split("");
  for (let i = 0; i < input__array.length; i++) {
    switch (input__array[i]) {
      case "*":
        input__array[i] = ' <span class="operator">x</span> ';
        break;
      case "+":
        input__array[i] = ' <span class="operator">+</span> ';
        break;
      case "-":
        input__array[i] = ' <span class="operator">-</span> ';
        break;
      case "/":
        input__array[i] = ' <span class="operator">÷</span> ';
        break;
      case "%":
        input__array[i] = `<span class="percent">%</span>`;
        break;
      case "(":
        input__array[i] = `<span class="percent">(</span>`;
        break;
      case ")":
        input__array[i] = `<span class="percent">)</span>`;
        break;
    }
  }
  return input__array.join("");
};

// Add to Output  (. for decimal) and (, for  lenght number great then 3)
function CleanOutput(output) {
  let output_s = output.toString();
  let decimal = output_s.split(".")[1];
  output_s = output_s.split(".")[0];
  let output_array = output_s.split("");
  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }
  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }
  return output_array.join("");
}

// Do not allow consecutive repetitions operators ( + | - | / | * )
let ValidateInput = (value) => {
  let last__input = input.slice(-1);

  let operators = ["+", "-", "*", "/"];
  if (value == "." && last__input == ".") {
    return false;
  } else if (operators.includes(value)) {
    if (operators.includes(last__input)) {
      return false;
    }else{
      return true
    }
  }
  return true

};
// Change Operator (%) to /100
let prepareInputpercent = (input) => {
  let input__array = input.split('')
  for (let i = 0; i < input__array.length; i++) {
    if (input__array[i] == '%') {
      input__array[i] = '/100'
    }  
  }
  return input__array.join('')
}