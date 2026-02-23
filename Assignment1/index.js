const express = require("express");

const app = express();

const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 8,
    cgpa: 9.3
  },
  {
    id: 2,
    name: "Ishita Verma",
    branch: "IT",
    semester: 7,
    cgpa: 8.9
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    branch: "ECE",
    semester: 6,
    cgpa: 8.4
  },
  {
    id: 4,
    name: "Meera Iyer",
    branch: "CSE",
    semester: 8,
    cgpa: 9.1
  },
  {
    id: 5,
    name: "Kunal Deshmukh",
    branch: "IT",
    semester: 5,
    cgpa: 7.8
  },
  {
    id: 6,
    name: "Ananya Reddy",
    branch: "CSE",
    semester: 6,
    cgpa: 8.7
  },
  {
    id: 7,
    name: "Vikram Patil",
    branch: "ECE",
    semester: 7,
    cgpa: 8.2
  },
  {
    id: 8,
    name: "Priyanka Nair",
    branch: "AI",
    semester: 4,
    cgpa: 8.8
  },
  {
    id: 9,
    name: "Harsh Mehta",
    branch: "Data Science",
    semester: 5,
    cgpa: 8.0
  },
  {
    id: 10,
    name: "Neha Gupta",
    branch: "CSE",
    semester: 6,
    cgpa: 7.9
  }
];


app.get("/students", (req, res) => {
    console.log(students)
  res.status(200).json(students);
});


app.get("/students/topper", (req, res) => {
  var max = 0;
  for(i of students){
    if(i.cgpa > max){
        max = i.cgpa;
        var userid = i.id;
    }
  }

  const user = students.find(u => u.id === userid);

  res.status(200).json(user);

  if (!user) {
    return res.status(404).json({ message: "Student not found" });
  }
});


app.get("/students/average", (req, res) => {
    var sum = 0;
    for(i of students){
        sum = sum + i.cgpa
    }

    var avg = sum/students.length;

    res.status(200).json({ averageCgpa: avg });
});


app.get("/students/count", (req, res) => {

    res.status(200).json({ totalStudents: students.length });

});


app.get("/students/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const student = students.find(u => u.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});


app.get("/students/branch/:branchName", (req, res) => {
  const branchName = req.params.branchName.toLowerCase();
  const studentsInBranch = students.filter(s => s.branch.toLowerCase() === branchName);

  if (studentsInBranch.length === 0) {
    return res.status(404).json({ message: "No students found in this branch" });
  }

  res.status(200).json(studentsInBranch);
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});