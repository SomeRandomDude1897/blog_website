import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import "./styles/Account.css"
import { useParams } from "react-router-dom";

const AccountComponent = () => {
    const { user_id } = useParams();
    const {auth, setAuth} = useContext(AuthContext);
    if (user_id)
    {
        return (
            <>
                <div> {user_id} </div>
            </>
        )
    }
    if (auth?.user)
        {
            return ( 
                <>
                    <h1 className="user-username" >{auth.user["username"]}</h1>
                    <h2 className= "user-email">{auth.user["email"]}</h2>
                </>
            );
        }
        else
        {
            return ( 
                <div> Пользователь не зарегистрирован</div>
            );
        }

}
 
export default AccountComponent;