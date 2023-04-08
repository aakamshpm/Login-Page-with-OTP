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
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [OTP, setOTP] = useState('');
  const [user, setUser] = useState(null)

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
      toast.success("OTP send successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
      setLoading(false);
      setShowOTP(true);

    }).catch((error) => {
      // setTimeout (() => {
      //   if(!showOTP){
      //     toast.error("OTP not sent", {
      //       position: toast.POSITION.TOP_CENTER
      //     });
      //     setLoading(false)
      //   }
      // }, 1000);
      setLoading(false)
      console.log(error);
    });
  }

  function onOTPVerify() {
    setLoading(true);
    confirmationResult.confirm(OTP).then((result) => {
      // User signed in successfully.
      setUser(result.user)
      setLoading(false);
      // ...
    }).catch((error) => {
      toast.error("Wrong OTP")
    });
  }

  return (
    <>
    <div className='bg-black flex items-center justify-center h-screen'>
      <div id='sign-in-button'></div>
      <ToastContainer  />
      {
        user ? 
            <h1 className='text-white text-3xl font-bold'>Login Success</h1> 
          :
            <div>
        {
          showOTP 
            ?
                  <div className='flex flex-col justify-center items-center gap-6'>
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
                  <button onClick={onOTPVerify} className='text-white flex bg-gray-800 p-4 items-center justify-center gap-5 w-72'>
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
                <div className='flex flex-col justify-center items-center gap-6'>
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
          </div>
      }
      
      </div>
    </>
  )
}

export default App