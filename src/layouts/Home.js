// import clearDay from './img/clear-day.jpg';
import NewsCard from "../components/NewsCard";
import WeatherCard from "../components/WeatherCard";



const Home = () => {
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
                            <WeatherCard />
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