const express = require('express');
const mongoose = require('mongoose');
const teacherModel = require('../db/teacher');
const classModel = require('../db/classes');
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server is listening to port number ${port}`)
});

mongoose.connect('mongodb://127.0.0.1:27017/school', {useNewUrlParser: true, useUnifiedTopology: true,})
.then((result)=>{console.log("Database has been connected");})
.catch((err)=>{console.log("Error")})

app.get("/", (req,res)=>{
    console.log("Home Page")
    res.send("This is school management system")
})

app.get("/students", (req,res)=>{
    console.log("Students of the school")
    res.send("Students")
})

app.get("/management", (req,res)=>{
    console.log("Management team of the school")
    res.send("Management")
})

//-----------------------------------------------CLASS--------------------------------------------------------------//
app.get("/classes", (req, res) => {
    res.send("All the classes of the school");
})

app.post("/classes/create", (req, res) => {

    newClassDetails = req.body;
    var teacher = new teacherModel(newClassDetails['classTeacher'])
    console.log(newClassDetails['name'])
    console.log(newClassDetails['classStrength'])
    console.log(teacher)

    newClass = new classModel({
        name : newClassDetails['name'],
        classStrength : newClassDetails['classStrength'],
        classTeacher : teacher,
    });
    
    newClass.save()
    res.end();
})

//---------------------------------------------TEACHERS ------------------------------------------------------------//

// Get all the teachers of the school
app.get("/teachers", async(req,res)=>{

    const allTeachers = await teacherModel.find({});
    res.send(allTeachers);
})

// Get all teachers of a particular class (classLevel)
app.get("/teachers/class/:class", async(req,res)=> {

    classLevel = req.params.class
    var teachers = await teacherModel.find({teachesClass: {$in: [`${classLevel}`]}})
    res.send(teachers);
})

// Get all teachers of a particular subject
app.get("/teachers/subject/:subject", async (req,res)=> {

    subject = req.params.subject;
    var teachers = await teacherModel.find({teachesSubject: {$in: [`${subject}`]}})
    res.send(teachers);
})

// Get all teachers of a particular class and subject
app.get("/teachers/class/:class/subject/:subject", async (req,res)=> {

    subject = req.params.subject;
    classLevel = req.params.class;

    var teachers = await teacherModel.find({
        teachesSubject: {$in: [`${subject}`]},
        teachesClass: {$in: [`${classLevel}`]}
    })

    res.send(teachers);
})

// Get teachers having experience less than the given years.
app.get("/teachers/experience/:years", async(req, res) => {
    
    years = parseInt(req.params.years);
    var teachers = await teacherModel.find({
        experience: {$lt : years}
    });

    res.send(teachers);
})

// Post request to add teacher to the database or school.
app.post("/teacher/add", (req, res) => {
    teacher = new teacherModel(req.body);
    teacher.save();
    res.end();
});