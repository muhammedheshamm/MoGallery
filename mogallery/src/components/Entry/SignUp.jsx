import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Entry.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiUser, BiLockAlt } from 'react-icons/bi' 
const { useLogin } = require('../../contextProviders/LoginProvider')



export default function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { isLoggedIn } = useLogin()

  const success = (msg) => {
    toast.success( msg , {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      className: "toast"
      });
  }

  const error = (msg) => {
    toast.error(msg , {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    if(!username) {
      error('Username is required');
      return;
    }
    if(!password) {
      error('Password is required');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:4000/users/register', { username, password, isAdmin: false });

      if (data.success) {
        success(data.message)
        setTimeout(() => {
          navigate('/login')
        }, 5000)
      } else {
        error(data.message)
      }
    } catch (err) {
      error('An error occurred while registering');
      console.log(err);
    }
  }

  return isLoggedIn? <Navigate to='/' /> :
  (
    <div className='login-cont'>
      <div className='my-form'>
        <h1>register</h1>
        <form onSubmit={submitForm}>
        <div className='entry-input-wraper'>
          <input
            type="text" 
            name="username" 
            placeholder='Username' 
            value={username} 
            onChange={ e => setUsername(e.target.value) } 
            autoComplete='off' 
          />
          <BiUser className='entry-icon' />
        </div>

        <div className='entry-input-wraper'>
          <input 
            type="password" 
            name="password" 
            placeholder='Password' 
            value={password} 
            onChange={ e => setPassword(e.target.value)}
          />
          <BiLockAlt className='entry-icon' />
        </div>

          <button type="submit">Sign up</button>
          <span className='my-link'>Already have an account? <Link to="/login">Sign in</Link></span>
        </form>

      </div>
      <ToastContainer />
    </div>
  )
}
