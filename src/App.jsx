import { useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'
import { MdSms } from 'react-icons/md'
import PhoneInput from 'react-phone-input-2'
import OTPInput, { ResendOTP } from "otp-input-react";
import 'react-phone-input-2/lib/style.css'

import './index.css'

const App = () => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(true)
  const [OTP, setOTP] = useState('')

  return (
    <>
      {
        showOTP 
          ?
            <div className='bg-black gap-6 flex flex-col justify-center items-center h-screen'>
              <h1 className='text-white text-4xl'>Login to continue</h1>
              <div className='bg-white rounded-full p-4 text-gray-800 text-2xl'><MdSms /></div>
              <h3 className='text-white text-2xl'>Enter OTP</h3>
              <div className='otp-field'>
               <OTPInput 
                value={OTP} 
                onChange={setOTP} 
                autoFocus 
                OTPLength={6} 
                otpType="number" 
                disabled={false}  
               />
              </div>
              <button className='text-white flex bg-gray-800 p-4 items-center justify-center gap-5 w-72'>
                {
                  loading && <ImSpinner2 className='animate-spin' />
                }
                <span>Verify OTP</span>
              </button>
              <div className='resendOTP text-white'>
                <ResendOTP 
                  maxTime='30'
                  onResendClick={() => console.log("Resend clicked")} 
                  />
              </div>
            </div>
          :
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
      }
      
    </>
  )
}

export default App