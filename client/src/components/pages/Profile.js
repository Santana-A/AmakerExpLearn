import React from 'react';
import './css/profile.css';
import { Button } from '../Button';
import Axios from "axios";
import { useState } from 'react';
import { useAuth, validStuAccount, validRepAccount } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const currentUser = useAuth();
    let navigate = useNavigate();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");
    const [gradDate, setGradDate] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [student, setStudent] = useState(false);

    Axios.defaults.withCredentials = true;


    const addStudent = () => {
        Axios.post("https://exp-learn-log.herokuapp.com/registerStudent", {
            fname: fname, 
            lname: lname,
            username: username,
            id: id,
            email: email,
            gradDate: gradDate,       
        }).then(() => {
            alert("Welcome " + fname + " " + lname);
            console.log("success");
        });
    };

    const addRep = () => {
      Axios.post("https://exp-learn-log.herokuapp.com/registerRep", {
          fname: fname, 
          lname: lname,
          id: id,
          username: username,
          email: email,     
      }).then(() => {
          alert("Welcome " + fname + " " + lname);
          console.log("success");
      });
  };

    const goHome = () => {
        window.location.reload(false);
    };

    const showAlert = () => {
      alert("Alert Yall");
   };

  return (
    <div className='container'>
      <div className="student">
        <div className='studentInfo'>
          {validStuAccount(email) ? (<>
          <h1>Register Student</h1>
          <label>First name:</label>
          <input type="text" onChange={(event) => {setFname(event.target.value)}} />

          <label>Last name:</label>
          <input type="text" onChange={(event) => {setLname(event.target.value)}} />

          <label>Username:</label>
          <input type="text" onChange={(event) => {setUsername(event.target.value)}} />

          <label>ID Number:</label>
          <input type="text" onChange={(event) => {setId(event.target.value)}} />

          <label>Graduation Date:</label>
          <input type="date" onChange={(event) => {setGradDate(event.target.value)}} />

          <Button onClick={() => { addStudent(); goHome();}}> Register</Button>
          </>): (<>
            <h1>Register Representative</h1>
          <label>First name:</label>
          <input type="text" onChange={(event) => {setFname(event.target.value)}} />

          <label>Last name:</label>
          <input type="text" onChange={(event) => {setLname(event.target.value)}} />

          <label>Username:</label>
          <input type="text" onChange={(event) => {setUsername(event.target.value)}} />
          
          <label>ID Number:</label>
          <input type="text" onChange={(event) => {setId(event.target.value)}} />

          <Button onClick={() => { addRep(); goHome();}}> Register</Button>
          </>)}
        </div>
      </div>
    </div>
  )
}

export default Profile