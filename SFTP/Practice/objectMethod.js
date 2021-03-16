/**
 * Methods and Objects
 * Inside method declaring function and array
 */

 var user = {
    firstName : "Sunil",
    lastName : "Kumar",
    role : "developer",
    loginCount : 30,
    faceBookSignedIn : true,
    courseList : [],
    softSkillCourses: [], // if empty then pass the default course mindvalley
    buyCourse  : function (courseName) {
        this.courseList.push(courseName)
    },
    getCouserCount : function(){
        return `${this.firstName} is enrolled in total of ${this.courseList.length}`
    },
    info : function(firstName){
        return `firstName: ${this.firstName}
    lastName: ${this.lastName}
    role: ${this.role}
    loginCount: ${this.role}
    faceBookSignedIn: ${this.faceBookSignedIn}
    couserList: ${this.courseList}
    No. of course: ${this.courseList.length}`
    },
    buysoftSkillCourses  : function (courseName) {
        this.courseList.push(courseName)
    }
 }


 console.log(user.firstName);
 console.log(user.getCouserCount());
 user.buyCourse("node.js")
 user.buyCourse("Data Science")
// console.log(user.info("Sunil"));


user.buyCourse("Python")

var softSkillCourse = (user.softSkillCourses.length == 0) ?  "Mindvalley" : user.softSkillCourse;

console.log("couserList1: ",softSkillCourse);




 
 