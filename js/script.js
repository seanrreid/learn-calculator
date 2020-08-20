"use strict";

const input = document.getElementById("input"), // input/output button
    numbers = document.querySelectorAll(".numbers div"), // number buttons
    operators = document.querySelectorAll(".operators div"), // operator buttons
    result = document.getElementById("result"), // equal button
    clear = document.getElementById("clear"); // clear button

let resultDisplayed = false; // flag to keep an eye on what output is displayed

numbers.forEach(function (number) {
    number.addEventListener("click", function () {
        input.innerHTML += this.innerHTML;
    });
});

operators.forEach(function (operator) {
    operator.addEventListener("click", function () {
        input.innerHTML += this.innerHTML;
    });
});

// on click of 'equal' button
result.addEventListener("click", function() {
    // do maths here...
    alert("DO THE MATHS!!")
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
});