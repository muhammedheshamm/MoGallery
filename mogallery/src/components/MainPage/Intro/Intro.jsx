import React from 'react'
import './Intro.css'
import { useLogin } from '../../../contextProviders/LoginProvider'
import AdminControls from './AdminControls/AdminControls'

export default function Intro({ setOpenUploadForm }) {
  const { isLoggedIn, isAdmin } = useLogin()

  return (
    <div className="intro-wraper">
      <div className='container intro-text'>
        <p className='typed-heading'>
          Welcome, <span>{ isLoggedIn? JSON.parse(localStorage.getItem('user')).username : 'guest' }</span>
          <br />
          To my awesome gallery!
        </p>
        <p className='sub-heading'>
          Take a peek into my world through the lens of my camera and discover moments captured in time.
        </p>
        { isAdmin && <AdminControls
          setOpenUploadForm={setOpenUploadForm} 
        /> }
      </div>
    </div>
  )
}
