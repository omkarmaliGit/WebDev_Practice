// Re-usable block of code supposed to perform a specific task.

//parameters
function functionName(parameters) {
  // Function decleration or defination

  // return : breaks the execution flow,
  // and return the value from where the function is called
  return parameters; //returned from funtion

  const a = 10;
  if (a) {
    return a;
  }
}

const value = functionName(789151); // Function call

console.log(value);

// Arrow Functions

const functionName1 = (parameters) => {
  return parameters;
};

const functionName2 = (parameters) => parameters * 2;

console.log(functionName2(3));

const varaiable = function myFunction(parameters) {
  console.log(`these are the parameters : ${parameters}`);
}; // On assigning a refrence type variable to another, the refrence is passed

varaiable("hritik");

const array = [1, 2, 3, 4, 5, 6, 7, 8];

// Higher order function
// Lambda functions
console.log(array.forEach((element) => element * 2));

// Functions in JS (*****First Class Citizen)
// 1. Stored inside variables
// 2. Can be passed as an argument to another function (Callback)
// 3. Can be returned from a function (Closure)

function newFunction() {
  return function function2(parameters) {
    return parameters;
  };
}

console.log(newFunction()("hritik"));
