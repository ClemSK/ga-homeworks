/* eslint-disable no-unused-vars */


// ? write a function to remove all empty values (null, undefined, '', NaN, false) EXCEPT 0 from an array.
// ? It should handle complex data types eg: {}, [] etc.
// ? eg: [0, false, [], undefined, {}, NaN, 'Kevin'] => [0, [], {}, 'Kevin'];
function removeBlank(array) {
  return array.filter((value) => {
    return value === 0 || !!value
  })
}

// function removeBlank(array) {
//   const filterArray = array.filter(x => x !== false) // this code returned zero and the complext data types but not the string
//   console.log(filterArray)
//   return filterArray

  // const rmEmpty = array.filter((x) => x) - this code returned the string but not zero or complex data types. Not sure how to combine the two solutions
  // console.log(rmEmpty)
  // return rmEmpty 
  // }

// ? write a function to return a random element from an array
// ? eg: [1,"elephant", "apple", 67] => "elephant"
function randomElement(array) {
  const item = array[Math.floor(Math.random()*array.length)]
  return item
}

// ? write a function that returns the second lowest and second highest number in an array
// ? eg: [1,2,3,4,5,6,7,8] => [2,7]
function secondLowestSecondHighest(array) {
  const orderedArray = array.sort((a,b) => {
    return a - b
  })
  return [orderedArray[1], orderedArray[array.length - 2]]
}

// function secondLowestSecondHighest(array) {
//   console.log(array)
//   const numArray = array.sort((a, b) => a > b ? 1 : -1)
//   console.log(numArray)

//   const secondHighest = numArray.slice(-2, -1)[0]
//   console.log(secondHighest)

//   const secondLowest = numArray[1]
//   console.log(secondLowest)

//   const newArray = []
//   newArray.push(secondLowest, secondHighest)
//   console.log(newArray)
//   return newArray
// }

// ? write a function that will convert a price into coins needed to make up that price
// ? the coins available are 1, 2, 5, 10, 20, 50, 100
// ? the function should use the smallest number of coins possible
// ? eg: coins(1.99) => [100, 50, 20, 20, 5, 2, 2]
function coins(price) {
  let pence = price * 100
  const coins = [100, 50, 20, 10, 5, 2, 1]
  const result = []
  coins.forEach((coin) => {
    while (pence - coin >= 0) {
      pence -= coin
      result.push(coin)
    }
  })
  return result
}

// ? write a function to merge two arrays and remove duplicates
// ? eg: mergeUnique([9,8,8,9], [7,8,8,7]) => [9,8,7]
function mergeUnique(arr1, arr2) {
  return Array.from(new Set(arr1.concat(arr2)))
}

function mergeUnique(arr1, arr2) {
  const arr3 = [...arr1,...arr2]
  console.log(arr3)

  unique = [...new Set(arr3)]
  console.log(unique)
  return unique
}

// ? write a function to find the first n fibonacci numbers
// ? the fibonacci sequence is a series of numbers, each number is the sum of the last two
// ? 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 etc...
// ? eg: fibonacci(4) => [0,1,1,2]; fibonacci(8) => [0, 1, 1, 2, 3, 5, 8, 13];
function fibonacci(n) {
  // make the next number add the first two together:
  // num = num1 + num2
  // next = num2 + num
  const fibArray = [] // define empty array

  // create for loop
  for (i = 1; i <= 10; i++) { // iterate to produce increasing numbers
    n[0] = 0
    n[1] = 1
    fibArray[n] = fibArray[n + 2] + fibArray[n + 1]; 
    fibArray.push(fibArray[n]) // add number to the array
    console.log(fibArray);
  
  return fibArray
}

  // const n = []
  // n[0] = 0
  // [1] = 1
  
//   for (n = 2; n <= 10; n++) {
//   // Next fibonacci number = previous + one before previous



//   // Translated to JavaScript:
//   fib[n] = fib[n + 2] + fib[n + 1];
//   console.log(fib[n]);
// }
}

// let f1 = 0, f2 = 1, i

//   if (n < 10) {
//     document.write(f1 + " ")
//     for (i = 1; i < 10; i++) {
//       document.write(f2 + " ")
//       let next = f1 + f2
//       f1 = f2
//       f2 = next
//     }
//   } console.log(n)

module.exports = {
  removeBlank,
  randomElement,
  secondLowestSecondHighest,
  coins,
  mergeUnique,
  fibonacci
}
