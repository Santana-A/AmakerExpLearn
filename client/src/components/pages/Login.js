import React from 'react'
import { signInWithGoogleStudent, signInWithGoogleRep } from '../../firebase-config';
import './css/login.css';


const Login = () => {

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={signInWithGoogleStudent}>
            Student 
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <div className="loginButton facebook" onClick={signInWithGoogleRep}>
            Representative
          </div>
        </div>
      </div>
    </div>
    // <div className="login">
    //   <h1 className="loginTitle">Choose a Login Method</h1>
    //   <div className="wrapper">
    //     <div className="left">
    //       <div className="loginButton student" onClick={signInWithGoogleStudent}>
    //         {/* <img src={Google} alt="" className="icon" /> */}
    //         Student Users 
    //       </div>
    //     </div>
    //     <div className="center">
    //       <div className="line" />
    //       <div className="or">OR</div>
    //     </div>
    //     <div className="right">
    //       <div className="loginButton rep" onClick={signInWithGoogleRep}>
    //         {/* <img src={Google} alt="" className="icon" /> */}
    //         Department Users
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Login