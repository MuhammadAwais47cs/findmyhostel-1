import React from 'react'
import '../../App.css'
import { useNavigate } from 'react-router-dom'

const Form = ({
  isSignIn = true
}) => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit', e.target.elements)
    const { username, password, repeatPassword, email } = e.target.elements
    const checkEmpty = isSignIn ? [username, password] : [username, password, repeatPassword, email]
    const isEmpty = checkEmpty.some((item) => item.value === '')
    if (isEmpty) {
      alert('Please fill all the fields')
    }else{
      if (!isSignIn && password.value !== repeatPassword.value) {
        alert('Password does not match')
      } else if(!isSignIn) {
        const appendDataInLocalStorage = () => {
          const user = {
            username: username.value,
            password: password.value,
            email: email.value
          }
          const users = JSON.parse(localStorage.getItem('users')) || []
          const isUserExist = users.some((item) => item.username === username.value)
          if (isUserExist) {
            alert('User already exist')
          } else {
            users.push(user)
            localStorage.setItem('users', JSON.stringify(users))
            navigate('/login')
          }
        }
        appendDataInLocalStorage()
      } else {
        const checkUser = () => {
          const users = JSON.parse(localStorage.getItem('users')) || []
          const isUserExist = users.some((item) => item.username === username.value && item.password === password.value)
          if (isUserExist) {
            alert('Logged in successfully')
            navigate('/')
          } else {
            alert('Invalid username or password')
          }
        }
        checkUser()
      }
    }
  }


  return (
    <div className=' h-screen flex justify-center items-center'>
      <div className=' w-[575px] flex flex-col p-24 pt-20 bg-cover bg-center relative form h-[800px]'>
        <div className=' flex text-2xl font-semibold text-white mb-8 relative'>
          <div className={`mr-6 cursor-pointer ${isSignIn && ' text-white underline'}`} onClick={() => navigate('/login')} >SIGN IN</div>
          <div className={`cursor-pointer ${!isSignIn && ' text-white underline'}`} onClick={() => navigate('/register')} >SIGN UP</div>
        </div>
        <form className='relative' onSubmit={(e) => handleSubmit(e)} >
          <div className='flex flex-col w-full mb-4'>
            <label className='text-white font-medium' >USERNAME</label>
            <input name='username' type='text' className='border border-gray-300 rounded-full py-[10px] px-4 mt-2' placeholder='Enter Username' required />
          </div>
          <div className='flex flex-col w-full mb-4'>
            <label className='text-white font-medium'>PASSWORD</label>
            <input name='password' type='password' className='border border-gray-300 rounded-full py-[10px] px-4 mt-2' placeholder='Enter Password' required />
          </div>
          {
            !isSignIn && (
              <>
                <div className='flex flex-col w-full mb-4'>
                  <label className='text-white font-medium'>REPEAT PASSWORD</label>
                  <input name='repeatPassword' type='password' className='border border-gray-300 rounded-full py-[10px] px-4 mt-2' placeholder='Repeat Password' required />
                </div>
                <div className='flex flex-col w-full '>
                  <label className='text-white font-medium'>EMAIL ADDRESS</label>
                  <input name='email' type='email' className='border border-gray-300 rounded-full py-[10px] px-4 mt-2' placeholder='Enter Email Address' required />
                </div>
              </>
            )
          }
          {
            isSignIn && (
              <div className='flex justify-between items-center mt-8'>
                <div className='flex items-center'>
                  <input id='remember' type='checkbox' className='mr-2'/>
                  <label htmlFor='remember' className='text-white font-medium'>Keep me logged in</label>
                </div>
              </div>
            )
          }
          <button type='submit' className='bg-red-500 text-white py-[10px] px-4 rounded-full mt-12 w-full'>{ isSignIn ? 'SIGN IN' : 'SIGN UP' }</button>
        </form>
        <div className='text-white font-medium cursor-pointer relative text-center pt-12 mt-16 text-lg border-t-2 border-white' onClick={() => navigate(isSignIn ? '/register' : '/login')} >{ isSignIn ? 'Create new account?' : 'Already member?' }</div>
      </div>
    </div>
  )
}

export default Form