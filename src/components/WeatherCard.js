import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import humidity from "../assets/icons/Humidity.svg";
import humidityWhite from "../assets/icons/Humidity-white.svg";
import clouds from "../assets/icons/Cloudy.svg";
import cloudsWhite from "../assets/icons/Cloudy-white.svg";
import wind from "../assets/icons/Wind.svg";
import windWhite from "../assets/icons/Wind-white.svg";

import clearDay from "../assets/img/clear-day.jpg";
import clearNight from "../assets/img/clear-night.png";
import cloudyDay from "../assets/img/cloudy-day.png";
import cloudyNight from "../assets/img/cloudy-night.png";
import rainDay from "../assets/img/rain-day.png";
import rainNight from "../assets/img/rain-night.png";
import stormDay from "../assets/img/storm.png";
import defaultImg from "../assets/img/clear-day.jpg";

const WeatherCard = ({ city = "Manila", onWeatherChange }) => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const { data: currentWeatherData, loading: currentLoading, error: currentError } = useFetch(currentWeatherUrl);
    
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}`;
    const { data: forecastData, loading: forecastLoading, error: forecastError } = useFetch(forecastUrl);

    const isDay = (currentTime, sunrise, sunset) => {
        return currentTime >= sunrise && currentTime < sunset;
    };

    const getWeatherStyles = (weatherData) => {
        if (!weatherData) return {
            textColor: '#000000',
            navbarBg: 'rgba(255, 255, 255, 0.1)'
        };
        
        const condition = weatherData.weather[0].main.toLowerCase();
        const currentTime = weatherData.dt;
        const sunrise = weatherData.sys.sunrise;
        const sunset = weatherData.sys.sunset;
        const isDayTime = isDay(currentTime, sunrise, sunset);
        
        const whiteTextConditions = [
            { condition: 'clear', time: 'night' },
            { condition: 'rain', time: 'day' },
            { condition: 'rain', time: 'night' },
            { condition: 'clouds', time: 'night' },
            { condition: 'thunderstorm', time: 'night' }
        ];
        
        const timeOfDay = isDayTime ? 'day' : 'night';
        const shouldUseWhiteText = whiteTextConditions.some(
            item => item.condition === condition && item.time === timeOfDay
        );
        
        return {
            textColor: shouldUseWhiteText ? '#FFFFFF' : '#000000',
            navbarBg: isDayTime ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
        };
    };

    const getWeatherIcons = (textColor) => {
        const useWhiteIcons = textColor === '#FFFFFF';
        return {
            humidity: useWhiteIcons ? humidityWhite : humidity,
            clouds: useWhiteIcons ? cloudsWhite : clouds,
            wind: useWhiteIcons ? windWhite : wind
        };
    };

    const getBackgroundImage = (weatherData) => {
        if (!weatherData) return `url(${defaultImg})`;
        
        const condition = weatherData.weather[0].main.toLowerCase();
        const currentTime = weatherData.dt;
        const sunrise = weatherData.sys.sunrise;
        const sunset = weatherData.sys.sunset;
        const isDayTime = isDay(currentTime, sunrise, sunset);
        
        const backgrounds = {
            clear: {
                day: `url(${clearDay})`,
                night: `url(${clearNight})`
            },
            clouds: {
                day: `url(${cloudyDay})`,
                night: `url(${cloudyNight})`
            },
            rain: {
                day: `url(${rainDay})`,
                night: `url(${rainNight})`
            },
            drizzle: {
                day: `url(${rainDay})`,
                night: `url(${rainNight})`
            },
            thunderstorm: {
                day: `url(${stormDay})`,
                night: `url(${stormDay})`
            }
        };
        
        const timeOfDay = isDayTime ? 'day' : 'night';
        return backgrounds[condition]?.[timeOfDay] || backgrounds.clear[timeOfDay];
    };

    useEffect(() => {
    if (currentWeatherData && onWeatherChange) {
        const backgroundImage = getBackgroundImage(currentWeatherData);
        const styles = getWeatherStyles(currentWeatherData);
        onWeatherChange(backgroundImage, styles.navbarBg, styles.textColor);
    }
}, [currentWeatherData, onWeatherChange]);

    const getLocalTime = (dt, timezone, includeDate = false) => {
        const localTime = new Date(dt * 1000);
        
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        
        if (includeDate) {
            options.month = 'short';
            options.day = 'numeric';
        }
        
        return localTime.toLocaleString('en-US', options);
    };

    const getNextHourlyForecasts = (count = 5) => {
        if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
            return [];
        }
        return forecastData.list.slice(0, count);
    };

    const nextForecasts = getNextHourlyForecasts();
    const loading = currentLoading || forecastLoading;
    const error = currentError || forecastError;

    const cardBackgroundImage = currentWeatherData ? getBackgroundImage(currentWeatherData) : null;
    const styles = currentWeatherData ? getWeatherStyles(currentWeatherData) : {
        textColor: '#000000',
        navbarBg: 'rgba(255, 255, 255, 0.1)'
    };
    
    const weatherIcons = getWeatherIcons(styles.textColor);

    return ( 
        <div className="weather-card">
            <div 
                className="weather-top" 
                style={{ 
                    backgroundImage: cardBackgroundImage,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {currentWeatherData ? (
                    <>  
                        {loading && <p style={{color: styles.textColor}}>Loading...</p>}
                        {error && <p style={{ color: "#FF6B6B" }}>{error}</p>}  
                        <div className="weather-top-contents">
                            <div className="weather-content-top">
                                <h3 className="no-margin" style={{
                                    color: styles.textColor,
                                    textShadow: styles.textColor === '#FFFFFF' ? '1px 1px 2px rgba(0,0,0,0.7)' : '1px 1px 2px rgba(255,255,255,0.7)'
                                }}>
                                    {currentWeatherData.name}
                                </h3>
                                <p className="no-margin text-medium" style={{
                                    color: styles.textColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                                    textShadow: styles.textColor === '#FFFFFF' ? '1px 1px 2px rgba(0,0,0,0.5)' : '1px 1px 2px rgba(255,255,255,0.5)'
                                }}>
                                    {getLocalTime(currentWeatherData.dt, currentWeatherData.timezone, true)}
                                </p>
                            </div>
                            <div className="weather-content-bottom">
                                <p className="size-display no-margin" style={{
                                    color: styles.textColor,
                                    textShadow: styles.textColor === '#FFFFFF' ? '2px 2px 4px rgba(0,0,0,0.7)' : '2px 2px 4px rgba(255,255,255,0.7)'
                                }}> 
                                    {currentWeatherData.main.temp.toFixed(1)}° 
                                </p>
                                <p className="no-margin text-semi-bold" style={{
                                    fontSize: '20px', 
                                    color: styles.textColor,
                                    fontWeight: 'bold',
                                    textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
                                }}>
                                    {currentWeatherData.weather[0].main}
                                </p>
                                <p className="no-margin text-small" style={{
                                    color: styles.textColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                                    textShadow: styles.textColor === '#FFFFFF' ? '1px 1px 2px rgba(0,0,0,0.5)' : '1px 1px 2px rgba(255,255,255,0.5)'
                                }}>
                                    Feels like {currentWeatherData.main.feels_like.toFixed(1)}°
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    !loading && <p style={{color: styles.textColor}}>No weather data available</p>
                )}
            </div>
            
            <div className="weather-center-contents">
                <div className="weather-left">
                    <p style={{color: styles.textColor}}>Humidity</p>
                    <p style={{color: styles.textColor}}>Cloudy</p>
                    <p style={{color: styles.textColor}}>Wind</p>
                </div>
                <div className="weather-right">
                    <div className="weather-value">
                        {currentWeatherData ? (
                        <>
                            <p className="text-align-right" style={{color: styles.textColor}}>
                                {currentWeatherData.main.humidity}%
                            </p>
                            <p className="text-align-right" style={{color: styles.textColor}}>
                                {currentWeatherData.clouds.all}%
                            </p>
                            <p className="text-align-right" style={{color: styles.textColor}}>
                                {currentWeatherData.wind.speed}km/h
                            </p>
                        </>
                        ) : (
                    !loading && <p style={{color: styles.textColor}}>No weather data available</p>
                )}
                    </div>
                    <div className="weather-icons">
                        <img src={weatherIcons.humidity} alt=""/>
                        <img src={weatherIcons.clouds} alt=""/>
                        <img src={weatherIcons.wind} alt=""/>
                    </div>
                </div>
            </div>
            
            <div className="weather-bottom-contents">
                {nextForecasts.length > 0 && forecastData && (
                    <>
                        <h4 className="no-margin" style={{
                            marginBottom: '10px', 
                            fontWeight: 'bold'
                        }}>
                            Next Hours
                        </h4>
                        <div className="hourly-forecast">
                            {nextForecasts.map((forecast, index) => (
                                <div key={index} className="hourly-item" style={{
                                    minWidth: '70px',
                                    minHeight: '120px',
                                    flexShrink: 0, 
                                    textAlign: 'center',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: `solid 2px rgb(0,0,0,.25)`,
                                    alignContent: 'center'
                                }}>
                                    <p className="no-margin text-small">
                                        {getLocalTime(forecast.dt, forecastData.city.timezone)}
                                    </p>
                                    <p className="no-margin text-medium" style={{
                                        margin: '5px 0', 
                                        fontWeight: 'bold',
                                        fontSize: '18px'
                                    }}>
                                        {(forecast.main.temp - 273.15).toFixed(0)}°
                                    </p>
                                    <p className="no-margin text-small" >
                                        {forecast.weather[0].main}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default WeatherCard;