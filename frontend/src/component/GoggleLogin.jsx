import React from 'react';
import { useAuth } from './AuthProvider';
import google from '../assets/google.png'





const GoggleLogin = () => {
  const { isLogging, login, logOut } = useAuth();



  return (
    <div className=''>
    {isLogging ? 
      <button className='text-white text-sm font-semibold hover:bg-slate-200 hover:text-black ease-in duration-300  rounded-xl px-2 py-2 flex gap-3 ' onClick={() => logOut()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white hover:text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
      </button> 
      : 
      <button className='text-white text-sm font-semibold hover:bg-slate-200 hover:text-black ease-in duration-300 rounded-xl px-2 py-2 flex gap-3 ' onClick={() => login()}>
        <img className='w-5 h-5' src={google} alt="Google logo" />
      </button>
    }
  </div>
  );
};

export default GoggleLogin