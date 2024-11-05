const array = ["a", 1, 2, true, 4, 5, "hello", false];

for (let element in array) {
  //index
  console.log(element);
}

console.log("----------------------------------------------------------------");

for (let element of array) {
  //value
  console.log(element);
}

console.log("----------------------------------------------------------------");

console.log(array);

//slice
console.log(array.slice(1, 6));

//splice
console.log(array.splice(-2), array);
