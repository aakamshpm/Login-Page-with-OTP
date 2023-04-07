import { useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import './index.css'

const App = () => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div className='bg-black gap-6 flex flex-col justify-center items-center h-screen'>
        <h1 className='text-white text-4xl'>Login to continue</h1>
        <div className='bg-white rounded-full p-4 text-gray-800 text-xl'><FaPhoneAlt /></div>
        <h3 className='text-white text-2xl'>Enter your phone number</h3>
        <div>
          <PhoneInput 
            country={'in'}
            value={phone}
            onchange={setPhone}
          />
        </div>
        <button className='text-white flex bg-gray-800 p-4 items-center justify-center gap-5 w-72'>
          {
            loading && <ImSpinner2 className='animate-spin' />
          }
          <span>Send code via SMS</span>
        </button>
      </div>
    </>
  )
}

export default App