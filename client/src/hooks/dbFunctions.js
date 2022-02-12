export function returnUniqueNum(arrayOfIds) {
  //Argument take a max range and an array
  let range = arrayOfIds.length;

  if (range === 0) {
    return 0;
  }

  //Sort the array
  // console.log("Before Sort",arrayOfIds)
  arrayOfIds.sort(function (a, b) {
    return a - b;
  });
  // console.log("After Sort",arrayOfIds);

  try {
    for (let i = 0; i < range; i++) {
      // console.log(arrayOfIds[i]);
      //The first in check Num
      const startNum = arrayOfIds[i] + 1;
      if (arrayOfIds[0] === 1) {
        return 0;
      }
      //The num we are checking against
      const nextNum = arrayOfIds[i + 1];
      if (startNum !== nextNum) {
        return startNum;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// let arrayOfIds = [8, 0, 1, 2, 7, 3, 5, 4,6,11,13,14,15,17,9,10,12,16,18];

// // console.log("\n====\nFINAL\n====\n", returnUniqueNum(arrayOfIds, 1000));
// console.log(returnUniqueNum(arrayOfIds));
