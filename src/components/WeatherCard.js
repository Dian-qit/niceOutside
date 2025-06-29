import { useFetch } from "../hooks/useFetch";
import humidity from "../assets/icons/Humidity.svg";
import clouds from "../assets/icons/Cloudy.svg";
import wind from "../assets/icons/Wind.svg"

const WeatherCard = ({ city = "Manila" }) => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const { data: currentWeatherData, loading: currentLoading, error: currentError } = useFetch(currentWeatherUrl);
    
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}`;
    const { data: forecastData, loading: forecastLoading, error: forecastError } = useFetch(forecastUrl);

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

    const getNextHourlyForecasts = (count = 3) => {
        if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
            return [];
        }
        
        
        return forecastData.list.slice(0, count);
    };

    const nextForecasts = getNextHourlyForecasts();
    const loading = currentLoading || forecastLoading;
    const error = currentError || forecastError;

    return ( 
        <div className="weather-card">
            <div className="weather-top background">
                {currentWeatherData ? (
                    <>  
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}  
                        <div className="weather-top-contents">
                            <div className="weather-content-top">
                                <h3 className="no-margin">{currentWeatherData.name}</h3>
                                <p className="no-margin text-medium" style={{color: 'rgba(0, 0, 0, 0.66)'}}>
                                    {getLocalTime(currentWeatherData.dt, currentWeatherData.timezone, true)}
                                </p>
                            </div>
                            <div className="weather-content-bottom">
                                <p className="size-display no-margin"> 
                                    {currentWeatherData.main.temp.toFixed(1)}° 
                                </p>
                                <p className="no-margin text-semi-bold" style={{fontSize: '20px'}}>
                                    {currentWeatherData.weather[0].main}
                                </p>
                                <p className="no-margin text-small" style={{color: 'rgba(0, 0, 0, 0.66)'}}>
                                    Feels like {currentWeatherData.main.feels_like.toFixed(1)}°
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
                        {currentWeatherData ? (
                        <>
                            <p className="text-align-right">{currentWeatherData.main.humidity}%</p>
                            <p className="text-align-right">{currentWeatherData.clouds.all}%</p>
                            <p className="text-align-right">{currentWeatherData.wind.speed}km/h</p>
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
                {nextForecasts.length > 0 && forecastData && (
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