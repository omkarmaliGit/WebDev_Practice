// Hoisting (Decleration is moved to the top of the scope)

// console.log(a);
// var a = 2;

// console.log(aa);

function f() {
  let a;
  if (true) {
    a = 10;
  } else {
    a = 20;
  }
  return a;
}

console.log(f());
