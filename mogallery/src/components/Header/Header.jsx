import './Header.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa"
import { FiLogOut, FiLogIn, FiInfo } from 'react-icons/fi'
import { useLogin } from '../../contextProviders/LoginProvider'
import { AiOutlineHome } from 'react-icons/ai'
import { BsBookmarkCheck } from 'react-icons/bs'


export default function Header() {
  const { isLoggedIn, logout } = useLogin()
  const [clicked , setClicked] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const openMenu = () => {
    setClicked( (c) => !c )
  }

  window.onscroll= () => {
    //detect if the user has scrolled down
    if(window.pageYOffset > 70){
      setScrolled(true)
    }
    else{
      setScrolled(false)
    }
  }

  if(clicked)
    document.querySelector('body').style.overflow='hidden'
  else
    document.querySelector('body').style.overflow='auto'

  return (
    <header className = { scrolled ? 'header scrolled-header' : 'header' } >
      <div className='header-container container'>
        <div className='flex-cont'>

          <Link className='logo' to='/'><span>Mo</span>Gallery</Link>
          <ul className='refs' style={clicked? {display:'flex', left:0}:{}}>
            <li><Link to="/" onClick={()=>setClicked(false)}> <AiOutlineHome className='ref-icons' /> Home</Link></li>
            {/* <li><Link to="/about" onClick={()=>setClicked(false)}> <FiInfo className='ref-icons' /> About</Link></li> */}
            { !isLoggedIn && <li><Link to="/login" onClick={()=>setClicked(false)}> <FiLogIn className='ref-icons' /> Login</Link></li> }
            {  isLoggedIn && <li><Link to="/saved" onClick={()=>setClicked(false)}> <BsBookmarkCheck className='ref-icons' /> Saved</Link></li> }
          </ul>

        </div>
        { !isLoggedIn && <Link to="/signup" className='login'>Join</Link> }
        <FaBars className='bars-icon' onClick={openMenu} />
        { isLoggedIn && <span onClick={logout} className='logout-b' > <FiLogOut /> </span> }
      </div>
    </header>
  )
}
