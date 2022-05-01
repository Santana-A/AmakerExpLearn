import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react'
import Axios from "axios";
import Moment from 'moment';
import { Button } from '../Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, getMetadata } from "firebase/storage";
import { storage } from '../../firebase-config';

const ActivityItem = () => {
    const {activityID} = useParams();
    const id = parseInt(activityID);
    //console.log(parseInt(activityID));
    const [activity, setActivity] = useState([]);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [fileUrls, setFileUrls] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const urls = [];
    const filesListRef = ref(storage, `${id}/doc/`);

    Axios.post("https://exp-learn-log.herokuapp.com/activity", {
        id: id,  
      }).then((response) => {
      setActivity(response.data);
    });

    const formHandler = (e) => {
      e.preventDefault();
      const file = e.target[0].files[0];
      uploadFiles(file);
      //console.log(file);
    };
    
    const uploadFiles = (file) => {
      //
      if (!file) return;
      const storageRef = ref(storage, `${id}/doc/${file.name}`);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
    
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setFileUrls((prev) => [...prev, downloadURL]);  
          });
        }
      );
    };

    useEffect(() => {
      listAll(filesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((downloadURL) => {
            setFileNames((prevName) => [...prevName, item.name]);
            setFileUrls((prev) => [...prev, downloadURL]);
          });
        });
      });
    }, []);


  return (
    <div>
        {activity.map((val) => (
              <div className='activityItemWrap' key={val.ActivityID}> 
              <h1>{val.ActivityName}</h1>
              <p className='activityDesc'>Description: {val.Description}</p>
              <h3>Location: {val.Country}, {val.State}, {val.City}</h3>
              <h3>Sponsor: {val.Sponsor}</h3>
              <h3>Duration: {Moment(new Date(val.StartDate)).format("MM/DD/YYYY")} - {Moment(new Date(val.EndDate)).format("MM/DD/YYYY")}</h3>
             
              <br></br>
            <br></br>
            <br></br>
            <br></br>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

              <div id="upload" className='fileUpload'
                     style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                      }}>
                       <form onSubmit={formHandler}>
                         <input type="file" className='input' />
                         <button type='submit'>Upload</button>
                       </form>
                       <h3>Uploaded {progress} %</h3>
                       <br></br>   
              </div>
              </div>
              ))}
  
              <div className='files'>
                <TableContainer component={Paper} style={{width:"80vw", marginLeft:"10vw", marginRight:"10vw", marginTop:"5vh"}}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">File Name</TableCell>
                        <TableCell align="center">View</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {fileNames.map((name) => (
                      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                      <TableCell align="center">{name}</TableCell>
                      {fileUrls.map((url) => (
                      <TableCell align="center">
                        <Button><a href={url} target="_blank">View</a></Button>
                      </TableCell>
                      ))}
                    </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>

    </div>
  )
}

export default ActivityItem