import "./styles/Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { useContext, useState, useEffect } from "react";
import { ScrollContext } from "./context/ScrollProvider";
import { useLocation } from "react-router-dom";

const Header = (props) => {
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);
  const { scroll: savedScrollPosition, setScroll } = useContext(ScrollContext);
  function set_scroll_state() {
    setScroll({
      ...savedScrollPosition,
      [location.pathname]: window.scrollY,
    });
  }

  return (
    <>
      <div className="header">
        <div className="nav-box">
          <Link to="/" className="logo">
            ЧаЧ
          </Link>
          <ul className="nav-links-box">
            {auth?.user ? (
              <li className="nav-link">
                <Link
                  to="/add_new_post"
                  onClick={set_scroll_state}
                  className="nav-link-button"
                >
                  Новый пост
                </Link>
                <Link
                  to="/account"
                  onClick={set_scroll_state}
                  className="nav-link-button"
                >
                  Аккаунт
                </Link>
              </li>
            ) : (
              <li className="nav-link">
                <Link
                  to="/login"
                  onClick={set_scroll_state}
                  className="nav-link-button"
                >
                  Вход
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
