import React from 'react'
import googlemeet from '../assets/googlemeet.png'
import collab2 from '../assets/collab2.png'
import menuicon from '../assets/menuicon.png'
import google from '../assets/google.png'

function Panel() {
  return (
    <div className='flex justify-between '>
      <div></div>
      <div className='flex absolute bottom-0  right-4' >      
        <a className='w-20 h-12 my-3 mx-1 bg-black bg-opacity-30 rounded-lg py-2' href='https://meet.google.com/' target="_blank">
        <img  className='h-full w-full object-contain' src={googlemeet} alt='goolemeet' ></img>
       </a>     
       <a className=' w-20 h-12 my-3 mx-1 bg-black bg-opacity-30 rounded-lg py-2'  href='https://collab.imago.us' target="_blank">
        <img  className='h-full w-full object-contain' src={collab2} alt='collab' ></img>
       </a>  
        <a className='w-20 h-12 my-3 mx-1 bg-black bg-opacity-30 rounded-lg py-2'  href='https://www.google.com/' target="_blank">
        <img  className='h-full w-full object-contain  ' src={google} alt='google' ></img>
       </a>     
        <a className='w-20 h-12 my-3 mx-1 bg-black bg-opacity-30 rounded-lg py-2'  href='https://meet.google.com/' target="_blank">
        <img  className='h-full w-full object-contain ' src={menuicon} alt='menuicon' ></img>
       </a>      
    </div>
   
    </div>
  )
}

export default Panel
