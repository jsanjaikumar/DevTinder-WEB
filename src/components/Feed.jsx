import React, { useEffect } from 'react'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import UserCards from './UserCards'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()


  const fetchFeed = async ()=>{
  try{
     if(feed) return;
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true})
      dispatch(addFeed(res.data))
    
     }catch(err){
      //write some error logic
      
     }
  }

  useEffect(()=>{
    fetchFeed()
  }, [])

  console.log("Feed in store:", feed);

  return (

  feed && (
    <div className='flex justify-center items-center my-0'>
      <UserCards user={feed.users[0]}/>
    </div>
    )

  )
}

export default Feed