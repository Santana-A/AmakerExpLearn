import React from 'react'
import { useAuth } from '../../firebase-config';
import { useState, useEffect } from 'react'
import Axios from "axios";
import RepActivity from './RepActivity';
import './css/activities.css';
import Moment from 'moment';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

const RepActivities = () => {

  const currentUser = useAuth();

  const [activities, setActivities] = useState([]);
  const [id, setId] = useState("");
  const email = localStorage.getItem('email');
  const [activityID, setActivityID] = useState("");

    Axios.get("https://exp-learn-log.herokuapp.com/repactivities").then((response) => {
      setActivities(response.data);
    });


  
  return (
    <div className='activitiesWrap'>
        {activities.map((activity) => (<RepActivity activity={activity} key={activity.ActivityID} />))}      
    </div>
  )
}

export default RepActivities