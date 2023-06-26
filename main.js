// Variables 
const keys = document.querySelectorAll('.key')
const display_input = document.querySelector('.display .input')
const display_output = document.querySelector('.display .output')
const audio = new Audio()
audio.src = './sound/mixkit-modern-click-box-check-1120.wav'
// Fonctions

let input = '';
for (const key of keys) {
  const value = key.dataset.key;
  key.addEventListener('click', (e) => {
    audio.play()
    if (value == 'clear') {
      input = '';
      display_input.innerHTML = input
      display_output.innerHTML = input
    } else if (value == 'backspace') {
      input = input.slice(0, -1)
      display_input.innerHTML = clearInput(input)
    } else if (value == '=') {
      let result = eval(input)
      display_output.innerHTML = result;
      CleanOutput(result)
    } else if (value == 'brackets') {
      if (
        input.indexOf('(') == -1 ||
        input.indexOf('(') != -1 &&
        input.indexOf(')') != -1 &&
        input.lastIndexOf('(') < input.lastIndexOf(')')
      ) {
        input += "(";
      } else if (
        input.indexOf('(') != -1 &&
        input.indexOf(')') == -1 ||
        input.indexOf('(') != -1 &&
        input.indexOf(')') != -1 &&
        input.lastIndexOf('(') > input.lastIndexOf(')')
      ) {
        input += ")";
      }

      display_input.innerHTML = clearInput(input)
    } else {
      input += value
      display_input.innerHTML = clearInput(input)
    }
  })

}
let clearInput = (input) => {
  let input__array = input.split('')
  for (let i = 0; i < input__array.length; i++) {
    switch (input__array[i]) {
      case '*':
        input__array[i] = ' <span class="operator">x</span> '
        break;
      case '+':
        input__array[i] = ' <span class="operator">+</span> '
        break;
      case '-':
        input__array[i] = ' <span class="operator">-</span> '
        break;
      case '/':
        input__array[i] = ' <span class="operator">÷</span> '
        break;
      case '%':
        input__array[i] = `<span class="percent">%</span>`;
        break;
      case '(':
        input__array[i] = `<span class="percent">(</span>`;
        break;
      case ')':
        input__array[i] = `<span class="percent">)</span>`;
        break;
    }
  }
  return input__array.join('')
}
let CleanOutput = (output) => {
  let output__string = output.toString();
  let decimal = output__string.split('.')[1];
  output__string = output__string.split('.')[0]
  console.log(decimal)
  console.log(output__string)

}