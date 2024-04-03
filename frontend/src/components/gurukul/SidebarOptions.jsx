import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SidebarOptions = () => {
  return (
    <div className='flex flex-col'>
       <div className="sideBarOption">
         <ArrowForwardIosIcon className="sideBarIcon"/>
         <p className="sideBarText">Java</p>
       </div>
       <div className="sideBarOption">
         <ArrowForwardIosIcon className="sideBarIcon"/>
         <p className="sideBarText">Javascript</p>
       </div>
       <div className="sideBarOption">
         <ArrowForwardIosIcon className="sideBarIcon"/>
         <p className="sideBarText">React</p>
       </div>
       <div className="sideBarOption">
         <ArrowForwardIosIcon className="sideBarIcon"/>
         <p className="sideBarText">C++</p>
       </div>
       <div className="sideBarOption">
         <ArrowForwardIosIcon className="sideBarIcon"/>
         <p className="sideBarText">Python</p>
       </div>
       <div className="sideBarOption">
         <ArrowForwardIosIcon className="sideBarIcon"/>
         <p className="sideBarText">Other</p>
       </div>
    </div>
  )
}

export default SidebarOptions
