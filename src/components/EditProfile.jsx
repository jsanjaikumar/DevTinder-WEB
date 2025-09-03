import React, { useState } from "react";
import UserCards from "./UserCards";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          photoUrl,
          skills,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      {/* Container for both cards */}
      <div className="flex justify-center items-center h-screen gap-8 px-6">
        {/* Edit Profile Card */}
        <div className="card bg-base-300 w-96 h-[90vh] shadow-sm flex flex-col">
          {/* Card Body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <label className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="fieldset">
              <legend className="fieldset-legend">Photo Url</legend>
              <input
                type="text"
                value={photoUrl}
                className="input"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <label className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                value={age}
                className="input"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </label>

            <label className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input h-24 resize-none"
                placeholder="Write something about yourself..."
              />
            </label>

            <label className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                value={skills}
                className="input"
                onChange={(e) => setSkills(e.target.value)}
              />
            </label>

            <p className="text-red-500">{error}</p>
          </div>

          {/* Sticky footer */}
          <div className="card-actions flex justify-center p-4 my-10 border-t bg-base-200 shrink-0">
            <button className="btn btn-primary w-full" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>

        {/* Live Preview Card */}
        <UserCards
          user={{ firstName, lastName, age, about, photoUrl, skills, gender }}
        />
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully Boss</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
