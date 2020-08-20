"use strict";

const input = document.querySelector("#input"), // input/output button
    numbers = document.querySelectorAll(".numbers div"), // number buttons
    operators = document.querySelectorAll(".operators div"), // operator buttons
    result = document.querySelector("#result"), // equal button
    clear = document.querySelector("#clear"); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

let numberOperatorsArray = [];

numbers.forEach(function (number) {
    number.addEventListener("click", function () {
        input.innerHTML += this.innerHTML;
        numberOperatorsArray = [...numberOperatorsArray, this.innerHTML];
    });
});

operators.forEach(function (operator) {
    operator.addEventListener("click", function () {
        input.innerHTML += this.innerHTML;
        numberOperatorsArray = [...numberOperatorsArray, this.innerHTML];
    });
});

// on click of 'equal' button
result.addEventListener("click", function() {
    // do maths here...
    console.log("The numbers, operators array is currently:", numberOperatorsArray);
    let numbersStringHolder = "";
    let equalFunctionArray = [];
    for (let char of numberOperatorsArray) {
        console.log("the char is: ", char)
        const numReg = /\d/;
        if (numReg.test(char) || char === '.') {
            numbersStringHolder += char;
        } else {
            equalFunctionArray = [...equalFunctionArray, Number(numbersStringHolder), char]
            numbersStringHolder = "";
        }
    }
    equalFunctionArray = [...equalFunctionArray, Number(numbersStringHolder)];
    console.log("The Array that inside of the Equals Function", equalFunctionArray);
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
});