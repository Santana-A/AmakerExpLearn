import React from 'react'
import expLearn from '../img/ExpLearn.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    // <h1 style={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   height: '90vh'
    // }}>About</h1>
    <div className="about">
    <div class="container">
      <div class="row align-items-center my-5">
        <div class="col-lg-7">
          <img
            class="img-fluid rounded mb-4 mb-lg-0"
            src={expLearn}
            alt="infographic"
          />
        </div>
        <div class="col-lg-5">
          <h1 class="font-weight-light">About</h1>
          <p>
          Due to the rapid pace of technological innovation, the needs of the tech industry also change quickly. For this reason, the computer science department wants to encourage the completion of experiential learning activities such as internships, research, community service, and study abroad trips among other things in order to better prepare students for life after graduation. 
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About