import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';



const GetEvent = () => {
  const [events, setEvents] = useState([]);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const { isLogging} = useAuth()
  

  useEffect(() => {
    
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/events?token=${localStorage.getItem("token")}`);
        setEvents(response.data.events)  
      } catch (error) {
        console.error('Error fetching events:', error);
        
      }
    };
    if(isLogging){
      fetchEvents();
    }
    
  }, [isLogging]); 

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:4000/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
      toast.success('Event deleted successfully!');
  
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event.');
    }
  };

  ///const today = new Date().toISOString().split('T')[0];
  const today = new Date().toISOString().slice(0, 10);
  const todayEvents = events.filter(event => event.start.dateTime.includes(today))
  const upcomingEvents = events.filter(event => !event.start.dateTime.includes(today))

  const toggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
  };

  
  if (!isLogging) {
    return null;
}


  return (
    
    <div className='mt-2'>
    <div className='bg-black  bg-opacity-30 rounded-md px-3 mb-2  text-white'>
      <h2 className='py-3 px-4 font-bold text-white shadow-xl text-center text-md'>Today's Events</h2>
     <div className='overflow-y-auto h-20' onClick={toggleDeleteButtons}>
     {todayEvents.map(event => (
      <div key={event.id} className='max-w-full justify-between gap-4 flex px-4 py-2 h-20'>
        <div className='grid'>
          <h2 className='text-md font-bold'>{event.summary}</h2>
          <p className='text-sm'>{new Date(event.start.dateTime).toLocaleString()}</p>
        </div>
        {showDeleteButtons && (
          <button className='hover:bg-gray-200 duration-200 px-2 rounded-full' onClick={() => deleteEvent(event.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 hover:text-black text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          </button>
        )}
       
          </div>
        ))}
      </div>   
   
       
    </div>
    <div className='bg-black rounded-md px-3 py-4 bg-opacity-30 text-white'>
      <h2 className='px-4 font-bold shadow-xl text-center text-white text-md '>Upcoming Events</h2>
      <div className='overflow-y-auto h-20' onClick={toggleDeleteButtons}>
      {upcomingEvents.map(event => (
        <div key={event.id} className='gap-5 flex justify-between px-4 py-2'>
          <div className='grid '>
            <h2 className='text-md font-bold'>{event.summary}</h2>
            <p className='text-sm'>{new Date(event.start.dateTime).toLocaleString()}</p>
             
          </div>
          {showDeleteButtons && (
            <button className='hover:bg-gray-200 px-2 duration-200 rounded-full' onClick={() => deleteEvent(event.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 hover:text-black text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

          </button>
          )}
          
        
        </div>
      ))}
      </div>
    
    </div>
  </div>
  );
};

export default GetEvent;
