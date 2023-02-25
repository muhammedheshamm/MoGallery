import React from 'react'
import './ConfirmDeleting.css'


export default function ConfirmDeleting(props) {

  const { setOpenConfirmDeleting, deletePhoto} = props
  return (
    <div className='confirm-deleting-wraper'>
      <div className='confirm-deleting'>
        <span>Are you sure?</span>
        <div className='btns'>
          <button onClick={ () => setOpenConfirmDeleting(false) }>No</button>
          <button onClick={deletePhoto} >Yes</button>
        </div>
      </div>
    </div>
  )
}
