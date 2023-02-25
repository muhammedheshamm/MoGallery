import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Entry.css'
import { Link } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom';
import { useLogin } from '../../contextProviders/LoginProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiUser, BiLockAlt } from 'react-icons/bi' 


export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoggedIn } = useLogin()

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
      const { data } = await axios.post('http://localhost:4000/users/login', { username, password });
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        success(data.message);
        setTimeout(() => {
          login()
          navigate('/')
        }, 5000);
      } else {
        error(data.message);
      }
    } catch (err) {
      error('An error occurred while logging in');
      console.log(err);
    }
  };
  

  return isLoggedIn? <Navigate to='/' /> :
  (
    <div className='login-cont'>
      <div className='my-form'>
        <h1>login</h1>
        <form onSubmit={submitForm} >
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
              value={password} onChange={ e => setPassword(e.target.value)}
            />
            <BiLockAlt className='entry-icon' />
          </div>

          <button type="submit">Log in</button>
          <span className='my-link'>Don't have an account? <Link to="/signup">Sign up now!</Link></span>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
