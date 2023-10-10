import { Icon } from '@iconify/react'
import React from 'react'

const Search = () => {
  return (
    <div className='relative'>
      <input type="search" placeholder='Search' className=' pl-8 border-[2px] rounded-md border-gray-300 py-[3px] ' />
      <Icon icon="fe:search" className="w-[16px] h-[16px] absolute left-3 top-[8px]" color='gray' />
    </div>
  )
}

export default Search