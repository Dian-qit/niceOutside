import React, { useEffect, useState } from 'react';
import clearDay from './img/clear-day.jpg';
const apiKey = process.env.REACT_APP_WEATHER_KEY;


const Home = () => {
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
        <div className="home">
            <div className="home-container  background">
                <div class="hero-section">
                    <div class="content">
                        <div class="left-side">
                            <div className="slogan">
                                <h1 class="size-display" style={{margin:0}}>Weather Made Simple</h1>
                                <p class="size-large-title bold-text" style={{margin:0}}>See if it’s <span class="brand brand-color">Nice Outside.</span></p>
                            </div>
                            

                        </div>

                        <div class="right-side">
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

                        </div>
                    </div>
                </div>
            </div>   

        </div>
     );
}
 
export default Home;