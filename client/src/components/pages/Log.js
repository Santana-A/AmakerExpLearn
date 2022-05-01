import React from 'react'
import './css/log.css'
import { Button } from '../Button'
import { useState, useEffect } from 'react'
import Axios from "axios";
import { useAuth } from '../../firebase-config';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';

export const Log = () => {
    const currentUser = useAuth();

    //use state to store input data
    const [activityname, setName] = useState("");
    const [description, setDes] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [studentid, setStudentId] = useState("");
    const [activitytype, setType] = useState("");
    const [classification, setclassification] = useState("");
    const [approvalstatus, setStatus] = useState("1");
    const email = localStorage.getItem('email');


    // if(currentUser){
    //     Axios.post("http://localhost:3001/studentUserInfo", {
    //         email: email,  
    //     }).then((response) => {
    //       setId(response.data[0].StudentID);
    //       console.log("ID: " + id);
    //     });
    // };

    useEffect(() => {
        Axios.post("https://exp-learn-log.herokuapp.com/studentUserInfo", {
            email: email,  
        }).then((response) => {
          setStudentId(response.data[0].StudentID);
          console.log("ID: " + studentid);
        });
    }, [])

    //retrieve database data to dynamically populate select dropdown
    const [typeList, setTypeList] = useState([]);
    const [classList, setClassList] = useState([]);

    

    useEffect(() => {
        Axios.get("https://exp-learn-log.herokuapp.com/types").then((response) => {
        setTypeList(response.data);
        });
    }, [])

    useEffect(() => {
        Axios.get("https://exp-learn-log.herokuapp.com/classes").then((response) => {
        setClassList(response.data);
        });
    }, [])
    


    //Add input data in database 
    const addActivity = () => {
        Axios.post("https://exp-learn-log.herokuapp.com/addActivity", {
            activityname: activityname, 
            description: description,
            country: country,
            state: state,
            city: city,
            sponsor: sponsor,
            start: start,
            end: end,
            studentid: studentid,
            activitytype: activitytype,
            approvalstatus: approvalstatus,
            classification: classification,
        }).then(() => {
            console.log("Success")
            alert("Activity Added");
            window.location.reload(false);
        });
    };

    return (
        <div className="Create">
            <div className="StudentInfo">
                
                <h1>Activity Information</h1>
                <label>Activity Title:</label>
                <input type="text" onChange={(event) => {setName(event.target.value)}} />

                <label>Activity Type:</label>
                <select onChange={(event) => {setType(event.target.value)}}>
                    <option style= {{display:"none"}}>-- Select an activity type --</option>
                    {typeList.map((val,key) => { return <option value={val.TypeID}>{val.TypeName}</option>})}
                </select>

                <label>Current Classification:</label>
                <select onChange={(event) => {setclassification(event.target.value)}}>
                    <option style= {{display:"none"}}>-- Select a classification--</option>
                    {classList.map((val,key) => { return <option value={val.ClassID}>{val.Class}</option>})}
                </select>


                <label>Description:</label>

                <textarea  onChange={(event) => {setDes(event.target.value)}} />

                
                <label>Country:</label>
                <input type="text" onChange={(event) => {setCountry(event.target.value)}} />

                <label>State:</label>
                <input type="text" onChange={(event) => {setState(event.target.value)}} />

                <label>City:</label>
                <input type="text" onChange={(event) => {setCity(event.target.value)}} />

                <label>Sponsor:</label>
                <input type="text" onChange={(event) => {setSponsor(event.target.value)}} />

                <label>Start Date:</label>
                <input type="date" onChange={(event) => {setStart(event.target.value)}} />

                <label>End Date:</label>
                <input type="date" onChange={(event) => {setEnd(event.target.value)}} />

                <Button onClick={addActivity}>Add Activity</Button>
            </div>
        </div>
    )
}

export default Log