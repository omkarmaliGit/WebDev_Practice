// Rest and Spread

// Rest and Spread operator (...)

// De-structuring : unpacking

const array = [1, 2, 3, 4, 5, 6, 7];

// const first = array[0];
// const second = array[1];
// const third = array[2];
// const fourth = array[3];

const [first, ...remaining] = array;

console.log(first, remaining);

const array2 = [...remaining];
// console.log(array2);

const object = {
  name: "hritik",
  age: 24,
  isMarried: false,
};

// const { name, ...rest } = object;

// console.log(name, rest);

function rest(...parameters) {
  console.log(parameters);
}

rest(1, "w", 5, 2, 4, false);

const omkar = "Omkar";
const [first1, ...remaining1] = omkar;
console.log(first1, [...remaining1]);
