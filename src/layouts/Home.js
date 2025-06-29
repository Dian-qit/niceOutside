import { useState } from 'react';
import NewsCard from "../components/NewsCard";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";
import Navbar from "../layouts/Navbar"; 

const Home = () => {
    const [city, setCity] = useState('Manila');
    const [isSearching, setIsSearching] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [textColor, setTextColor] = useState('#000000');
    const [navbarBg, setNavbarBg] = useState('rgba(255, 255, 255, 0.1)'); // Add navbar background state

    const handleSearch = (searchCity) => {
        setIsSearching(true);
        setCity(searchCity);
        setTimeout(() => setIsSearching(false), 1000);
    };

    const handleWeatherChange = (newBackgroundImage, newNavbarBg, newTextColor) => {
        setBackgroundImage(newBackgroundImage);
        setNavbarBg(newNavbarBg);
        setTextColor(newTextColor);
    };

    return ( 
        <div className="home">
            {/* Add Navbar component with props */}
            <Navbar textColor={textColor} navbarBg={navbarBg} />
            
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
                                    <h1 className="size-display" style={{
                                        margin: 0,
                                        color: textColor,
                                    }}>
                                        Weather Made Simple
                                    </h1>
                                    <p className="size-large-title bold-text" style={{
                                        margin: 0,
                                        color: textColor,
                                    }}>
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