import { useState } from 'react';
import NewsCard from "../components/NewsCard";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const [city, setCity] = useState('Manila');
    const [isSearching, setIsSearching] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null); 

    const handleSearch = (searchCity) => {
        setIsSearching(true);
        setCity(searchCity);
        setTimeout(() => setIsSearching(false), 1000);
    };

    const handleWeatherChange = (newBackgroundImage) => {
        setBackgroundImage(newBackgroundImage);
    };

    return ( 
        <div className="home">
            <div className="home-container" style={{
                backgroundImage: backgroundImage, 
                backgroundPosition: 'bottom center',
                backgroundSize: 'cover',
                height: '450px',
                transition: 'background-image 0.5s ease-in-out'
            }}>
                <div className="hero-section">
                    <div className="content">
                        <div className="left-side">
                            <div className="slogan">
                                <div className="slogan-top">
                                    <h1 className="size-display" style={{margin:0}}>Weather Made Simple</h1>
                                    <p className="size-large-title bold-text" style={{margin:0}}>
                                        See if it's <span className="brand brand-color">Nice Outside.</span>
                                    </p>
                                </div>
                                <SearchBar onSearch={handleSearch} loading={isSearching} />
                            </div>
                        </div>

                        <div className="right-side">
                            <WeatherCard 
                                city={city} 
                                onWeatherChange={handleWeatherChange} 
                            />
                        </div>
                    </div>
                </div>
            </div>   
            <div className="news-section">
                <div className="new-content">
                    <h1>Latest Weather <br /> News</h1>
                    <NewsCard />
                </div>
            </div>
        </div>
    );
}

export default Home;