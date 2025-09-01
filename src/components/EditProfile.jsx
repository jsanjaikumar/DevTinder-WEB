import React, { useState } from 'react'
import UserCards from './UserCards';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const EditProfile = ({user}) => {

    

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [about, setAbout] = useState(user?.about || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [skills, setSkills] = useState(user?.skills || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [toast, setToast] = useState(false)
   

    
    const [error, setError] = useState("")
    const  dispatch = useDispatch()


    const saveProfile = async () => {

    //clear the red error after fix the error 
    setError("")
      try {
        const res = await axios.patch(
          BASE_URL + "/profile/edit" ,
          { firstName,
            lastName,
            age, 
            about,
            photoUrl,
            skills,
            gender },

          { withCredentials: true }
        );
        dispatch(addUser(res?.data?.data)) 
        setToast(true)
        setTimeout(() => {
          setToast(false);
        }, 3000);

      } catch (err) {
        setError(err.response.data)
      }
    };

  return (
    <>
      <div className=" flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center ">Login</h2>
              <div>
                <label className="fieldset my-2">
                  <legend className="fieldset-legend"> FirstName</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <p className="label"></p>
                </label>
                <label className="fieldset my-2 ">
                  <legend className="fieldset-legend">LastName </legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <p className="label"></p>
                </label>

                <label className="fieldset my-2">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    value={age}
                    className="input"
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <p className="label"></p>
                </label>

                <label className="fieldset my-2">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">male</option>
                    <option value="Female">female</option>
                    <option value="Others">others</option>
                  </select>
                  <p className="label"></p>
                </label>

                <label className="fieldset my-2">
                  <legend className="fieldset-legend">Photo Url </legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                  <p className="label"></p>
                </label>

                <label className="fieldset my-2">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input h-24 resize-none"
                    placeholder="Write something about yourself..."
                  />
                  <p className="label"></p>
                </label>

                <label className="fieldset my-2 ">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    value={skills}
                    className="input"
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <p className="label"></p>
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions flex justify-center">
                <button
                  className="btn btn-primary flex justify-center"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCards
          user={{ firstName, lastName, age, about, photoUrl, skills, gender }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully Boss</span>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile