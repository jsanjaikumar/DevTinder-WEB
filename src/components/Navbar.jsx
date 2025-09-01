import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios  from 'axios';
import { removeUser } from '../utils/userSlice';  
import { BASE_URL } from '../utils/constants';
import { removeFeed } from '../utils/feedSlice';


const Navbar =  () =>  {
  const user = useSelector((store) => store.user)//this line of code to subscribe to the store and fetch the data based on the datas have like change the profile photo
  const dispatch = useDispatch()
  const navigate = useNavigate()


 const handleLogout = async () =>{
  try {
    await axios.post(BASE_URL + "/logout",{}, {withCredentials : true});
    dispatch(removeUser())
    dispatch(removeFeed())
    return navigate("/login")
  } catch (err) {
    //write error page logic like pop up the error page of redirect to login page
    //console.error(err);
  }
} 


  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className='from-control' >welcome {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className="w-10 rounded-full">
                <img alt="User photo url" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;