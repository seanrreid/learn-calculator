"use strict";

const input = document.getElementById("input"), // input/output button
    numbers = document.querySelectorAll(".numbers div"), // number buttons
    operators = document.querySelectorAll(".operators div"), // operator buttons
    result = document.getElementById("result"), // equal button
    clear = document.getElementById("clear"); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

// numbers is a NodeList object, we need to make it into an array first, then we can map through it...
Array.from(numbers).map(number => {
    number.addEventListener("click", function(e) {
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        // if result is not diplayed, just keep adding
        if (resultDisplayed === false) {
            input.innerHTML += this.innerHTML;
        } else if (
            (resultDisplayed === true && lastChar === "+") ||
            lastChar === "-" ||
            lastChar === "×" ||
            lastChar === "÷"
        ) {
            // if result is currently displayed and user pressed an operator
            // we need to keep on adding to the string for next operation
            resultDisplayed = false;
            input.innerHTML += this.innerHTML;
        } else {
            // if result is currently displayed and user pressed a number
            // we need clear the input string and add the new input to start the new opration
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += this.innerHTML;
        }
    });
});

// adding click handlers to the calculation buttons
Array.from(operators).map(operator => {
    operator.addEventListener("click", function(e) {
        // storing current input string and its last character in variables - used later
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];
    
        // if last character entered is an operator, replace it with the currently pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            // We need to create a new string, and just replace the last character.  
            const newString = currentString.substring(0, currentString.length - 1) + this.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            // if first key pressed is an opearator, don't do anything
            console.log("enter a number first");
        } else {
            // else just add the operator pressed to the input
            input.innerHTML += this.innerHTML;
        }
    });
})

// on click of 'equal' button
result.addEventListener("click", function() {
    // this is the string that we will be processing eg. -10+26+33-56*34/23
    const inputString = input.innerHTML;

    // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    const numbers = inputString.split(/\+|\-|\×|\÷/g);

    // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
    // first we replace all the numbers and dot with empty string and then split
    const operators = inputString.replace(/[0-9]|\./g, "").split("");

    
    // now we are looping through the array and doing one operation at a time.
    // first mutliply, then divide, then addition and then subtraction
    // as we move we are alterning the original numbers and operators array
    // the final element remaining in the array will be the output

    let add = operators.indexOf("+"),
        subtract = operators.indexOf("-"),
        multiply = operators.indexOf("×"),
        divide = operators.indexOf("÷");

    console.log("numbers before multiply", numbers);

    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    console.log("numbers after multiply, before divide", numbers);

    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    console.log("numbers after multiply, divide, and before addition", numbers);

    while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    console.log("numbers after multiply, divide, addtion, and before subtract", numbers);

    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    console.log("numbers after all operations", numbers);

    input.innerHTML = numbers[0]; // displaying the output
    resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
});