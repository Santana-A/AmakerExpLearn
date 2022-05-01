import React from 'react';
import { useAuth, validStuAccount, validRepAccount } from '../../firebase-config';
import './css/account.css';
import { Button } from '../Button';
import { useState, useEffect } from 'react';
import Axios from "axios";
import userPhoto from '../img/userphoto.jpg';
import Moment from 'moment';

const Account = () => {
  const currentUser = useAuth();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [gradDate, setGradDate] = useState("");
  const email = localStorage.getItem('email');
  const photo = localStorage.getItem('photo');
  const [student, setStudent] = useState(false);



  const [updateFname, setUpdateFname] = useState(fname);
  const [updateLname, setUpdateLname] = useState(lname);
  const [updateUsername, setUpdateUsername] = useState(username);
  const [updateId, setUpdateId] = useState(id);
  const [updateGradDate, setUpdateGradDate] = useState(gradDate);
  
  const setUpdates = () => {
    setUpdateFname(fname);
    setUpdateLname(lname);
    setUpdateUsername(username);
    setUpdateId(id);
    setUpdateGradDate(gradDate);
  }
    
  


  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  }

//   Axios.get("http://localhost:3001/studentUserInfo", {email: email,
//  }).then((response) => {
//       setStudentInfo(response.data);
//   });


if(validStuAccount(email)){
    Axios.post("https://exp-learn-log.herokuapp.com/studentUserInfo", {
        email: email,  
    }).then((response) => {
      setFname(response.data[0].StudentFName);
      setLname(response.data[0].StudentLName);
      setUsername(response.data[0].StudentUsername);
      setId(response.data[0].StudentID);
      setGradDate(response.data[0].GradDate);
    });
};

console.log("this is repuser:" + fname);

const updateRep = () => {

  Axios.put("https://exp-learn-log.herokuapp.com/updateRep", {
      fname: updateFname, 
      lname: updateLname,
      updateid: updateId,
      id: id,
      username: updateUsername,
      email: email,     
  }).then(() => {
      alert("Profile Updated");
      console.log("success");
  });
};
//http://localhost:3001
const updateStudent = () => {
  console.log("this is updatefname: " + updateFname)
  Axios.put("https://exp-learn-log.herokuapp.com/updateStudent", {
    fname: updateFname, 
    lname: updateLname,
    updateid: updateId,
    username: updateUsername,
    id: id,
    email: email,
    gradDate: updateGradDate,       
  }).then(() => {
      alert("Profile Updated");
      console.log("success");
  });
};

if(validRepAccount(email)){
  Axios.post("https://exp-learn-log.herokuapp.com/repUserInfo", {
      email: email,  
  }).then((response) => {
    setFname(response.data[0].RepFName);
    setLname(response.data[0].RepLName);
    setUsername(response.data[0].RepUsername);
    setId(response.data[0].RepID);
  });
};

  return (
    <div className='container'>
      {toggle ? <>
      <div className="account">
          <div className="upperContainer">
              <div className='imgContainer'>
              <img
                className="profileUserImg"
              src={userPhoto}
                alt='profile pic'
              />
              </div>
          </div>
          <div className='lowerContainer'>
            
              <h1>{fname} {lname} </h1>
              {validStuAccount(email) ? (<h3>Student ID: {id} </h3>) : (<h3>Representative ID: {id}</h3>)}
              <h3>Username: {username} </h3>
              {validStuAccount(email) ? (<h3>Anticipated Graduation Date: {Moment(new Date(gradDate)).format("DD/MM/YYYY")} </h3>) :
              (<></>)
              }
              <Button className='btn' onClick={() => { handleToggle(); setUpdates();}}>Edit</Button>
              </div>
        </div> 
            </>: <>
              {validStuAccount(email) ? (<>
                <div className='container'>
                  <div className="student">
                    <div className='studentInfo'>
                <h1>Update Student Profile</h1>
                <label>First name:</label>
                <input value={updateFname} type="text" onChange={(event) => {setUpdateFname(event.target.value)}} />

                <label>Last name:</label>
                <input value={updateLname} type="text" onChange={(event) => {setUpdateLname(event.target.value)}} />

                <label>Username:</label>
                <input value={updateUsername} type="text" onChange={(event) => {setUpdateUsername(event.target.value)}} />

                <label>ID Number:</label>
                <input value={updateId} type="text" onChange={(event) => {setUpdateId(event.target.value)}} />

                <label>Graduation Date:</label>
                <input value={updateGradDate} type="date" onChange={(event) => {setUpdateGradDate(event.target.value)}} />

                <Button onClick={() => { updateStudent(); handleToggle();}}> Register</Button>
                </div>
              </div>
            </div>
                </>): (<>
                  <div className='container'>
                  <div className="student">
                    <div className='studentInfo'>
                  <h1>Update Representative Profile</h1>
                  <label>First name:</label>
                <input value={updateFname} type="text" onChange={(event) => {setUpdateFname(event.target.value)}} />

                <label>Last name:</label>
                <input value={updateLname} type="text" onChange={(event) => {setUpdateLname(event.target.value)}} />

                <label>Username:</label>
                <input value={updateUsername} type="text" onChange={(event) => {setUpdateUsername(event.target.value)}} />

                <label>ID Number:</label>
                <input value={updateId} type="text" onChange={(event) => {setUpdateId(event.target.value)}} />

                <Button onClick={() => { updateRep(); handleToggle();}}> Register</Button>
                </div>
              </div>
            </div>
                </>)}
            </>}
         
    </div>
    // <div className='account'>
    //   <div className='accountTop'>
    //   <img className='accountCoverPic' src={currentUser ? (currentUser.photoURL) : ('#')} alt='profile pic'/>
    //     <img className='accountProfilePic' src={currentUser ? (currentUser.photoURL) : ('#')} alt='profile pic'/>
    //   </div>
    //   <div className='accountBottom'>

    //   </div>
    // </div>
  )
}

export default Account