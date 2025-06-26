import { useFetch } from "../hooks/useFetch";

const WeatherCard = () => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=${apiKey}`;
    
    const { data: weatherData, loading, error } = useFetch(url);

    return ( 
        <div className="weather-card">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weatherData ? (
                <>
                    <h3>{weatherData.name}</h3>
                    <p>
                        {(weatherData.main.temp - 273.15).toFixed(1)}°C - {weatherData.weather[0].main}
                    </p>
                </>
            ) : (
                !loading && <p>No weather data available</p>
            )}
        </div>
    );
     
}
 
export default WeatherCard;