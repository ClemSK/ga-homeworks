// ! 💻 Remember when working in the browser, be sure to save the changes in this file, and refresh the browser window to run the code again.

// ! 👨‍🏫 Read the readme carefully, and practice using "window.prompt()" to gather user input

// * Write your code below!

let calculate = true

const firstNumber = parseFloat(window.prompt('What is the first number?'))
const secondNumber = parseFloat(window.prompt('What is the second number?'))
const operator = window.prompt('Would you like to +, -, * or /? ')

while (calculate) {

    if (operator === '+') {
        window.alert(firstNumber + secondNumber);
    }

    if (operator === '-') {
        window.alert(firstNumber - secondNumber);
    }
    
    if (operator === '*') {
        window.alert(firstNumber * secondNumber);
    }

    if (operator === '/') {
        window.alert(firstNumber / secondNumber);
    }
    calculate = window.confirm('Would you like to go again?')
}
console.log('Thanks for using this great calculator!')