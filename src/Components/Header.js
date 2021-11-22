import images from "./maskable_icon_x64.png";
import "./../App.css";
function Header() {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = weekday[new Date().getDay()];
    return (
        <div>
            <img className="image-style" src={images} alt="images"/>
            <h2 className="app-name" >Hi, {day}</h2>
        </div>
    );
}
export default Header;