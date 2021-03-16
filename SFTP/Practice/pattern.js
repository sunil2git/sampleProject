

var symbol ="$";
var size = 4;

const str  = "$1,$2,$3,$4"

console.log('Pattern : \n', str);




const columnNames = {
    id: "id",
    name: "name",
    email: "email"
 }


 Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };


 console.log('size : ', Object.size(columnNames));
 


var text ="";
var i;
for (i = 0; i <  Object.size(columnNames); i++) {
  text += "$"+i + ",";
}