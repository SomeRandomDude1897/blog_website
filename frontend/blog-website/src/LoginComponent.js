import { useState } from "react";
import "./styles/Login.css"
import axios from "axios";

const LoginComponent = (props) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const checkLogin = async (e) =>  {
        e.preventDefault();
        console.log(props.api_url);
        const response = await axios.post(props.api_url, {
            "username": login,
            "password": password
          })
        console.log(response.data)
        if (response?.data["successful"])
        {
            console.log("LOGIN SUCCESSFUL!!!!!");   
            console.log(response.data["user_info"]);
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
            </form>
        </>
     );
}
 
export default LoginComponent;