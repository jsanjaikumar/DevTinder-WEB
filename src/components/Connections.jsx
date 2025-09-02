import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
  const connections = useSelector((store)=> store.connection)
  const dispatch = useDispatch()
  console.log(connections)
  const fetchConnections = async () =>{

    try{
      const res = await axios.get(BASE_URL+"/user/connection" , {withCredentials: true})
      dispatch(addConnection(res?.data?.data));
      //console.log(res?.data?.data)
    }catch(err){
      console.error(err.response?.data?.message || err.message);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);


  if(!connections) return;

  if(connections.length === 0) return <h1>No Connections Found</h1>

  return (
    <>
      <div className=" text-center  my-10">   
        <h1 className="text-bold text-3xl text-white">Connections</h1>

        {connections.map((connection, _id) => {
           const {firstName, lastName, about, photoUrl, age, gender}= connection
        return ( 
          <div key={_id} className=" flex bg-base-200 m-4 p-4 rounded-lg  w-1/2 mx-auto">
            <div>
             < img className="w-20 h-20 rounded-full" src={photoUrl} alt="userProfile" />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-2xl'>{firstName + " " + lastName}</h2>
              {age && gender &&<p>{age +", "+ gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
        }
       )}

      </div>
    </>
  );
}

export default Connections