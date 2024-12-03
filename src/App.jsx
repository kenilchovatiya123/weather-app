import React, { useEffect, useRef, useState } from 'react'
import clearsky_icon from './assets/clear.png'
import night_icon from './assets/night.png'
import fewclouds_icon from './assets/fewclouds.png'
import brokenclouds_icon from './assets/brokenclouds.png'
import showerrain_icon from './assets/showerrain.png'
import rain_icon from './assets/Rain.png'
import thunderstrom_icon from './assets/thunderstorm.png'
import snow_icon from './assets/Snow.png'
import mist_icon from './assets/Mist.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'


const App = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clearsky_icon,
    "01n": night_icon,
    "02d": fewclouds_icon,
    "02n": fewclouds_icon,
    "03d": fewclouds_icon,
    "03n": fewclouds_icon,
    "04d": brokenclouds_icon,
    "04n": brokenclouds_icon,
    "09d": showerrain_icon,
    "09n": showerrain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunderstrom_icon,
    "11n": thunderstrom_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,
  }

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        icon: icon
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    search("surat");
  }, [])

  return (
    <div className="bg-gradient-to-tr from-[#c9d4d5] to-[#eaeded] h-screen flex justify-center items-center">
      <div className="bg-gradient-to-br from-[#051f32] to-[#03192a] w-80 py-8 px-5 rounded-3xl">
        <div className="w-full flex gap-2 p-1 items-center">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-base font-normal text-[#f09900] placeholder:text-stone-300 placeholder:font-normal bg-[#fefefe] rounded-full flex-1 py-2 px-4 outline-none border border-[#f09900] capitalize"
          />
          <i>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="py-3 px-3 text-[#f09900] bg-[#fefefe] rounded-full border border-[#f09900]" onClick={() => search(inputRef.current.value)} />
          </i>
        </div>

        <div className="text-center flex flex-col gap-4 mt-8">
          <div>
            <p className="text-2xl font-semibold font-Poppins text-[#d5d8da]">{weatherData.location}, {weatherData.country}</p>
          </div>
          <div>
            <img src={weatherData.icon} alt="..." className="w-40 mx-auto" />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-extralight text-[#d5d8da] mb-1'>{weatherData.description}</span>
            <div className='flex items-center justify-center gap-1'>
              <i><FontAwesomeIcon icon={faTemperatureThreeQuarters} className='text-[#d5d8da] text-2xl' /></i>
              <h2 className="text-6xl font-semibold font-Poppins text-[#d5d8da]">{weatherData.temperature}&#176;</h2>
            </div>
          </div>
          <div className="w-full flex gap-2 p-1 items-center">
            <div className='bg-gradient-to-b from-[#dfa239] to-[#f09900] rounded-lg py-2 px-3'>
              <span className='text-sm font-extralight text-[#d5d8da]'>Wind</span>
              <h2 className="text-xl font-semibold font-Poppins text-[#d5d8da]">{weatherData.windSpeed}km/h</h2>
            </div>
            <div className='bg-gradient-to-b from-[#dfa239] to-[#f09900] rounded-lg flex-1 py-2 px-3'>
              <span className='text-sm font-extralight text-[#d5d8da]'>Humidity</span>
              <h2 className="text-xl font-semibold font-Poppins text-[#d5d8da]">{weatherData.humidity}%</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
