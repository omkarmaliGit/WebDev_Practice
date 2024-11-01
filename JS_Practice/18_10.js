// Asychronous programing in JS
//  1. Callbacks
// Callback Hell : Nested callbacks that makes it difficult to read, maintain and debug code
// 2. Promises : Eventual completion of a operation
//       3 States : Pending, Resolved and Rejected
//  Inbuilt Error handling
// 3. Async Await : Syntactical Sugar over promises
// Async : Makes a function asynchronous
// Await : Makes the program wait until the promise is resolved or rejected
// Wrap the code in try catch block for error handling

// console.log('Before Promise');

// const myPromise = new Promise((resolve, reject) => {
//     const randomNumber = Math.floor(Math.random() * 10);
//     setTimeout(() => {
//         console.log('Inside setTimeOut')
//         if (randomNumber > 5) {
//             resolve(randomNumber);
//         }
//         else {
//             reject('Value less than 5');
//         }
//     }, randomNumber * 1000)
// })

// console.log(myPromise);

// myPromise
//     .then((value) => { console.log('Then block executed', value) })
//     .catch((error) => { console.log('Catch block executed', error) })

// console.log('After Promise');

async function promiseHandler() {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 10);
    setTimeout(() => {
      console.log("Inside setTimeOut");
      if (randomNumber > 2) {
        resolve(randomNumber);
      } else {
        reject("Value less than 5");
      }
    }, randomNumber * 1000);
  });
}

async function myFunction() {
  try {
    console.log("Before Promise");
    const value = await promiseHandler();
    console.log("After Promise");
    console.log(value);
  } catch (error) {
    console.log(error);
    console.log("After Error");
  }
}

myFunction();
// Callback Hell
// setTimeout((name) => {
//     name = 'hriitik'
//     setTimeout((name) => {
//         console.log('Completed the 2nd setTimeOut', name)
//         setTimeout(() => {
//             console.log('Inside the 3rd setTimeOut')
//             setTimeout(() => {
//                 console.log('Inside the 4th setTimeOut')
//             }, 7000)
//         }, 3000)
//     }, 5000)
//     console.log('Completed the setTimeOut')
// }, 2000)
