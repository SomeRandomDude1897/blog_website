import { useContext, useState } from "react";
import "./styles/Registration.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./context/AuthProvider";

const RegisterForm = (props) => {
  const { auth, setAuth } = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  if (auth?.user?.id) {
    navigate("/account");
  }

  function Register(event) {
    const setRegister = async () => {
      const response = await axios.post(props.api_url + "register", {
        username: login,
        email: email,
        password: password,
      });
      if (response.data == "user successfully created") {
        setAuthStatus("Аккаунт создан, перенаправление на страницу входа");
        navigate("/login");
      } else if (response.data == "email already in use") {
        setAuthStatus("Email уже используется на сайте");
      } else if (response.data == "username already in use") {
        setAuthStatus(
          "Пользователь с таким логином уже существует, придуймайте другой"
        );
      } else {
        setAuthStatus("Не удалось создать аккаунт, попробуйте позже");
      }
      setLogin("");
      setRepeatPassword("");
      setEmail("");
      setPassword("");
    };

    event.preventDefault();
    if (password != repeatPassword) {
      setAuthStatus("Введенные пароли не совпадают!");
    } else {
      setRegister();
    }
  }

  return (
    <>
      <form className="register-form" onSubmit={Register}>
        <label> Email: </label>
        <input
          type="email"
          id="registerLoginInput"
          placeholder="введите электронную почту"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />
        <label> Логин: </label>
        <input
          type="text"
          id="registerLoginInput"
          placeholder="введите логин"
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          value={login}
          required
        />
        <label> Пароль: </label>
        <input
          type="password"
          id="registePasswordInput"
          placeholder="введите ваш пароль"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        ></input>
        <label> Повторите пароль: </label>
        <input
          type="password"
          id="registePasswordInput"
          placeholder="введите пароль повторно"
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
          value={repeatPassword}
          required
        ></input>
        <button>Регистрация</button>
        <div>{authStatus}</div>
      </form>
    </>
  );
};

export default RegisterForm;
