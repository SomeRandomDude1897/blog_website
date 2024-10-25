import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import "./styles/Account.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeedPost from "./FeedPost";
import { v4 as uuidv4 } from 'uuid';

const AccountComponent = (params) => {
    const { username } = useParams();
    const {auth, setAuth} = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [dataLoadStatus, setLoadStatus] = useState("pending");
    const navigate = useNavigate();

    useEffect(
        () => {
            const fetchData = async () => {
                try
                {
                    console.log(params.api_url + "users_detail/?username=" + (username ? username : auth?.user["username"]))
                    const responce = await axios.get(params.api_url + "users_detail/?username=" + (username ? username : auth?.user["username"]));
                    console.log(responce.data);
                    setUserData(responce.data);
                    setLoadStatus("success");
                    return responce.data;
                }
                catch (e)
                {
                    setLoadStatus("fail");
                    console.log(e);
                }

            }
            fetchData();
        }
        , [username]
    )    
    if (auth?.user?.username === username && username) {
        navigate("/account");
    }
    return (
        <>
        {
            dataLoadStatus == "success" ?
            (
                <>
                <div className="user-profile-info-box">
                    <div className="user-username">  {userData["user_info"]["username"]} </div>
                    {username ? null : <div className="user-email"> {"Email: " + userData["user_info"]["email"]} </div>}
                    <div className="user-image-bio-box">
                    {
                        userData["user_extra_data"]["profile_pic"] ?
                        (
                            <img className="user-profile-image" src={ params.images_path + userData["user_extra_data"]["profile_pic"] }></img>
                        )
                    : null
                    }
                    <div className="user-bio-text">{userData["user_extra_data"]["bio"]}</div>
                    </div>
                    <div className="user-posts-text"> Посты пользователя </div>
                </div>
                <div className="user-posts-box">
                {
                    userData["posts"] && userData["posts"].length > 0 ? (
                        userData["posts"].map((item) => (
                            <FeedPost item={item} key={uuidv4()}></FeedPost>
                        ))
                    ) : (
                        <div className="user-no-posts-text">Пользователь ничего не запостил (пока)</div>
                    )
                }

                </div>
                </>
                    ) : dataLoadStatus == "pending" ? (<div> Loading user data... </div>) :
                        (<div> Failed to load user data </div>)
        }
        </>
    )
}
 
export default AccountComponent;