const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const saltRounds = 10

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

const db = mysql.createConnection ({
    user: "root",
    host: "localhost",
	password: "Onepiece#99",
    database: "springseniorproject",
});


//insert student registration form info into database
app.post("/registerStudent", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const id = req.body.id;
    const email = req.body.email;
    const gradDate = req.body.gradDate;

        db.query("INSERT INTO student (StudentID, StudentFName, StudentLName, StudentUsername, StudentEmail, GradDate) VALUES (?,?,?,?,?,?)", 
        [id, fname, lname, username, email, gradDate], 
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send("Value Inserted");
            }
        }
        );
    });

//insert rep registration form info into database
app.post("/registerRep", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const id = req.body.id;
    const email = req.body.email;

        db.query("INSERT INTO departmentrep (RepID, RepFName, RepLName, RepUsername, RepEmail) VALUES (?,?,?,?,?)", 
        [id, fname, lname, username, email], 
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send("Value Inserted");
            }
        }
        );
    });

//Check if student is new user or a returning user
app.post("/checkStudentUser", (req, res) => {
    const email = req.body.email;
    db.query("Select * From student Where StudentEmail = ?", 
    email, 
    (err, result) => {
        if(err) {
            res.send({err: err});
        } 
        if (result.length !== 0){
            res.send({message: "Returning"});
        } else {
            res.send({message: "New"});
            }
        }
    );
});

//Check if rep is a returning user or new user
app.post("/checkRepUser", (req, res) => {
    const email = req.body.email;
    db.query("Select * From departmentrep Where RepEmail = ?", 
    email, 
    (err, result) => {
        if(err) {
            res.send({err: err});
        } 
        if (result.length !== 0){
            res.send({message: "Returning"});
        } else {
            res.send({message: "New"});
            }
        }
    );
});

//Log an activity
app.post("/addActivity", (req, res) => {
    const activityname = req.body.activityname;
    const description = req.body.description;
    const country = req.body.country;
    const state = req.body.state;
    const city = req.body.city;
    const sponsor = req.body.sponsor;
    const start = req.body.start;
    const end = req.body.end;
    const classification = req.body.classification;
    const studentid = req.body.studentid;
    const activitytype = req.body.activitytype;
    const approvalstatus = req.body.approvalstatus;

    db.query("INSERT INTO activity (ActivityName, Description, Country, State, City, Sponsor, StartDate, EndDate, StudentId, TypeId, ApprovalId, ClassID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
    [activityname, description, country, state, city, sponsor, start, end, studentid, activitytype, approvalstatus, classification], 
    (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Value Inserted");
        }
    }
    );
});


//retrieve student info
app.post('/studentUserInfo', (req, res) => {
    const email = req.body.email;
    db.query("SELECT * FROM student WHERE StudentEmail=?", 
    email, 
    (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve rep info
app.post('/repUserInfo', (req, res) => {
    const email = req.body.email;
    db.query("SELECT * FROM departmentrep WHERE RepEmail=?", 
    email, 
    (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


//retrieve activity types from database
app.get('/types', (req, res) => {
    db.query("SELECT * FROM activitytype", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve student classifications
app.get('/classes', (req, res) => {
    db.query("SELECT * FROM classification", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve a specific students activities
app.post('/activities', (req, res) => {
    const id = req.body.id;
    db.query("SELECT * FROM activity INNER JOIN approvalstatus on approvalstatus.ApprovalId = activity.ApprovalId where StudentID =?", 
    id, 
    (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve all activities
// app.post('/activities', (req, res) => {
//     const id = req.body.id;
//     db.query("SELECT * FROM activity INNER JOIN approvalstatus on approvalstatus.ApprovalId = activity.ApprovalId where StudentID =?", 
//     id, 
//     (err, result) => {
//         if(err){
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

//retrieve info for specific activity
app.post('/activity', (req, res) => {
    const id = req.body.id;
    db.query("SELECT * FROM activity where ActivityID = ?", 
    id, 
    (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve info for specific activity
app.post('/repactivity', (req, res) => {
    const id = req.body.id;
    db.query("SELECT * FROM activity INNER JOIN approvalstatus on approvalstatus.ApprovalId = activity.ApprovalId INNER JOIN student on student.StudentID = activity.StudentId  WHERE ActivityID = ?", 
    id,
    (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});



//retrieve all status types
app.get('/status', (req, res) => {
    db.query("SELECT Status FROM approvalstatus", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve all activities
app.get('/repactivities', (req, res) => {
    db.query("SELECT * FROM activity INNER JOIN approvalstatus on approvalstatus.ApprovalId = activity.ApprovalId INNER JOIN student on student.StudentID = activity.StudentId", 
    (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve all status types other than reject and archive
app.get('/limitedStatus', (req, res) => {
    db.query("SELECT * from approvalstatus where Status != 'rejected' && Status != 'archive'", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve activities from database
app.get('/table', (req, res) => {
    db.query("Select * from approvalstatus join activity on activity.ApprovalId = approvalstatus.ApprovalId join student on activity.StudentId = student.StudentId", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//update status when approved
app.put('/approve', (req, res) => {
    const id = req.body.id;
    const status  = req.body.status;
    db.query("Update activity set ApprovalID = ? + 1 where ActivityID = ?", [status, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//reverse approval
app.put('/updateStatus', (req, res) => {
    const id = req.body.id;
    const status  = req.body.status;
    db.query("Update activity set ApprovalID = ? - 1 where ActivityID = ?", [status, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//reverse reject status
app.put('/reverseReject', (req, res) => {
    const id = req.body.id;
    const status  = req.body.status;
    db.query("Update activity set ApprovalID = ? where ActivityID = ?", [status, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//reject an activity
app.put('/reject', (req, res) => {
    const id = req.body.id;
    db.query("Update activity set ApprovalID = (Select ApprovalID from approvalstatus where Status = 'rejected') where ActivityId = ?", [id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Delete an activity
app.delete("/deleteActivity/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM activity WHERE ActivityID = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


app.listen(3001, () => {
    console.log("Server is running on port 3001")
});
