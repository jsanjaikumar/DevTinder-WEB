import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
import {BASE_URL} from '../utils/constants'
const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector((store)=> store.request)

  const reviewRequest = async (status,_id)=>{
    try{
      const res = axios.post(BASE_URL + "/request/review/"+ status + "/"+ _id, {} , {withCredentials:true});
      dispatch(removeRequest(_id))
    }catch(err){
      console.error(err.response.message)
    }
  }


  const fetchRequest = async()=>{
    try{
      const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials:true});
      console.log(res.data.data)
      dispatch(addRequest(res?.data?.data))
    }catch(err){
      console.error(err.response.message)
    }
  }

   useEffect(() => {
     fetchRequest();
   },[]);


if(!requests) return;

if (requests.length === 0) return <h1 className='flex justify-center m-10'>No Connection Requests Found</h1>;

  return (
    <>
      <div className=" text-center  my-10">
        <h1 className="text-bold text-3xl text-white">Connections Requests</h1>

        {requests.map((request, _id) => {
          const { firstName, lastName, about, photoUrl, age, gender } = request.fromUserId;
          return (
            <div
              key={_id}
              className=" flex justify-between items-center bg-base-200 m-4 p-4 rounded-lg  w-2/3 mx-auto"
            >
              <div>
                <img
                  className="w-20 h-20 rounded-full"
                  src={photoUrl}
                  alt="userProfile"
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-2xl">
                  {firstName + " " + lastName}
                </h2>
                {/* {age && gender && <p>{age + ", " + gender}</p>} */}
                <p>{about}</p>
              </div>
              <div className='flex flex-col'>
                <button
                  className="btn btn-primary mx-2  flex-col"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2 my-2 flex-col"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Requests