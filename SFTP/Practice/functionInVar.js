
/*
Genral function
*/

// function getUser(name,role) {
//     switch (role) {
//         case "admin":
//         return ` ${name} is admin with all access`
//         break;
//         case "subadmin":
//         return ` ${name} is subadmin with limited access`
//         break;
//         case "user":
//         return ` ${name} is user with only read access`
//         break;
//     }
// }

/*
Function in variable.
*/

  const getUser = (name,role) =>{
    switch (role) {
        case "admin":
        return ` ${name} is admin with all access`
        break;
        case "subadmin":
        return ` ${name} is subadmin with limited access`
        break;
        case "user":
        return ` ${name} is user with only read access`
        break;
    }
}


console.log(getUser("sunil","admin"));

const result = getUser("amit","subadmin");
console.log(result)