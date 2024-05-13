import React from 'react'
import { useState,useContext } from 'react'
import axios from 'axios'



function EditEvent() {
  
    const [summary,setSummary] = useState(summary)
    const [startDateTime,setStartDateTime] = useState(startDateTime)
    const [endDateTime,setEndDateTime] = useState(endDateTime)
   

    
        axios.put(`http://localhost:4000/events/${eventId}`,{
          summary,startDateTime,endDateTime
        }).then(response =>{
          console.log(response.data)
         }).catch(error =>{
          console.log(error.message)
         })
        


   
  return (
  
    <div className=' py-4 px-6 mx-auto bg-opacity-50 shadow-md rounded-md bg-black lg:max-w-2xl xl:max-w-3xl '>
        <form className="space-y-4 text-center" >
          <h1 className='text-xl font-bold text-white '>Add event</h1>
          <div className='flex flex-col max-w-xl'>
            <div className='py-3'>
              <label htmlFor='summary'>Event</label>
              <br />
              <input type='text' className='px-3 py-2 mt-2 text-md font-medium text-black' id='summary' value={summary} onChange={e => setSummary(e.target.value)}
              ></input>
            </div>
          
            <div className='py-3'>
              <label className='text-md font-medium text-black' htmlFor='startDateTime'>start Date Time</label>
              <br />
              <input className='px-3 py-2 mt-2' type='datetime-local' id='startDateTime' value={startDateTime} onChange={e => setStartDateTime(e.target.value)}
              ></input>
            </div>
            
            <div className='py-3'>
              <label className='text-md font-medium text-black ' htmlFor='endDateTime'>end date time</label>
              <br />
              <input className='px-3 py-2 mt-2' type='datetime-local' id='endDateTime' value={endDateTime} onChange={e =>setEndDateTime(e.target.value)}
              ></input>
            </div>           
          </div>
          
            <div className="flex justify-end">
              <button type="edit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                 
              </button>
        </div>
        </form>
    </div>
  
  )
}

export default EditEvent
