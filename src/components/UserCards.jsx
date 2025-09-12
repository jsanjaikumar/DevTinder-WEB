import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCards = ({ user }) => {
  console.log(user);
  const { _id, firstName, lastName, age, about, photoUrl, skills, gender } =
    user || {};

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      console.log(res.data);
    } catch (err) {
      console.error({ message: err.message });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen mb-5">
        <div className="card bg-base-300 w-96 max-h-[90vh] shadow-sm overflow-y-auto">
          <figure>
            <img
              src={photoUrl}
              alt="user Image"
              className="h-60 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
            {skills && <p>{skills}</p>}

            <div className="card-actions justify-center my-4">
              <button
                className="btn btn-primary mx-4"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary mx-4"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCards;
