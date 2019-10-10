const jpegasus = require("jpegasus");

let test;

export default file => {
  let a = jpegasus.compress(file, {
    quality: 0.8
  });
  return a;
};

// function getExample() {
//   var a = promiseA(…);
//   var b = a.then(function(resultA) {
//       // some processing
//       return promiseB(…);
//   });
//   return Promise.all([a, b]).then(function([resultA, resultB]) {
//       // more processing
//       return // something using both resultA and resultB
//   });
// }
