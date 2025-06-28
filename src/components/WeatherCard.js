import { useFetch } from "../hooks/useFetch";
import humidity from "../assets/icons/Humidity.svg";
import clouds from "../assets/icons/Cloudy.svg";
import wind from "../assets/icons/Wind.svg"

const WeatherCard = ({ city = "Manila" }) => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}`;
    const { data: forecastData, loading, error } = useFetch(url);


    const getLocalTime = (dt, timezone, includeDate = false) => {
        const utcTime = new Date(dt * 1000);
        const localTime = new Date(utcTime.getTime() + (timezone * 1000));
        
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        
        if (includeDate) {
            options.month = 'short';
            options.day = 'numeric';
        }
        
        return localTime.toLocaleTimeString('en-US', options);
    };


    const getCurrentForecast = () => {
        if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
            return null;
        }
        return forecastData.list[0];
    };

    const getNextHourlyForecasts = (count = 3) => {
        if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
            return [];
        }
        
        return forecastData.list.slice(1, count + 1);
    };

    const currentForecast = getCurrentForecast();
    const nextForecasts = getNextHourlyForecasts();

    return ( 
        <div className="weather-card">
            <div className="weather-top background">
                {currentForecast ? (
                    <>  
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}  
                        <div className="weather-top-contents">
                            <div className="weather-content-top">
                                <h3 className="no-margin">{forecastData.city.name}</h3>
                                <p className="no-margin text-medium" style={{color: 'rgba(0, 0, 0, 0.66)'}}>
                                    {getLocalTime(currentForecast.dt, forecastData.city.timezone, true)}
                                </p>
                            </div>
                            <div className="weather-content-bottom">
                                <p className="size-display no-margin"> 
                                    {(currentForecast.main.temp - 273.15).toFixed(1)}° 
                                </p>
                                <p className="no-margin text-semi-bold" style={{fontSize: '20px'}}>
                                    {currentForecast.weather[0].main}
                                </p>
                                <p className="no-margin text-small" style={{color: 'rgba(0, 0, 0, 0.66)'}}>
                                    Feels like {(currentForecast.main.feels_like - 273.15).toFixed(1)}°
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    !loading && <p>No weather data available</p>
                )}
            </div>
            
            <div className="weather-center-contents">
                <div className="weather-left">
                    <p>Humidity</p>
                    <p>Cloudy</p>
                    <p>Wind</p>
                </div>
                <div className="weather-right">
                    <div className="weather-value">
                        {currentForecast ? (
                        <>
                            <p className="text-align-right">{currentForecast.main.humidity}%</p>
                            <p className="text-align-right">{currentForecast.clouds.all}%</p>
                            <p className="text-align-right">{currentForecast.wind.speed}km/h</p>
                        </>
                        ) : (
                    !loading && <p>No weather data available</p>
                )}
                    </div>
                    <div className="weather-icons">
                        <img src={humidity} alt="" />
                        <img src={clouds} alt="" />
                        <img src={wind} alt="" />
                    </div>
                </div>
            </div>
            
            <div className="weather-bottom-contents">
                {nextForecasts.length > 0 && (
                    <>
                        <h4 className="no-margin" style={{marginBottom: '10px', color: 'rgba(0, 0, 0, 0.8)'}}>
                            Next Hours
                        </h4>
                        <div className="hourly-forecast" style={{justifyContent: 'center'}}>
                            {nextForecasts.map((forecast, index) => (
                                <div key={index} className="hourly-item" style={{
                                    minWidth: '70px',
                                    minHeight: '120px',
                                    flexShrink: 0, 
                                    textAlign: 'center',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    border: 'solid 3px rgb(0,0,0,.5)',
                                    alignContent: 'center',
                                }}>
                                    <p className="no-margin text-small" style={{color: 'rgba(0, 0, 0, 0.8)'}}>
                                        {getLocalTime(forecast.dt, forecastData.city.timezone)}
                                    </p>
                                    <p className="no-margin text-medium" style={{margin: '5px 0', fontWeight: 'bold'}}>
                                        {(forecast.main.temp - 273.15).toFixed(0)}°
                                    </p>
                                    <p className="no-margin text-small" style={{color: 'rgba(0, 0, 0, 0.7)'}}>
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