import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useAuth, userExists, validRepAccount, validStuAccount } from './firebase-config';

function ProtectedRoute({isAuth: isAuth, component: Component, ...rest}) {
  return (
    <Route {...rest} render ={(props) => {
        if(isAuth){
            return <Component />
        }
        else{
            return(<Redirect to={{pathname: "/login", state: {from:props.location}}} />)
        }
    }} />
  )
}

export default ProtectedRoute