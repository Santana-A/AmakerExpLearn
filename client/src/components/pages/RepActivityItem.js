import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react'
import Axios from "axios";
import Moment from 'moment';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ActivityItem = () => {
    const {activityID} = useParams();
    const id = parseInt(activityID);
    const [activity, setActivity] = useState([]);
    const [statusId, setStatusId] = useState("");
    let navigate = useNavigate();

    Axios.post("http://localhost:3001/repactivity", {
        id: id,  
      }).then((response) => {
      setActivity(response.data);
    });

  const [statusList, setStatusList] = useState([]);
  
  Axios.get("http://localhost:3001/limitedStatus").then((response) => {
      setStatusList(response.data);
  });

  const approve = (id, status) => {
    Axios.put("http://localhost:3001/approve", {id:id, status:status}).then((response)=>{
      alert('Approval Updated');
      navigate('/repactivities');
    });
  };

  const reject = (id) => {
    Axios.put("http://localhost:3001/reject", {id:id}).then((response)=>{
      alert("Activity Rejected");
      navigate('/repactivities'); 
    });
  };

  const updateStatus = (id, status) => {
    Axios.put("http://localhost:3001/updateStatus", {id:id, status:status}).then((response)=>{
      alert("Approval Reversed");
      navigate('/repactivities');
    });
  };

  const reverseReject = (id) => {
    Axios.put("http://localhost:3001/reverseReject", {id:id, status: statusId}).then((response)=>{
      alert("Rejection Reversed");
      navigate('/repactivities');
    });
  };


  return (
    <div>
        {activity.map((val) => (
              <div className='activityItemWrap' key={val.ActivityID} style={{justifyContent: 'left', alignItems: 'center'}}> 
              <h1>{val.StudentFName} {val.StudentLName} ID: {val.StudentID}</h1>
              <h2>{val.ActivityName}</h2>
              <p className='activityDesc'>Description: {val.Description}</p>
              <h3>Location: {val.Country}, {val.State}, {val.City}</h3>
              <h3>Sponsor: {val.Sponsor}</h3>
              <h3>Duration: {Moment(new Date(val.StartDate)).format("MM/DD/YYYY")} - {Moment(new Date(val.EndDate)).format("MM/DD/YYYY")}</h3>
              {val.Status === ("Initially Pending") && val.Status !== "Rejected"
                      ? [<Button onClick ={()=> {approve(val.ActivityID, val.ApprovalID)}}> Approve</Button>,
                        <Button onClick ={()=> {reject(val.ActivityID)}}> Reject</Button>]
                      : (<></>)
                      }
                      {val.Status === ("Pending") && val.Status !== "Rejected"
                      ? [<Button onClick ={()=> {approve(val.ActivityID, val.ApprovalID)}}> Approve</Button>,
                        <Button onClick ={()=> {reject(val.ActivityID)}}> Reject</Button>,
                        <Button>View Documentation</Button>
                      ]

                      : (<></>)
                      }

                      {val.Status === ("Initially Approved" || "Approved")
                      ? <Button onClick ={()=> {updateStatus(val.ActivityID, val.ApprovalID)}}> Reverse Approval</Button>
                        
                      : (<></>)
                      }

                      {val.Status === "Rejected"
                      ?[<select onChange={(event) => {setStatusId(event.target.value)}}>
                      <option style= {{display:"none"}}>-- Select Status --</option>
                      {statusList.map((val) => { return <option value={val.ApprovalID}>{val.Status}</option>})}
                      </select>,
                      <Button onClick ={()=> {reverseReject(val.ActivityID)}}> Reverse Rejection</Button>]
                      : (<></>)
                      }
            </div>
        ))}
    </div>
  )
}

export default ActivityItem