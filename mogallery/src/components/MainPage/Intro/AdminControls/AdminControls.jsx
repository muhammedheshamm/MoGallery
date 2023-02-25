import React from 'react'
import './AdminControls.css'
import { HiOutlinePlus } from 'react-icons/hi'

export default function AdminControls(props) {
  return (
    <div className='controls'>
      <span className='add' onClick={ () => props.setOpenUploadForm(true) }>
        <HiOutlinePlus className='upload-icon' />
      </span>
    </div>
  )
}
