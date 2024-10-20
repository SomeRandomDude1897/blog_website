import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import "./styles/Login.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginComponent = (props) => {

    const { auth, setAuth } = useContext(AuthContext);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [authStatus, setAuthStatus] = useState("");
    const navigate = useNavigate();

    const checkLogin = async (e) =>  {
        e.preventDefault();
        console.log(props.api_url);
        const response = await axios.post(props.api_url, {
            "username": login,
            "password": password
          })
        if (response?.data["successful"])
        {
            setAuthStatus("Success");
            setAuth({"user": response.data["user_info"], "user_data": response.data["user_data"]});
            navigate(-1);
        }
        else
        {
            setAuthStatus("Fail");
        }
        setLogin("");
        setPassword("");
    }

    return ( 
        <>
            <form className="login-form" onSubmit={checkLogin}>
                <label htmlFor="loginInput"> Логин: </label>
                <input type="text" id="loginInput" placeholder="введите ваш логин" onChange={(e) => {setLogin(e.target.value)}} value={login} required/>
                <label htmlFor="loginInput"> Пароль: </label>
                <input type="password" id="loginInput" placeholder="введите ваш пароль" onChange={(e) => {setPassword(e.target.value)}} value={password} required></input>
                <button>Войти</button>
                <div style={{color: authStatus == "Success" ? "rgb(41, 201, 76)" : "rgb(168, 33, 23)" }} className="login-incorrect">{authStatus == "Success" ? "Авторизация успешна, возвращаемся на предыдущую страницу..." : authStatus == "Fail" ? "Некорректный логин или пароль!" : ""}</div>
            </form>
            
        </>
     );
}
 
export default LoginComponent;