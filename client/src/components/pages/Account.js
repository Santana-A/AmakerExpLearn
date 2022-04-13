import React from 'react';
import { useAuth, validStuAccount, validRepAccount } from '../../firebase-config';
import './css/account.css';
import { Button } from '../Button';
import { useState } from 'react';
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


//   Axios.get("http://localhost:3001/studentUserInfo", {email: email,
//  }).then((response) => {
//       setStudentInfo(response.data);
//   });


if(validStuAccount(email)){
    Axios.post("http://localhost:3001/studentUserInfo", {
        email: email,  
    }).then((response) => {
      setFname(response.data[0].StudentFName);
      setLname(response.data[0].StudentLName);
      setUsername(response.data[0].StudentUsername);
      setId(response.data[0].StudentID);
      setGradDate(response.data[0].GradDate);
    });
};

if(validRepAccount){
  Axios.post("http://localhost:3001/repUserInfo", {
      email: email,  
  }).then((response) => {
    setFname(response.data[0].StudentFName);
    setLname(response.data[0].StudentLName);
    setUsername(response.data[0].StudentUsername);
    setId(response.data[0].StudentID);
  });
};

  return (
    <div className='container'>
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
            <h3>Student ID: {id} </h3>
            <h3>Username: {username} </h3>
            {validStuAccount(email) ? (<h3>Anticipated Graduation Date: {Moment(new Date(gradDate)).format("DD/MM/YYYY")} </h3>) :
            (<></>)
            }
            
            <Button className='btn'>Edit</Button>
          </div>
        </div>  
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