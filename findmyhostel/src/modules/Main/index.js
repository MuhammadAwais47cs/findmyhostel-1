import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import bgImg from '../../assets/bgImg.jpg'
import Card from '../../components/Card'
import { data } from './data'

const Main = () => {
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('data')) || []
    if (localStorageData.length === 0) {
      localStorage.setItem('data', JSON.stringify(data))
    }
  }, [data])
  

  const inputFields = [
    {
      label: 'Keyword',
      placeholder: 'Search by name'
    },
    {
      label: 'Location',
      placeholder: 'Search by location'
    },
    {
      label: 'Area',
      placeholder: 'Search by area'
    },
    {
      label: 'Hostel Type',
      placeholder: 'Search by hostel type'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit', e.target.elements)
    const { tag, title, address, price, name, beds, bath, sqft, image } = e.target.elements
    const checkEmpty = [tag, title, address, price, name]
    const isEmpty = checkEmpty.some((item) => item.value === '')
    if (isEmpty) {
      alert('Please fill all the fields')
    } else {
      const appendDataInLocalStorage = () => {
        const item = {
          tag: tag.value,
          title: title.value,
          address: address.value,
          price: price.value,
          image: image.value,
          agent: {
            name: name.value
          },
          features: {
            beds: beds.value,
            bath: bath.value,
            sqft: sqft.value
          }

        }
        const items = JSON.parse(localStorage.getItem('data')) || []
        const isItemExist = items.some((item) => item.title === title.value)
        if (isItemExist) {
          alert('Hostel already exist')
        } else {
          items.push(item)
          data.push(item)
          localStorage.setItem('data', JSON.stringify(items))
          setShowForm(false)
        }
      }
      appendDataInLocalStorage()
    }
  }

  return (
    <>
      {/* Header */}
      <Header />


      {/* Background */}
      <div style={{ backgroundImage: `url(${bgImg})` }} className='bg-cover bg-center bg-no-repeat h-[600px]'></div>

      {/* Input Fields Section */}
      <div className='bg-red-900 mx-auto mb-[100px] py-20 max-w-[1440px] mt-[-100px]'>
        <form className='flex justify-center items-center flex-wrap'>
          {
            inputFields.map((inputField, index) => (
              <div className='flex flex-col mr-4 w-[250px]' key={index}>
                <label className='text-white'>{inputField.label}</label>
                <input type='text' className='border border-gray-300 rounded-md p-2 mt-2' placeholder={inputField.placeholder} />
              </div>
            ))
          }
          <button className='bg-red-500 text-white p-2 rounded-md ml-4 mt-8 z-10 w-[200px]'>Find</button>
        </form>
      </div>

      {/* Card section */}
      <div className='flex items-center flex-wrap max-w-[1440px] mx-auto mb-[100px]'>
        <div className=' flex justify-between items-center flex-wrap'>
          {
            (JSON.parse(localStorage.getItem('data')) || [])?.map((item, index) => (
              <Card
                key={index}
                {...item}
              />
            ))
          }
          <form onSubmit={(e) => handleSubmit(e)}>
            {
              showForm ? (
                <div className='w-[400px] border mb-12 h-[575px] flex flex-col justify-center'>
                  <div className=' px-6 py-6'>
                    <div className=' text-sm text-blue-500 mb-2'><input type={'text'} name={'tag'} className="border p-[2px]" placeholder='Enter tag name' req /></div>
                    <div className=' text-xl mb-2'><input type={'text'} name={'title'} className="border p-[2px]" placeholder='Enter title' required /></div>
                    <div className=' text-md text-gray-700'><input type={'text'} name={'address'} className="border p-[2px]" placeholder='Enter address' required /></div>
                  </div>
                  <div className=' h-[250px] bg-gray-100 flex justify-center items-center'><input name={'image'} className="border p-[2px]" title='Upload Image' type="file" id="img" accept="image/*" required /></div>
                  <div className=' px-6 pt-6'>
                    <div className=' text-md text-gray-700 pb-2 border-b border-black flex flex-wrap items-center'>Beds: <input type={'number'} name={'beds'} className="border p-[2px] w-[60px] ml-2" placeholder='Beds' required /> / Bath: <input type={'number'} name={'bath'} className="border p-[2px] w-[60px] ml-2" placeholder='bath' required /> / Sq Ft: <input type={'number'} name={'sqft'} className="border p-[2px] w-[60px] ml-2" placeholder='Sq Ft' required /></div>
                    <div className=' text-2xl text-gray-800 my-4'>$<input type={'number'} name={'price'} className="border p-[2px] text-lg" placeholder='Enter price' required /></div>
                  </div>
                  <div className=' bg-gray-100 flex justify-between items-center p-6 '>
                    <div><input type={'text'} name={'name'} className="border px-[2px]" placeholder='Enter your name' required /></div>
                    <button className=' bg-red-300 px-4 hover:bg-red-500 hover:text-white' type='submit'>Add Hostel</button>
                  </div>
                </div>
              ) :
                <div className='w-[400px] border mb-12 h-[575px] flex flex-col justify-center'>
                  <div className='text-xl font-bold text-red-900 border border-dashed text-center p-2 cursor-pointer hover:bg-red-900 hover:text-white transition-all ease-linear duration-300' onClick={() => setShowForm(true)}>+ Add new hostel</div>
                </div>
            }
          </form>
        </div>
      </div>

      {/* Section */}
      <div className=' bg-red-200 py-16 mb-[100px]'>
        <div className=' flex justify-between items-center mx-auto max-w-[1440px]'>
          <div className=' max-w-[770px] mr-16'>
            <div className='text-4xl font-bold mb-4 text-red-900'>Find your hostel</div>
            <div className='text-2xl text-red-700'>
              Lorem ipsum paragraph is a dummy text used by designers to fill the space in the design. Lorem ipsum paragraph is a dummy text used by designers to fill the space in the design.
              Lorem ipsum paragraph is a dummy text used by designers to fill the space in the design. Lorem ipsum paragraph is a dummy text used by designers to fill the space in the design.
            </div>
          </div>
          <div className='w-[500px]'>
            <img src={bgImg} alt={'Section'} />
          </div>
        </div>
      </div>

      {/* Section */}
      <div className=' py-12 bg-red-100 '>
        <div className=' max-w-[1440px] mx-auto flex items-center justify-between'>
          <div className='text-4xl font-bold text-red-900'>Get more Information about news and offers</div>
          <div className=''>
            <input type='text' className='border border-gray-300 rounded-md p-2 ml-4 w-[300px]' placeholder='Enter your email' />
            <button className='bg-white p-2 rounded-md ml-4 w-[100px]'>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='bg-gray-50 py-12'>
        <div className='max-w-[1440px] mx-auto flex justify-between items-center h-[300px]'>
          <div className=''>© 2021 FindMyHostel. All rights reserved.</div>
          <div className=''>Terms of Use | Privacy Policy</div>
        </div>
      </div>
    </>
  )
}

export default Main