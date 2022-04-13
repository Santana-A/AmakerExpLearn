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
import { useAuth, validRepAccount, validStuAccount } from './firebase-config';
import Axios from "axios";
import { useState, useEffect } from 'react';

function App() {
  const currentUser = useAuth();
  const [newAccount, setNewAccount] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  console.log("this is the const email: " + email);


  console.log(newAccount); 

  

  useEffect(() => {
    Axios.post("http://localhost:3001/checkStudentUser", {
          email: email,     
      }).then((response) => {
          if (response.data.message === "New"){
            setNewAccount(true);
          }
          else {
            setNewAccount(false);
          }
    });
}, [])


  return (
    <>
    <Router>
       <Navbar />
    <Switch>
      <Route path="/" exact element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/login" element={currentUser ? <Navigate to='/profile' /> : <Login/>} />
      <Route path="/account" element={currentUser ? <Account/> : <Navigate to='/login' />} />
      <Route path="/log" element={currentUser && !validRepAccount(currentUser.email) ? <Log/> : <Navigate to='/login' />} />
      <Route path="/activities" element={currentUser ? <Activities/> : <Navigate to='/login' />} />
      <Route path="/repactivities" element={currentUser ? <RepActivities/> : <Navigate to='/login' />} />
      <Route path="/activityItem/:activityID" element={<ActivityItem/>} />
      <Route path="/repActivityItem/:activityID" element={<RepActivityItem/>} />
      <Route path="/profile" element={currentUser && newAccount ? <Profile/> : <Navigate to='/' />} />
      {/* element={currentUser ? <Profile/> : <Navigate to='/' />}  */}
    </Switch>
  </Router>
  </>
  );
}

export default App;
