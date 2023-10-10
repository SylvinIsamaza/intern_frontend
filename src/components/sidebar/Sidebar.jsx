import React, { useState } from 'react'
import Logo from '../../assets/logo.svg'
import { Icon, InlineIcon } from "@iconify/react"
import { sidebarIcons } from './icons'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  const [activeSidebar,setActiveSidebar]=useState(0)
  return (
    <div className='h-screen overflow-auto rounded-r-3xl w-[60px] bg-primary'>
      <div className="flex flex-col justify-center items-center py-3">
        <div className="bg-white w-[40px] h-[40px] rounded-md mb-5 ">
        <img src={Logo} className='w-[40px] h-[40px] '/>
        </div>
        {sidebarIcons.map((icon, index) => (  
        <Link className={activeSidebar===index?'bg-btnHover p-2 rounded-md':'p-2'} onClick={()=>setActiveSidebar(index)}  to={icon.link} key={index}>
        <Icon icon={icon.icon} color="white" width="20" height="20" />
        </Link>
        ))}
     </div>
    </div>
  )
}

export default Sidebar