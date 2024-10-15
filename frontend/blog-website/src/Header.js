import "./styles/Header.css"
import {Link} from "react-router-dom"

const Header = () => {
    return ( 
        <>
            <div className="header">
                <div className="nav-box">
                    <h3 className="logo">Сайт с блогами</h3>
                    <ul className="nav-links-box">
                        <li className="nav-link">
                            <a href="/">
                                <Link to="/" className="nav-link-button">
                                    Главная
                                </Link>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="/login">
                                <Link to="/login" className="nav-link-button">
                                    Вход
                                </Link>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
     );
}
 
export default Header;