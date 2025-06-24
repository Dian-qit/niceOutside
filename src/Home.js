import clearDay from './img/clear-day.jpg';


const Home = () => {
    return ( 
        <div className="home">
            <div className="home-container  background">
                <div class="hero-section">
                <div class="content">
                    <div class="left-side">
                    <h1 class="size-display" style={{margin:0}}>Weather Made Simple</h1>
                    <p class="size-large-title bold-text" style={{margin:0}}>See if it’s <span class="brand brand-color">Nice Outside.</span></p>
                    </div>
                    <div class="right-side">
                        <div class="weather-card">
                            
                            <h3>London</h3>
                            <p>32° Sunny ☀️</p>
                            
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            

        </div>
     );
}
 
export default Home;