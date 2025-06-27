import { useFetch } from "../hooks/useFetch";

const WeatherCard = ({ city = "Manila" }) => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
    
    const { data: weatherData, loading, error } = useFetch(url);

    // Function to get local time from weather data
    const getLocalTime = (dt, timezone) => {
        // dt is in seconds, convert to milliseconds
        // timezone is offset in seconds from UTC
        const utcTime = new Date(dt * 1000);
        const localTime = new Date(utcTime.getTime() + (timezone * 1000));
        
        return localTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return ( 
        <div className="weather-card">
            
            <div className="weather-top background">
                {weatherData ? (
                <>  
                    {loading && <p>Loading...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}  
                    <div className="weather-top-contents">
                        <div className="weather-content-top">
                            <h3 className="no-margin">{weatherData.name}</h3>
                            <p className="no-margin text-medium" style={{color: 'rgba(0, 0, 0, 0.66)'}}>{getLocalTime(weatherData.dt, weatherData.timezone)}</p>
                        </div>
                        <div className="weather-content-bottom">
                            <p className="size-display no-margin"> 
                            {(weatherData.main.temp - 273.15).toFixed(1)}° 
                        </p>
                        <p className="no-margin text-semi-bold" style={{fontSize: '20px'}}>{weatherData.weather[0].main}</p>
                        </div>
                    </div>
                </>
            ) : (
                !loading && <p>No weather data available</p>
            )}
            </div>
        </div>
    );
}
 
export default WeatherCard;