import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children, api_url }) => {
  const [auth, setAuth] = useState({});
  const [loadedData, setLoadedData] = useState(false);

  useEffect(() => {
    const fetchData = async (user_id) => {
      try {
        const responce = await axios.get(
          api_url + "users_detail/?user_id=" + user_id
        );
        setAuth({
          user: responce.data["user_info"],
          user_data: responce.data["user_data"],
        });
        setLoadedData(true);
      } catch (e) {
        console.log(e);
      }
    };
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (token) {
      // Если токен найден, обновляем состояние аутентификации
      fetchData(jwtDecode(token)["user_id"]);
    } else {
      setLoadedData(true);
    }
  }, []);
  if (loadedData) {
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export { AuthContext };
