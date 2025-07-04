import { useState, useEffect } from 'react';
import BrandLogo from "../components/BrandLogo";
import logo from '../assets/img/Logo.png';

const Navbar = ({ textColor = '#000000', navbarBg = 'rgba(255, 255, 255, 0.1)' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.nav-links') && 
                !e.target.closest('.mobile-menu') && 
                isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        
        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

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
                    
                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
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
                        <button className="button-style bold-text nav-button" aria-label="Toggle theme">
                            Check Weather
                        </button>
                        <button 
                            className="mobile-menu" 
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                        >
                            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
 
export default Navbar;