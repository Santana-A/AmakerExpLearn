import React from 'react'
import { useAuth } from '../../firebase-config';
import { useState, useEffect } from 'react'
import Axios from "axios";
import Activity from './Activity';
import './css/activities.css';
import Moment from 'moment';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

const Activities = () => {

  const currentUser = useAuth();

  const [activities, setActivities] = useState([]);
  const [id, setId] = useState("");
  const email = localStorage.getItem('email');
  const [activityID, setActivityID] = useState("");

  // if(currentUser){
  //   Axios.post("http://localhost:3001/studentUserInfo", {
  //       email: email,  
  //   }).then((response) => {
  //     setId(response.data[0].StudentID);
  //   });
  // };

  useEffect(() => {
    Axios.post("https://exp-learn-log.herokuapp.com/studentUserInfo", {
        email: email,  
    }).then((response) => {
      setId(response.data[0].StudentID);
      console.log("ID: " + id);
    });
}, [])


  // useEffect(() => {
      Axios.post("https://exp-learn-log.herokuapp.com/activities", {
        id: id,  
      }).then((response) => {
      setActivities(response.data);
    });
  // }, [])

  //  useEffect(() => {
  //     Axios.post("http://localhost:3001/activities", {
  //       id: id,  
  //     }).then((response) => {
  //       setActivityName(response.data[0].ActivityName);
  //       setActivityID(response.data[0].ActivityID);
  //       setDesc(response.data[0].Description);
  //       setCountry(response.data[0].Country);
  //       setState(response.data[0].State);
  //       setCity(response.data[0].City);
  //       setSponsor(response.data[0].Sponsor);
  //       setStart(response.data[0].StartDate);
  //       setEnd(response.data[0].EndDate);
  //       setApprovalID(response.data[0].ApprovalID);
  //   });
  // }, [])

  
  return (
    <div className='activitiesWrap'>
        {/* {activities.map((val,key) => { return <h1>{val.ActivityName}</h1>})}       */}
        {activities.map((activity) => (<Activity activity={activity} key={activity.ActivityID} />))}      
        {/* {activities.map((val) => (
              <div className='activityWrap' key={val.ActivityID}> 
              <h1>{val.ActivityName}</h1>
              <p className='status'>{val.Status}</p>
              <p className='activityDesc'>{val.Description}</p>
              <h3>{val.Country}, {val.State}, {val.City}</h3>
              <h3>{val.Sponsor}</h3>
              <h3>{Moment(new Date(val.StartDate)).format("MM/DD/YYYY")} - {Moment(new Date(val.EndDate)).format("MM/DD/YYYY")}</h3>
              <Link className='activityLink' to={'/activity/'}><Button>View</Button></Link>
            </div>
        ))} */}
    </div>
  )
}

export default Activities