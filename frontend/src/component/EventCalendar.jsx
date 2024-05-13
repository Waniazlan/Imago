import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function EventCalendar() {
    const [summary,setSummary] = useState('')
    const [startDateTime,setStartDateTime] = useState('')
    const [endDateTime,setEndDateTime] = useState('')
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/create-event',{
          summary,startDateTime,endDateTime
        }).then(response =>{
          console.log(response.data)
          toast.success('successfully add Event!');
         }).catch(error =>{
          console.log(error.message)
          toast.error('Failed to add event.');
         })
        
    }
  return (
    <div className='px-3 mr-4 py-4 bg-opacity-30 shadow-xl rounded-md bg-black sm:mx-auto lg:max-w-xl  '>
        <form onSubmit={handleSubmit} className="space-y-4 text-center" >
          <h1 className='text-2xl font-bold text-white '>Add Event</h1>
          <div className='flex flex-col max-w-xl text-white'>
            <div className='p-3 font-medium'>
              <label htmlFor='summary'>Event</label>
              <br />
              <input type='text' className='px-3  w-full rounded-xl py-2 mt-2 text-md font-medium text-black' id='summary' value={summary} onChange={e => setSummary(e.target.value)}
              ></input>
            </div>
          
            <div className='p-3'>
              <label className='text-md font-medium ' htmlFor='startDateTime'>Start Date Time</label>
              <br />
              <input className='px-3 py-2 mt-2 w-full rounded-xl text-black' type='datetime-local' id='startDateTime' value={startDateTime} onChange={e => setStartDateTime(e.target.value)}
              ></input>
            </div>
            
            <div className='p-3'>
              <label className='text-md font-medium ' htmlFor='endDateTime'>End date time</label>
              <br />
              <input className='px-3 py-2 mt-2 w-full rounded-xl text-black' type='datetime-local' id='endDateTime' value={endDateTime} onChange={e =>setEndDateTime(e.target.value)}
              ></input>
            </div>           
          </div>
          
            <div className="flex justify-end">
              <button  type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent hover:text-black shadow-sm text-sm font-bold rounded-md text-[#ece9ef] bg-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Submit Event
              </button>
        </div>
        </form>

    </div>
  )
}

export default EventCalendar