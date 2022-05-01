import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes as Switch, Route, Navigate} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Account from './components/pages/Account';
import Log from './components/pages/Log';
import Activities from './components/pages/Activities';
import Profile from './components/pages/Profile';
import Activity from './components/pages/Activity';
import ActivityItem from './components/pages/ActivityItem';
import RepActivityItem from './components/pages/RepActivityItem';
import RepActivities from './components/pages/RepActivities';
import { useAuth, userExists, validRepAccount, validStuAccount } from './firebase-config';
import Axios from "axios";
import { useState, useEffect } from 'react';

function App() {
  const currentUser = useAuth();
  const [newStudentAccount, setNewStudentAccount] = useState(false);
  const [newRepAccount, setNewRepAccount] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  console.log("this is the const email: " + email);


  

  
  // const newUser = userExists();
  // console.log("this user exists: " + newUser);

  useEffect(() => {
    Axios.post("https://exp-learn-log.herokuapp.com/checkStudentUser", {
          email: email,     
      }).then((response) => {
          if (response.data.message === "New"){
            setNewStudentAccount(true);
          }
          else {
            setNewStudentAccount(false);
          }
    });
}, [])

useEffect(() => {
  Axios.post("https://exp-learn-log.herokuapp.com/checkRepUser", {
        email: email,     
    }).then((response) => {
        if (response.data.message === "New"){
          setNewRepAccount(true);
        }
        else {
          setNewRepAccount(false);
        }
  });
}, [])

console.log("This is a new Student account" + newStudentAccount); 
console.log("This is a new Rep account" + newRepAccount); 
  return (
    <>
    <Router>
       <Navbar />
    <Switch>
      
      <Route path="/" exact element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/login" element={currentUser ? <Navigate to='/' /> : <Login/>} />
      <Route path="/account" element={!currentUser ? <Navigate to='/login' /> : <>{(!newStudentAccount || !newRepAccount)  ? <Account/> : <Navigate to='/profile' />} </>} />
      <Route path="/log" element={!currentUser ? <Navigate to='/login' /> : <>{!validRepAccount(currentUser.email) && !newStudentAccount ? <Log/> : <Navigate to='/profile' />} </>} />
      <Route path="/activities" element={!currentUser ? <Navigate to='/login' /> : <>{!validRepAccount(currentUser.email) && !newStudentAccount ? <Activities/> : <Navigate to='/profile' />} </>} />
      <Route path="/activityItem/:activityID" element={!currentUser ? <Navigate to='/login' /> : <>{!validRepAccount(currentUser.email) && !newStudentAccount ? <ActivityItem/> : <Navigate to='/profile' />} </>} />
      <Route path="/repactivities" element={!currentUser ? <Navigate to='/login' /> : <>{validRepAccount(currentUser.email) && !newRepAccount ? <RepActivities/> : <Navigate to='/profile' />} </>} />
      <Route path="/repActivityItem/:activityID" element={!currentUser ? <Navigate to='/login' /> : <>{validRepAccount(currentUser.email) && !newRepAccount ? <RepActivityItem/> : <Navigate to='/profile' />} </>} />
      <Route path="/profile" element={currentUser && ((validRepAccount(currentUser.email) && newRepAccount) || (validStuAccount(currentUser.email) && newStudentAccount))  ? <Profile/> : <Navigate to='/' />} />
      {/* element={currentUser ? <Profile/> : <Navigate to='/' />}  */}
    </Switch>
  </Router>
  </>
  );
}

export default App;
