//------------------------Declaration--------------------------------

var Num10 = 10;
let Num20 = 20;
const Num30 = 30;

console.log("Declaration - ", Num10, Num20, Num30);

//-------------------------Re-Assign----------------------------------

Num10 = 101;
Num20 = 201;
// Num30 = 301; //Not Allowed //Const

console.log("Re-Assign - ", Num10, Num20, Num30);

//-------------------------Re-Declare----------------------------------

var Num10 = 1010;
// let Num20 = 2020; //Not Allowed //Let
// const Num30 = 3030; //Not Allowed //Const

console.log("Re-Declaration - ", Num10, Num20, Num30);

//---------------------Inside the Function-----------------------------

function f() {
  var Num11 = 11;
  let Num21 = 21;
  const Num31 = 31;

  {
    var Num29 = 29;
    let Num01 = 1;
    const Num96 = 96;

    // console.log("Declaration Inside Block - ", Num29, Num01, Num96);
    // console.log("Declaration Inside Fuction - ", Num11, Num21, Num31);
    // console.log("Printing Global Inside Function - ", Num10, Num20, Num30);
  }

  // console.log("Printing Global Inside Function - ", Num10, Num20, Num30); //global allowed anywhere inside fuction also
  // console.log("Declaration Inside Fuction - ", Num11, Num21, Num31);
  // console.log("Block in fuction - ", Num29);
}

f();

// console.log(Num11, Num21, Num31); //Not Allowed //Declared inside the function //function/block scope
// console.log("Block - ", Num96);
