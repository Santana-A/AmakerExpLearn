import React from 'react'
import {Route, Redirect} from 'react-router-dom';

function ProtectedUser({isAuth: isAuth, component: Component, ...rest}) {
  return (
        <Route {...rest} render ={(props) => {
            if(isAuth && !isNewUser){
                return <Component />
            }
            else{
                return(<Redirect to={{pathname: "/login", state: {from:props.location}}} />)
            }
        }} />
      )
    }

export default ProtectedUser