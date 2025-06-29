import BrandLogo from "../components/BrandLogo";
import logo from '../assets/img/Logo.png';

const Navbar = ({ textColor = '#000000', navbarBg = 'rgba(255, 255, 255, 0.1)' }) => {
    return ( 
        <div className="nav-bar">
            <nav className="nice-outside-nav" style={{
                backgroundColor: navbarBg,
                transition: 'background-color 0.5s ease-in-out'
            }}>
                <div className="nav-container">
                   
                    <a href="#" className="nav-logo">
                        <img src={logo} className="logo-size" alt="wewe" />
                        <span className="logo-text bold-text" style={{color: textColor}}>NiceOutside</span>
                    </a>
                    
                    <div className="nav-links">
                        <a href="#" className="nav-link active">
                            <i className="ri-home-5-line" style={{color: textColor}}></i>
                            <span className="size-body" >Home</span>
                        </a>
                        <a href="#" className="nav-link">
                            <i className="ri-information-line" style={{color: textColor}}></i>
                            <span className="size-body" style={{color: textColor}}>News</span>
                        </a>
                        <a href="#" className="nav-link">
                            <i className="ri-stack-line" style={{color: textColor}}></i>
                            <span className="size-body" style={{color: textColor}}>About</span>
                        </a>
                    </div>

                    <div className="nav-actions">
                        <button className="button-style bold-text" aria-label="Toggle theme">
                            Check Weather
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
 
export default Navbar;