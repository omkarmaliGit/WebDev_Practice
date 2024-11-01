// Coersion -> When you convert values of one type to another

// Implicit -> Indirectly

const value1 = 2;
const value2 = "4";
console.log(value1 + value2);

if ("") {
  console.log("inside if");
}

// Explicit -> Directly

const string = "exghb";
const number = Number(string);
console.log(string, typeof string, number, typeof number);

const value = 56;
const boolen = Boolean(value);
console.log(value, typeof value, boolen, typeof boolen);

// NAN : Not a Number, valid value of number type
//  Truthy and Falsy Values

// Truthy : all values, except for the falsy
// Fasly : 0, 0n, '', false, undefined, null, NAN
