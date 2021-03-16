var sunil = {
  firstName: "Sunil",
  lastName: "Kumar",
  city: "Pune",
  getInfo: function() {
    console.log(`
    First name is ${this.firstName} 
    Last name is ${this.lastName}
    City is ${this.city}
    `);
  } 
};
// this need to mention to refer the current scope variable
//sunil.getInfo();

var arjun = {
  firstName: "Arjun",
  lastName: "Singh",
  city: "Raipur"
};

// bind function with other object

sunil.getInfo.bind(arjun)(); // 1st way

var ajju = sunil.getInfo.bind(arjun); // 2nd way
ajju();
