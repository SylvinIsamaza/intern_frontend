import React from 'react'

const Card = ({count,className,icon,title}) => {
  return (
    <div className='shadow-sm rounded-2xl flex-1 h-[100px] pl-3 py-3   bg-white mt-4 flex items-center justify-between'>
      <div className="flex justify-center gap-3 items-center">
        <h1 className={`text-3xl font-bold  ${className}`}>
{count}
        </h1>
        <p className='w-[100px]'>{title}</p>
    
      </div>
      <img src={icon} alt={title}  className=' w-[90px] h-[70px]'/>

    </div>
  )
}

export default Card