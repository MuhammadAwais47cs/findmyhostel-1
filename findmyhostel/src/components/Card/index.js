import React from 'react'
import bgImg from '../../assets/bgImg.jpg'

const Card = ({
  tag = 'Farm',
  title = 'Luxury Apartment ocean view',
  address = '153 Adriniana Mews Suite 247',
  image = '',
  features = {
    beds: 4,
    bath: 2,
    sqft: 2100
  },
  price = 12340,
  agent = {
    name: 'Eleneor French',
    date: '2 Days ago'
  }
}) => {
  return (
    <div className='w-[400px] border mb-12'>
      <div className=' px-6 py-6'>
        <div className=' text-sm text-blue-500'>{tag}</div>
        <div className=' text-xl mb-2'>{title}</div>
        <div className=' text-md text-gray-700'>{address}</div>
      </div>
      <div className=' h-[250px] bg-black'><img src={bgImg} alt={title} className={'w-full h-full'} /></div>
      <div className=' px-6 pt-6'>
        <div className=' text-md text-gray-700 pb-2 border-b border-black'>Beds: {features?.beds} / Bath: {features?.bath} / Sq Ft: {features?.sqft}</div>
        <div className=' text-2xl text-gray-800 my-4'>${price}</div>
      </div>
      <div className=' bg-gray-100 flex justify-between items-center p-6 '>
        <div>{agent?.name}</div>
        <div>{agent?.date}</div>
      </div>
    </div>
  )
}

export default Card