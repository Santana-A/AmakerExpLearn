import React from 'react';
import './css/activities.css';
import Moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import Axios from "axios";
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Popup from '../Popup';
import { storage } from '../../firebase-config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { HashLink } from 'react-router-hash-link';

const Activity = ({activity: {
  ActivityID, 
  ActivityName, 
  Description, 
  Country, State, 
  City, 
  Sponsor, 
  StartDate, 
  EndDate, 
  Status}}) => {

let navigate = useNavigate();
const [buttonPopup, setButtonPopup] = useState(false);
const [progress, setProgress] = useState(0);
const [url, setUrl] = useState("");

const deleteActivity = (id) => {
  Axios.delete(`https://exp-learn-log.herokuapp.com/deleteActivity/${id}`).then((response) => {
    alert("activity deleted");
  });
};


  return (
    // <div className='activityWrap'> 
    //   <h1>{ActivityName}</h1>
    //   <p className='status'>{Status}</p>
    //   <p className='activityDesc'>{Description}</p>
    //   {/* <h3>{Moment(new Date(StartDate)).format("MM/DD/YYYY")} - {Moment(new Date(EndDate)).format("MM/DD/YYYY")}</h3> */}
    //   <Link className='activityLink' to={'/activityItem/' + ActivityID}><Button>View</Button></Link>
    // </div>
    <>
        <TableContainer component={Paper} style={{width:"80vw", marginLeft:"10vw", marginRight:"10vw", marginTop:"5vh"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Activity Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell align="center">
              {ActivityName}   
            </TableCell>
            <TableCell align="center">{Status}</TableCell>
            <TableCell align="center">
            <Link className='activityLink' to={'/activityItem/' + ActivityID}><Button>View</Button></Link>
            </TableCell>
            <TableCell align="center">
            <Button onClick={() => { deleteActivity(ActivityID)}}>Delete</Button>
            </TableCell>
            <TableCell align="center">
              <HashLink className='activityLink' to={'/activityItem/' + ActivityID +'#upload'}><Button>Upload</Button></HashLink>
                  {/* <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
                     <div className='fileUpload'
                     style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                      }}>
                       <form onSubmit={formHandler}>
                         <input type="file" className='input' />
                         <button type='submit' >Upload</button>
                       </form>
                       <h3>Uploaded {progress} %</h3>
                       {url !="" ? (<img src={url} />): (<></>)}
                     </div>
                  </Popup> */}
          </TableCell>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Activity