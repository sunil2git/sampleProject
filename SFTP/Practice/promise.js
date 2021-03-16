
/**
 *  Promise concept :
 */

 const uno = () => {
    return "I am one";
 };

 /**
 *  old way write function which gives result : { undefined }
 */

 const dos = () => {
     return new Promise((resolve,rejects) =>{
        setTimeout(()=>{
            resolve ("I am two");
             },3000);
     }) 
};


//  const dos = () => {
//      setTimeout(()=>{
//     return "I am two";
//      },3000);
// };

const tres = () => {
   return "I am three";
};

// uno();
// dos();
// tres();

// create a function which call other function and call in a sequence way,
// make callMe() async method
// Put the await keyword on the method which going take time like db call, local FS or other API request 

const callMe = async () =>{
    let valOne = uno();
    console.log(valOne)

    let valTwo = await dos();
    console.log(valTwo)

    let valThree = tres();
    console.log(valThree)
};

callMe();





