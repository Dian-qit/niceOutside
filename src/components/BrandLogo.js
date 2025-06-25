import logo from '../assets/img/Logo.png';

const BrandLogo = () => {
    return ( 
        <div className="brand-logo">
             <a href="#" class="nav-logo">
                <img src={logo} class="logo-size" alt="wewe" />
                <span class="logo-text bold-text">NiceOutside</span>
            </a>
        </div>
     );
}
 
export default BrandLogo;