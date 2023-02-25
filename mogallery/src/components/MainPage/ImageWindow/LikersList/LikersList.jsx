import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import './LikersList.css'
import { HiUserCircle } from 'react-icons/hi'

export default function LikersList(props) {
  const { likers, setOpenLikersList } = props

  const displayedLikers = likers.map((liker, index) => {
    return (
      <span key={index} > <HiUserCircle className='users-icon'/>  {liker}</span>
    )
  })

  const closeWindow = (e) => {
    if(e.target.classList.contains('likers-wraper'))
      setOpenLikersList(false)
  }
  
  return (
    <div className='likers-wraper' onClick={closeWindow}>
      <div className='likers'>
        <button onClick={ () => setOpenLikersList(false) } className='cross-holder' >
          <RxCross2 className='likes-cross-icon' />
        </button>
        <span className='title' >Likes</span>
        <div className='users'>
          {displayedLikers}
        </div> 
      </div>

    </div>
  )
}
