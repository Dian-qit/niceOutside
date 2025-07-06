import logo from '../assets/img/Logo.png';
import gitLogo from "../assets/icons/github.svg"
import instaLogo from "../assets/icons/instagram.svg"
import linkedInLogo from "../assets/icons/linkedIn.svg"

const Footer = () => {
    return ( 
        <div className="footer" id='footer'>
            <footer class="site-footer">
                <div class="footer-left">
                    <div className="footer-left-top">
                        <a href="#home" class="footer-logo">
                            <img src={logo} class="logo-size" alt="wewe" />
                            <span class="logo-text bold-text">NiceOutside</span>
                        </a>
                        <button class="button-style">Contact Us</button>
                    </div>   

                    <div className="footer-left-bottom" style={{fontSize:13}}>
                        <p class="semibold-text">Copyright 2025 NiceOutside. All rights reserved.</p>
                        <p class="semibold-text">Designed by: Vincent Adrian Quitoriano</p>
                    </div>
                </div>

                <div class="footer-right ">
                    <div class="footer-links list-horizontal-direction side-borders">
                        <a href="#home" class="footer-link active">
                            <i class="ri-home-5-line"></i>
                            <span class="size-body">Home</span>
                        </a>
                        <a href="#news" class="footer-link">
                            <i class="ri-information-line"></i>
                            <span class="size-body">News</span>
                        </a>
                        <a href="#footer" class="footer-link">
                            <i class="ri-stack-line"></i>
                            <span class="size-body">About</span>
                        </a>
                        
                    </div>
                    <div class="social-icons list-horizontal-direction">
                        <a href="https://www.linkedin.com/in/vincent-adrian-quitoriano-062183322/" target="blank"><img src={linkedInLogo} alt="" /></a>
                        <a href="https://github.com/Dian-qit/" target="blank"><img src={gitLogo} alt="" /></a>
                        <a href="https://www.instagram.com/"><img src={instaLogo} alt="" target="blank" /></a>
                    </div>
                </div>
            </footer>
        </div>
     );
}
 
export default Footer;