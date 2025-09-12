import React, { useEffect } from 'react'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import UserCards from './UserCards'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  console.log(feed)

  const fetchFeed = async () => {
    if (feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // If backend returns { users: [...] }
      dispatch(addFeed(res.data.users));

      // If backend already returns an array
      // dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(()=>{
    fetchFeed()
  }, [])

  if(!feed) return;

  if (feed.length <= 0) {
    return (
      <h1 className="flex justify-center items-center">
        Your Running out of Users
      </h1>
    );
  }


  return (

  feed && (
    <div className='flex justify-center items-center my-5'>
      <UserCards user={feed[0]}/>
    </div>
    )

  )
}

export default Feed