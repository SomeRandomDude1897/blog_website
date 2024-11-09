import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import "./styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginComponent = (props) => {
  const { auth, setAuth } = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  console.log(props.has_prev);

  const checkLogin = async (e) => {
    e.preventDefault();
    console.log(props.api_url);
    const response = await axios.post(props.api_url, {
      username: login,
      password: password,
      remember_me: rememberMe,
    });
    if (response?.data["successful"]) {
      setAuthStatus("Success");
      setAuth({
        user: response.data["user_info"],
        user_data: response.data["user_data"],
      });
      if (rememberMe) {
        localStorage.setItem("authToken", response.data["auth_token"]);
      }
      navigate("/account");
    } else {
      setAuthStatus("Fail");
    }
    setLogin("");
    setPassword("");
  };

  return (
    <>
      <form className="login-form" onSubmit={checkLogin}>
        <label htmlFor="loginInput"> Логин: </label>
        <input
          type="text"
          id="loginInput"
          placeholder="введите ваш логин"
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          value={login}
          required
        />
        <label htmlFor="loginInput"> Пароль: </label>
        <input
          type="password"
          id="loginInput"
          placeholder="введите ваш пароль"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        ></input>
        <div className="checkbox-block">
          <label htmlFor="rememberMeCheckBox"> Запомнить меня: </label>
          <input
            type="checkbox"
            id="rememberMeCheckBox"
            onChange={(e) => {
              setRememberMe(e.target.checked);
            }}
          ></input>
        </div>
        <button>Войти</button>
        <Link className="create-accout-link" to="/register">
          Нет аккаунта? Создайте прямо сейчас!
        </Link>
        <br />
        <div
          style={{
            color:
              authStatus == "Success" ? "rgb(41, 201, 76)" : "rgb(168, 33, 23)",
          }}
          className="login-incorrect"
        >
          {authStatus == "Success"
            ? "Авторизация успешна, возвращаемся на предыдущую страницу..."
            : authStatus == "Fail"
            ? "Некорректный логин или пароль!"
            : ""}
        </div>
      </form>
    </>
  );
};

export default LoginComponent;
