import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const menus = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'About',
      link: '/about'
    },
    {
      name: 'Hostels',
      link: '/hostels'
    },
    {
      name: 'Clients Testimonials',
      link: '/clients-testimonials'
    },
    {
      name: 'Contact',
      link: '/contact'
    }
  ]

  const navigate = useNavigate()

  return (
    <div>
      <div className=' h-8 w-screen bg-red-300 flex items-center px-16'>
        <div className='mr-12'>Call us: 0900393743</div>
        <div>Chat us: area.wa</div>
        <div className=' ml-auto'>
          <span className=' cursor-pointer' onClick={() => navigate('/login')}>Login</span> / <span className=' cursor-pointer' onClick={() => navigate('/register')}>Register</span>
        </div>
      </div>
      <div className='bg-white shadow-sm py-6 px-16 flex items-center justify-between'>
        <div className=' text-6xl text-red-900 font-medium'>HBM</div>
        <div className='flex item-center justify-evenly'>
          {
            menus.map((menu, index) => (
              <div className='text-red-900 text-xl font-semibold ml-6' key={index}>
                <a href={menu.link}>{menu.name}</a>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Header