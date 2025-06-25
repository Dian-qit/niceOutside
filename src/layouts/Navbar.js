import BrandLogo from "../components/BrandLogo";
import logo from '../assets/img/Logo.png';

const Navbar = () => {
    return ( 
            <div className="nav-bar">
                <nav class="nice-outside-nav">
                <div class="nav-container">
                   
                   <a href="#" class="nav-logo">
                        <img src={logo} class="logo-size" alt="wewe" />
                        <span class="logo-text bold-text">NiceOutside</span>
                    </a>
                    
                    <div class="nav-links">
                        <a href="#" class="nav-link active">
                            <i class="ri-home-5-line"></i>
                            <span class="size-body">Home</span>
                        </a>
                        <a href="#" class="nav-link">
                            <i class="ri-information-line"></i>
                            <span class="size-body">News</span>
                        </a>
                        <a href="#" class="nav-link">
                            <i class="ri-stack-line"></i>
                            <span class="size-body">About</span>
                        </a>
                        
                    </div>

                    <div class="nav-actions">
                        <button class="button-style bold-text" aria-label="Toggle theme">
                            Check Weather
                        </button>
                    </div>
                </div>
             </nav>
            </div>
     );
}
 
export default Navbar;