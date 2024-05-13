import React, { useState } from 'react';
import axios from 'axios';

import '../styles/Main.css'


function Main() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const [query, setQuery] = useState('');
    const [obj, setObj] = useState('');           
    const [weather, setWeather] = useState('');
    const [ThreeDays, setThreeDays] = useState('');

    const api = '3cea0dfec80d6bf1b2115f503b9f2c98'

    const coordinates = evt => {
        if (evt.key === "Enter") {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${api}`).then((resp) => {
            setObj(resp.data[0]);
            setThreeDays();
            setWeather();
            });
            return setObj
          }
    }

    const weatherToday = () => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${api}&units=metric&lang=ru`).then((response)=> {
        setWeather(response.data);
        setObj();
        setThreeDays()
      });
      return setWeather
    }

    const ThreeWeather = () => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&appid=${api}&units=metric&lang=ru`).then((response)=> {
        setThreeDays(response.data);
        setObj();
        setWeather();
      });
      return setThreeDays
    }


    return (
      <div className="app">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyUp={coordinates}
          />
        </div>
        {obj ?
            <div className='buttonClass'>
                <button onClick={weatherToday}>Сегодня</button>
                <button onClick={ThreeWeather}>3 дня</button>
            </div>
        : ('')};

        {weather ? 
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{ today }</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}
              </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        : ('')};

        {ThreeDays ? 
          <div className='temp'>
            <div>
            <div className="location-box">
              <div className="date">{ ThreeDays.list[1].dt_txt }</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(ThreeDays.list[1].main.temp)}
              </div>
              <div className="weather">{ThreeDays.list[1].weather[0].description}</div>
            </div>
            </div>
            <div>
            <div className="location-box">
              <div className="date">{ ThreeDays.list[9].dt_txt }</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(ThreeDays.list[9].main.temp)}
              </div>
              <div className="weather">{ThreeDays.list[9].weather[0].description}</div>
            </div>
            </div>
            <div>
            <div className="location-box">
              <div className="date">{ ThreeDays.list[17].dt_txt }</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(ThreeDays.list[17].main.temp)}
              </div>
              <div className="weather">{ThreeDays.list[17].weather[0].description}</div>
            </div>
            </div>
          </div>
        : ('')};

      </main>
    </div>
      )
  }
    

export default Main;
