import React, { useState,useEffect } from 'react';
import Calendar from './component/calendar';
import GoggleLogin from './component/GoggleLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import DateTime from './component/DateTime';
import GetEvent from './component/GetEvent';
import Panel from './component/Panel';
import { AuthProvider} from './component/AuthProvider';
import GoogleLogin from './component/GoggleLogin'
import EventCalendar from './component/EventCalendar';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

 
    const [imageUrl, setImageUrl] = useState('');
  
    useEffect(() => {
      fetchRandomImage(); 
      const intervalId = setInterval(fetchRandomImage, 10 * 60 * 1000); 
  
      return () => {
        clearInterval(intervalId); 
      };
    }, []); 
  
    const fetchRandomImage = () => {
      fetch('https://api.unsplash.com/photos/random?query=travel&client_id=pQOZcFRQCnbFrHqOiRo2zKA6QwfogM0JmQHNrYzz6p4')
        .then(response => response.json())
        .then(data => {
          setImageUrl(data.urls.regular);
        })
        .catch(error => {
          console.error('Error fetching random image:', error);
        });
      }

    
  return (

    <GoogleOAuthProvider clientId='21633126117-m0adi0dqmienhgrd9eierabhklpoi1b3.apps.googleusercontent.com'>
      <AuthProvider >
   <div className='h-screen w-screen overflow-y-auto' style={{
    backgroundImage: `url(${imageUrl})`,
  backgroundSize: '100% 100%',
        width: screen,
        height: screen,}}> 
        <DateTime />
        <Calendar />
        <Panel />
<ToastContainer 
autoClose={1500}
transition={Slide}
position="bottom-right"
 />
   </div>
   </AuthProvider>
   </GoogleOAuthProvider>
  
  );
  
}

export default App;
