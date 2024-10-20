import "./styles/Header.css"
import {Link} from "react-router-dom"
import { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";

const Header = () => {
    const  { auth, setAuth } = useContext(AuthContext);
    console.log("amogus")
    console.log(auth?.user);

    return ( 
        <>
            <div className="header">
                <div className="nav-box">
                    <Link to="/" className="logo">ЧаЧ</Link>
                    <ul className="nav-links-box">
                        { auth?.user ?
                            <li className="nav-link">
                                <Link to="/account" className="nav-link-button">
                                    Аккаунт
                                </Link>
                            </li>
                            :
                            <li className="nav-link">
                                <Link to="/login" className="nav-link-button">
                                    Вход
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </>
     );
}
 
export default Header;