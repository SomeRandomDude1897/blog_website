import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import axios from "axios";
import AddImagesComponent from "./AddImagesComponent";
import "./styles/CommentForm.css"
import { Link } from "react-router-dom";

const CommentFormComponent = (params) => {

    const {auth, setAuth} = useContext(AuthContext);
    const [commentText, setCommentText] = useState("");
    const [commentImages, setCommentImages] = useState([]);
    const [dataSendStatus, setDataSendStatus] = useState(null);
    const [showedError, setShowedError] = useState("");

    const max_images = 3;

    console.log(showedError);

    function PostNewComment(event) {
        const postData = async () => {
            const formData = new FormData();

            formData.append("author", auth["user"]["id"]);
            formData.append("post", params.post_id);
            formData.append("content", commentText);
    
            commentImages.forEach((image, index) => {
                formData.append(`image_${index}`, image.file);
            });
    
            try {
                console.log(params.api_url + "new_comment")
                const response = await axios.post(params.api_url + "new_comment", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
    
                console.log("Успешно:", response.data);
                setCommentImages([]);
                setCommentText("");

            } catch (error) {
                console.error("Ошибка при отправке:", error);
                setDataSendStatus("fail")
            }
        }
        event.preventDefault()
        try
        {
            if (auth?.user)
            {
                postData()
            }
        }
        catch (e)
        {
            console.log(e);
            setDataSendStatus("fail")
        }
        return 0;
    }
    if (auth?.user?.id)
    {
        return ( 
            <>
                <br/>
                <br/>
                <form className="comment-form-box" onSubmit={PostNewComment}>
                    <label htmlFor="comment-content">Оставьте комментарий</label>
                    <textarea type="text" id="comment-box" onChange={(e) => {setCommentText(e.target.value)}} placeholder="Напишите, что думаете" value={commentText}></textarea>
                    <AddImagesComponent max_images={max_images} images={commentImages} setImages={setCommentImages}></AddImagesComponent>
                    <button> Ответить </button>
                    <br/>
                    <label>{showedError}</label>
                </form>
            </>
        );
    }
    else 
    {
        return (
            <>
                <br/>
                <br/>
                <label> Войдите или зарегистрируйтесь, чтобы оставлять комментарии. </label>
                <br/>
                <br/>
                <Link to="/login">
                    <button> Войти </button> 
                </Link>
                <br/>
            </>
        )
    }
}
 
export default CommentFormComponent;