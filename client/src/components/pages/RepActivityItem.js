import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react'
import Axios from "axios";
import Moment from 'moment';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, getMetadata } from "firebase/storage";
import { storage } from '../../firebase-config';

const ActivityItem = () => {
    const {activityID} = useParams();
    const id = parseInt(activityID);
    const [activity, setActivity] = useState([]);
    const [statusId, setStatusId] = useState("");
    const [fileUrls, setFileUrls] = useState([]);
    let navigate = useNavigate();
    const filesListRef = ref(storage, `${id}/doc/`);


    Axios.post("https://exp-learn-log.herokuapp.com/repactivity", {
        id: id,  
      }).then((response) => {
      setActivity(response.data);
    });

  const [statusList, setStatusList] = useState([]);
  
  Axios.get("https://exp-learn-log.herokuapp.com/limitedStatus").then((response) => {
      setStatusList(response.data);
  });

  const approve = (id, status) => {
    Axios.put("https://exp-learn-log.herokuapp.com/approve", {id:id, status:status}).then((response)=>{
      alert('Approval Updated');
      navigate('/repactivities');
    });
  };

  const reject = (id) => {
    Axios.put("https://exp-learn-log.herokuapp.com/reject", {id:id}).then((response)=>{
      alert("Activity Rejected");
      navigate('/repactivities'); 
    });
  };

  const updateStatus = (id, status) => {
    Axios.put("https://exp-learn-log.herokuapp.com/updateStatus", {id:id, status:status}).then((response)=>{
      alert("Approval Reversed");
      navigate('/repactivities');
    });
  };

  const reverseReject = (id) => {
    Axios.put("https://exp-learn-log.herokuapp.com/reverseReject", {id:id, status: statusId}).then((response)=>{
      alert("Rejection Reversed");
      navigate('/repactivities');
    });
  };

  useEffect(() => {
    listAll(filesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((downloadURL) => {
          setFileUrls((prev) => [...prev, downloadURL]);
        });
      });
    });
  }, []);


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
              <div className='files'>
                <TableContainer component={Paper} style={{width:"80vw", marginLeft:"10vw", marginRight:"10vw", marginTop:"5vh"}}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Documentation</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {fileUrls.map((url) => (
                      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                      <TableCell align="center">
                        <a href={url} target="_blank">Document</a>  
                      </TableCell>
                    </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
              {val.Status === ("Initially Pending") && val.Status !== "Rejected"
                      ? [<Button onClick ={()=> {approve(val.ActivityID, val.ApprovalID)}}> Approve</Button>,
                        <Button onClick ={()=> {reject(val.ActivityID)}}> Reject</Button>]
                      : (<></>)
                      }
                      {val.Status === ("Pending") && val.Status !== "Rejected"
                      ? [<Button onClick ={()=> {approve(val.ActivityID, val.ApprovalID)}}> Approve</Button>,
                        <Button onClick ={()=> {reject(val.ActivityID)}}> Reject</Button>,
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