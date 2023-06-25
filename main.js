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
      display_input.value = input
      display_output.innerHTML = input
    } else if (value == 'backspace') {
      input = input.slice(0, -1)
      display_input.value = input
    } else if (value == '=') {
      let result = eval(input)
      display_output.innerHTML = result
    } else if (value == 'brackets') {
      if (
        input.indexOf('(') == -1 ||
        input.indexOf('(') != -1 &&
        input.indexOf(')') != -1 &&
        input.lastIndexOf('(') < input.lastIndexOf(')') 
      ) {
        input += "(";
      }else if (
        input.indexOf('(') != -1 &&
        input.indexOf(')') == -1 ||
        input.indexOf('(') != -1 &&
        input.indexOf(')') != -1 &&
        input.lastIndexOf('(') > input.lastIndexOf(')') 
      ) {
        input += ")";
      }

      display_input.value = input
    } else {
      input += value
      display_input.value = input
    }
  })
  
}
