import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sunny from '../assets/sunny.png'
import rain from '../assets/rain.png'
import cloud from '../assets/cloud.png'

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '8afd1fc0b04fd330e6dadf1d0c54d276';
  const CITY = 'Kuala Lumpur';
  const COUNTRY_CODE = 'MY';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherImage = (description) => {
    switch (description.toLowerCase()) {
      case 'clouds':
        return cloud;
      case 'clear':
        return sunny;
      case 'rain':
        return rain;
      default:
        return 'default-image-url';
    }
  };

  return (
    <div>
      {weatherData ? (
        <div className='flex justify-evenly bg-black  bg-opacity-30 mb-2 px-3 py-2 rounded-md'>
           <div className='flex-col'>
                <h2 className='text-xl font-bold text-white'>{CITY}</h2>
                    <div className='flex gap-3 my-1 text-center'>
                        <div className='flex gap-1 text-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-700 font-bold">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                            </svg>
                            <p className='text-white font-semibold'>{weatherData.main.temp_max}°</p>
                        </div>
                        <div className='flex gap-1 text-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-400 font-bold">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                          </svg>
                          <p className='text-white font-semibold'>{weatherData.main.temp_min}°</p>
                        
                        </div>                     
                    </div>             
                <p className='text-white font-bold'>{weatherData.main.humidity}%</p>
           </div>
          <div className='w- h-12 grid gap-4 mx-2'>
            <img className='w-full h-10 'src={getWeatherImage(weatherData.weather[0].main)} alt="Weather" />
            <p className='text-white text-sm font-semibold'>{weatherData.weather[0].description}</p>
          </div>
          
          <p className='text-white font-bold'>{weatherData.main.temp}°C</p>
          
          
         
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;