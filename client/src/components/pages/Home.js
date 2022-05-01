import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react'
import Axios from "axios";

const Home = () => {
  const [activities, setActivities] = useState([]);

  Axios.get("https://exp-learn-log.herokuapp.com/repactivities").then((response) => {
      setActivities(response.data);
    });
  
  return (
    <div>
    <h1 style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>Home</h1>

<div className='files'>
                <TableContainer component={Paper} style={{width:"80vw", marginLeft:"10vw", marginRight:"10vw", marginTop:"5vh"}}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                      <TableCell align="center">Student Name</TableCell>
                      <TableCell align="center">Activity Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {activities.map((activity) => (
                      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                      <TableCell align="center">{activity.StudentFName}</TableCell>
                      <TableCell align="center">{activity.ActivityName}</TableCell>
                    </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
 
    </div>
  )
}

export default Home