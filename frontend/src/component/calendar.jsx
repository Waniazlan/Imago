import React, { useState } from 'react';
import Panel from './Panel'
import GetEvent from './GetEvent';
import EventCalendar from './EventCalendar';
import GoggleLogin from './GoggleLogin';


const Calendar = () => {

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const[show,setShow] =useState(false)


  const [calendarData, setCalendarData] = useState(generateCalendarData(currentYear, currentMonth));


  function generateCalendarData(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    let calendarData = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || dayCounter > daysInMonth) {
          week.push('');
        } else {
          week.push(dayCounter);
          dayCounter++;
        }
      }
      calendarData.push(week);
    }

    return calendarData;
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  return (
    <div className='flex justify-between '>
      <div></div>
    <div className='grid sm:w-full  sm:grid-cols-2 gap-3 md:w-4/5 lg:w-2/4'>
      <div >
      {show && <EventCalendar />}
      </div>
     
     <div className='flex-col sm:mx-auto mr-5 '>
      <div className="py-4 px-5 mx-auto bg-black bg-opacity-30 rounded-md">
            <div className="text-center mb-4 flex gap-2 justify-between">
                <button  className="rounded-full p-2 border-solid border-white  border-2 hover:text-black hover:bg-white duration-300  text-white" onClick={() => setShow(!show)} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                    </svg>
                </button> 
                <h2 className="text-xl font-bold text-white">{monthNames[currentMonth]} </h2>   
                <GoggleLogin />
            </div>
                <div className="grid grid-cols-7 font-bold  pt-3">
                  <div className="text-center text-white mb-2 ">Sun</div>
                  <div className="text-center text-white mb-2 ">Mon</div>
                  <div className="text-center text-white mb-2">Tue</div>
                  <div className="text-center text-white mb-2">Wed</div>
                  <div className="text-center text-white mb-2">Thu</div>
                  <div className="text-center text-white mb-2">Fri</div>
                  <div className="text-center text-white mb-2">Sat</div>
                  {calendarData.map((week, index) => (
                    week.map((day, index) => (
                      <div key={index} className="text-center mr-2 ml-2 ">
                        {day !== '' ? (
                          <button key={index} className={`w-full hover:bg-black text-white rounded-md px-1 py-1 ${currentDay === day ? 'bg-black' : ''}`}>
                            {day}
                          </button>
                        ) : ''}
                      </div>
                    ))
                  ))}
                </div>
              </div>         
              <GetEvent />              
     </div>        
   </div>
   </div>
  );
};

export default Calendar;
