import React from 'react';

const Card = ({ count, className, icon, title }) => {
  return (
    <div className='shadow-sm rounded-2xl flex-1 mt-4 bg-white p-3 flex flex-col items-center md:flex-row justify-between'>

      <div className="flex justify-center gap-3 items-center">
        <h1 className={`text-3xl font-bold ${className}`}>
          {count}
        </h1>
        <p className='md:w-[100px] text-center md:text-left'>{title}</p>
      </div>

      <img src={icon} alt={title} className='w-[90px] h-[70px] mt-3 md:mt-0' />

    </div>
  );
};

export default Card;
