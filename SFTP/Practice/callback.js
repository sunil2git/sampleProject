/*
Example for call back function writing
*/ 

// take an array

var result = [2,4,6,8].every((e)  => {


  return e%2 === 0  
})

// for multi line code use {} with return keyword is compulsory

console.log("elements result are :",result)