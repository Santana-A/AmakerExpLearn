import React from 'react';
import './css/activities.css';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import Axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const RepActivity = ({activity: {
  ActivityID, 
  ActivityName, 
  Description, 
  Country, State, 
  City, 
  Sponsor, 
  StartDate, 
  EndDate, 
  Status,
  StudentFName,
  StudentLName}}) => {
// const {activityID} = useParams();
// console.log(parseInt(activityID));

// useEffect(() => {
//   Axios.post("http://localhost:3001/activity", {
//     id: id,  
//   }).then((response) => {
//   setActivities(response.data);
// });
//  }, [])

  return (
    // <div className='activityWrap'> 
    //   <h1>{StudentFName} {StudentLName}</h1>
    //   <h1>{ActivityName}</h1>
    //   <p className='status'>{Status}</p>
    //   <p className='activityDesc'>{Description}</p>
    //   {/* <h3>{Moment(new Date(StartDate)).format("MM/DD/YYYY")} - {Moment(new Date(EndDate)).format("MM/DD/YYYY")}</h3> */}
    //   <Link className='activityLink' to={'/repActivityItem/' + ActivityID}><Button>View</Button></Link>
    // </div>
    <>
      <TableContainer component={Paper} style={{width:"80vw", marginLeft:"10vw", marginRight:"10vw", marginTop:"5vh"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell align="center">Student Name</TableCell>
              <TableCell align="center">Activity Name</TableCell>
              <TableCell align="center">ApprovalStatus</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell align="center">
              {StudentFName} {StudentLName}   
            </TableCell>
            <TableCell align="center">
              {ActivityName}   
            </TableCell>
            <TableCell align="center">{Status}</TableCell>
            <TableCell align="center">
            <Link className='activityLink' to={'/repActivityItem/' + ActivityID}><Button>View</Button></Link>
            </TableCell>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RepActivity