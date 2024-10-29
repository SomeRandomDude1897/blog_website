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
    const [editingBio, setEditingBioStatus] = useState(false);
    const [newBioText, setNewBioText] = useState("");
    const navigate = useNavigate();

    function exitAccount() {
        localStorage.setItem('authToken', "");
        setAuth({});
        navigate("/");
    }

    console.log(editingBio)

    const updateProfile = async (newProfileData) => {
        try
        {
            console.log(params.api_url)
            const formData = new FormData();
            formData.append(`user_origin`, newProfileData["user_origin"]);
            if (newProfileData["bio"])
            {
                formData.append(`bio`, newProfileData["bio"]);
            }
            if (newProfileData["profile_pic"])
            {
                formData.append(`profile_pic`, newProfileData["profile_pic"]);
            }
            const responce = await axios.put(params.api_url + "update_user_data", formData);
            console.log(responce.data);
            setLoadStatus("success");
            navigate("/account/" + auth?.user["username"])
            return responce.data;
        }
        
        catch (e)
        {
            setLoadStatus("fail");
            console.log(e);
        }

    }

    function changeProfilePic(picture) {
        const new_profile_data = {
            "user_origin": auth?.user["id"],
            "profile_pic": picture
        }
        updateProfile(new_profile_data)
    }

    const changeBio = async () => {
        setEditingBioStatus(false);
        
        const new_profile_data = {
            "user_origin": auth?.user["id"],
            "bio": newBioText,
        }
        updateProfile(new_profile_data)
    }


    useEffect(
        () => {
            const fetchData = async () => {
                try
                {
                    console.log(params.api_url + "users_detail/?username=" + (username ? username : auth?.user["username"]))
                    const responce = await axios.get(params.api_url + "users_detail/?username=" + (username ? username : auth?.user["username"]));
                    console.log(responce.data);
                    setUserData(responce.data);
                    setNewBioText(responce.data["user_extra_data"]["bio"]);
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
                    { editingBio ? 
                    <textarea className="user-bio-textarea" onChange={(e) => {setNewBioText(e.target.value)}} value={newBioText}></textarea> :
                    <div className="user-bio-text">{userData["user_extra_data"]["bio"]}</div>}
                    </div>
                    {username ? null : 
                        <div className="profile-control-box">
                            <div className="change-profile-picture-box">
                                <label>Сменить изображение профиля</label>
                                <br/>
                                <input accept="image/*" type="file" multiple onChange={(e) => changeProfilePic(e.target.files[0])} className="change-profile-picture"></input>
                            </div>
                            { editingBio ? <button onClick={changeBio}> Закончить редактирование биографии</button> : <button onClick={() => {setEditingBioStatus(true)}} className="change-bio"> Сменить биографию </button>}
                            <button onClick={exitAccount} className="exit-button"> Выйти </button>
                        </div>
                    }
                    <br/>
                    <br/>
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