import React, { useEffect, useState } from 'react';

const WeatherCard = () => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const [weatherData, setWeatherData] = useState(null);
    
    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=${apiKey}`;
                
        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
                setWeatherData(data);
            })
    }, []);

    return ( 
        <div className="weather-card">
            {weatherData ? (
                                    <>
                                        <h3>{weatherData.name}</h3>
                                        <p>
                                            {(weatherData.main.temp - 273.15).toFixed(1)}°C - {weatherData.weather[0].main}
                                        </p>
                                    </>
                                ) : (
                                    <p>Loading...</p>
                                )}
        </div>
     );
}
 
export default WeatherCard;