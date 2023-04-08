import { useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { ImSpinner2 } from 'react-icons/im'
import { MdSms } from 'react-icons/md'
import PhoneInput from 'react-phone-input-2'
import OTPInput, { ResendOTP } from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from './firebase'

import 'react-phone-input-2/lib/style.css'
import './index.css'

const App = () => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [OTP, setOTP] = useState('')

  function onCaptchaVerify() {
    if(!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        }
      }, auth);
    }
  }

  function onSignInSubmit() {
    setLoading(true);
    onCaptchaVerify();
    const phoneNumber = '+' + phone;
    console.log(phone)
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);

    }).catch((error) => {
      // toast.success("OTP not sent")
      console.log(error);
    });
  }

  return (
    <>
    <div id='sign-in-button'></div>
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
                onChange={setPhone}
              />
            </div>
            <button onClick={onSignInSubmit} className='text-white flex bg-gray-800 p-4 items-center justify-center gap-5 w-72'>
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