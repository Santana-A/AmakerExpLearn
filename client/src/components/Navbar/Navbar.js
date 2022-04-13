import React, {useState} from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
//import GoogleButton from 'react-google-button';
import { logOut, useAuth, validRepAccount } from '../../firebase-config';



function Navbar() {
  const [click, setClick] = useState(false);
  const currentUser = useAuth();
  
  async function handleLogout  () {
    try {
      await logOut();
    } catch(err) {
      console.log(err);
    } 
  }

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className='navbar'>
        <div className='navContainer'>
          <NavLink exact to='/' className='navLogo'>
            Computer & Information Science 
          </NavLink>
          {currentUser ? (
            <ul className={click ? 'navMenu active': 'navMenu'}>
            <li className='navItem'>
              {/* <NavLink exact to='/' activeClassName='active' className='navLinks' onClick={handleClick}> */}
              <NavLink exact to='/' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className='navItem'>
              <NavLink exact to='/about' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                About
              </NavLink>
            </li>
            {validRepAccount(currentUser.email) ? (
              <li className='navItem'>
              <NavLink exact to='/repactivities' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                Activities
              </NavLink>
            </li>) : (
            <li className='navItem'>
              <NavLink exact to='/activities' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                Activities
              </NavLink>
            </li>)}
            {validRepAccount(currentUser.email) ? (<></>) : (
            <li className='navItem'>
              <NavLink exact to='/log' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                Log
              </NavLink>
            </li>)}
            <li className='navItem'>
              <NavLink exact to='/account' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                Account
              </NavLink>
            </li>
            <li >
              <NavLink exact to='/login' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                {/* <button><img src={google} alt='' className='icon' /></button> */}
                <button className='navBtn' onClick={handleLogout}>Logout</button>
              </NavLink>
            </li>
          </ul>
          ) : (
            <ul className={click ? 'navMenu active': 'navMenu'}>
            <li className='navItem'>
              <NavLink exact to='/' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className='navItem'>
              <NavLink exact to='/about' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                About
              </NavLink>
            </li>
            <li >
              <NavLink exact to='/login' className={({ isActive }) => isActive? "active": 'navLinks'} onClick={handleClick}>
                {/* <GoogleButton className="g-btn" type="dark" onClick={signInWithGoogle} /> */}
                <button className='navBtn'>Login</button>
              </NavLink>
            </li>
          </ul>
          ) }
          <div className='navIcon' onClick={handleClick}>
          <i className={click ? 'fas fa-times': 'fas fa-bars'}></i>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar