import React from 'react'
import './Navbar.css'
import tun from '../res/tun.png'
import logo from '../res/logo.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate() 
  const goHome = ()=> {
    navigate('/')
  }
  return (
    <div className='Navbar'>
    <button>اطلب الآن</button>
    <ul>
      <li>اتصل بنا</li>
      <li >حول الهوية الرقمية</li>
      <li onClick={goHome}>الصفحة الرئيسية</li>
    </ul>
    <div>
      <img src={tun} />
      <img src={logo} style={{maxHeight:'3rem'}}/>
    </div>
    </div>
  )
}

export default Navbar