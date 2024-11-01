//Callback
//a function passed as an argument to another function

function sum(parameter1, parameter2) {
  return parameter1 + parameter2;
}

const printer = function (num1, num2, sum) {
  console.log(num1, " + ", num2, " = ", sum(num1, num2));
};

printer(2, 3, sum);

//Closures
// when a function can access variable in its lexical scope

function sendMessage() {
  let message = "message 1";

  const displayMessage = () => {
    console.log(message);
  };

  return displayMessage();
}

sendMessage();

function parent(name) {
  return function child() {
    console.log("Inside Child", name);
  };
}

const parentVar = parent("omkar");
parentVar;
