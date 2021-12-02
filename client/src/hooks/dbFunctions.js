export function returnUniqueNum(arrayOfIds, max) {
  //Argument take a max range and an array

  //Make a new Num
  function buildRange() {
    //Will build a array of all the numbers in the array and return that array
    let rangeArray = [];
    for (let i = 0; i < max + 1; i++) {
      rangeArray.push(i);
    }
    return rangeArray;
  }

  //Need to build an array of all the nums and pop off the
  function checkNumAgainstArray(tryNum) {
    //Gets random Number to check against array

    //checks to see if num is in array
    let bool = arrayOfIds.includes(tryNum);

    //Returns an array if not in array the second item in the array will be the unique num
    if (bool) {
      return [true];
    } else {
      return [false, tryNum];
    }
  }
  //true on false off for while loop

  let rangeArray = buildRange();
  let counter = 0;
  let uniqueNum = 0;
  for (let i = 0; i < rangeArray.length; i++) {
    let arrayData = checkNumAgainstArray(i);
    if (!arrayData[0]) {
      // console.log("New Num = ", arrayData[1]);
      uniqueNum = arrayData[1];
      break;
    }
    counter = counter + 1;
  }
  return uniqueNum;

}

// console.log("arrayOfIds", arrayOfIds);

// let arrayOfIds = [
//   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//   22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
//   41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
//   60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
//   79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
//   98, 99,
// ];

// console.log("\n====\nFINAL\n====\n", returnUniqueNum(arrayOfIds, 1000));
