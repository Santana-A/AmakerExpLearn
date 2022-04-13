import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react'
import Axios from "axios";
import Moment from 'moment';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

const ActivityItem = () => {
    const {activityID} = useParams();
    const id = parseInt(activityID);
    console.log(parseInt(activityID));
    const [activity, setActivity] = useState([]);

    Axios.post("http://localhost:3001/activity", {
        id: id,  
      }).then((response) => {
      setActivity(response.data);
    });

  return (
    <div>
        {activity.map((val) => (
              <div className='activityItemWrap' key={val.ActivityID}> 
              <h1>{val.ActivityName}</h1>
              <p className='activityDesc'>Description: {val.Description}</p>
              <h3>Location: {val.Country}, {val.State}, {val.City}</h3>
              <h3>Sponsor: {val.Sponsor}</h3>
              <h3>Duration: {Moment(new Date(val.StartDate)).format("MM/DD/YYYY")} - {Moment(new Date(val.EndDate)).format("MM/DD/YYYY")}</h3>
              {/* <Link className='activityLink' to={'/activity/'}><Button>Edit</Button></Link> */}
            </div>
        ))}
    </div>
  )
}

export default ActivityItem