import { useState } from 'react'
import axios from "axios"
import {useDispatch} from "react-redux"
import {addUser} from "../utils/userSlice"
import { useNavigate } from 'react-router-dom'
import {BASE_URL} from "../utils/constants"

const Login = () => {
  const [emailId, setEmailId]= useState("sanjai@gmail.com")
  const [password, setPassword] = useState("Sanjai@123")
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () =>{
    try{
      const res = await axios.post(
        BASE_URL + "/login", {
        emailId,
        password,
      },
      {withCredentials: true} //for backend cookies fetch in frontend express js cors() package to work
    );
    dispatch(addUser(res.data));
    return navigate("/")
  }catch(err){
    setError( err?.response?.data || "Somthing went Wroung")
  }
    
  }

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center ">Login</h2>
            <div>
              <label className="fieldset my-2">
                <legend className="fieldset-legend">Email ID </legend>
                <input
                  type="text"
                  value={emailId}
                  className="input"
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <p className="label"></p>
              </label>
              <label className="fieldset my-2 ">
                <legend className="fieldset-legend">Password </legend>
                <input
                  type="text"
                  value={password}
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="label"></p>
              </label>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions flex justify-center">
              <button
                className="btn btn-primary flex justify-center"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login