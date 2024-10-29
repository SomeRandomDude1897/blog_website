import { AuthContext } from "./context/AuthProvider";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/PostDetail.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import CommentComponent from "./CommentComponent";
import CommentFormComponent from "./CommentFormComponent";


// class post_serializer(serializers.ModelSerializer):
//     class Meta:
//         model = Post
//         fields = ["id", "author", "postname", "content", "created_at"]

const PostComponent = (props) => {
    const {auth, setAuth} = useContext(AuthContext);
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
    const [comments, setComments ] = useState([]);
    const [commentsLoadAmount, setCommentsLoadAmount] = useState(10);
    const { post_id } = useParams();

    const [ data, setData ] = useState(null);
    const [ fetchStatus, setFetchStatus ] = useState("pending");

    const [currentImageNumber, setCurrentImageNumber] = useState(0);

    console.log(props.api_url);

    const fetchComments = async () => {
        console.log(fetchStatus)
        if (fetchStatus == "success")
        {
            console.log("load comments");
            console.log(props.api_url + "comments/" + "?post_id="
                + data["post_info"]["id"] + "&amount=" + commentsLoadAmount + "&start_amount=" + (comments ? comments.length : 0));
            const comments_request = await axios.get(props.api_url + "comments/" + "?post_id="
                 + data["post_info"]["id"] + "&amount=" + commentsLoadAmount + "&start_amount=" + (comments ? comments.length : 0))
            setComments(comments.concat(comments_request.data))
            console.log(comments)
        }
        else
        {
            setTimeout(() => {console.log(fetchStatus)}, 1000)
        }
    }

    

    useEffect(() => {
      const handleScroll = () => {
        // Высота документа (вся страница)
        const documentHeight = document.documentElement.scrollHeight;
        
        // Текущая позиция скролла
        const scrollPosition = window.scrollY + window.innerHeight;
  
        // Если позиция скролла достигает или превышает высоту страницы
        if (scrollPosition >= documentHeight) {
          setHasScrolledToBottom(true); // Пользователь долистал до низа
        } else {
          setHasScrolledToBottom(false);
        }
      };
      const fetchData = async () => {
        try {
            const response = await axios.get(`${props.api_url + "/posts_detail/"}?request_id=${post_id}`);
            const comments_request = await axios.get(props.api_url + "comments/" + "?post_id="
                + response.data["post_info"]["id"] + "&amount=" + commentsLoadAmount + "&start_amount=" + (comments ? comments.length : 0))
            setComments(comments.concat(comments_request.data))
            setData(response.data);
            setFetchStatus("success");
            fetchComments()
            
        } catch (e) {
            console.error(e);
            setFetchStatus("fail");
        }
      };

      fetchData();
  
      window.addEventListener("scroll", handleScroll);
  
      // Удаление слушателя при размонтировании компонента
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    console.log(hasScrolledToBottom);


    useEffect(() => {
        fetchComments();
    }, [hasScrolledToBottom]);



    console.log(fetchStatus)

    if (fetchStatus == "success")
    {
        const datetime = new Date(data["post_info"]["created_at"]); 
        return ( 
            <>
                <h1 className="post-detail-name">{data["post_info"]["postname"]}</h1>
                <Link className="post-author-label" to={"/account/" + data["author"]["username"]}>{"Автор: " + data["author"]["username"]}</Link>
                <div className="post-date-label">{"Опубликовано " + datetime.toLocaleDateString() + " в " + datetime.toLocaleTimeString()}</div>
                <div className="post-detail-content">{data["post_info"]["content"]}</div>
                { data["images"].length > 0 ?
                <>
                <div className="slider-box">
                    {
                        data["images"].length > 1 ?
                        <button className="arrow-button" onClick={() => {setCurrentImageNumber((currentImageNumber - 1 + data["images"].length) % data["images"].length);}}>
                            {"<"}
                        </button> : null
                    } 
                    <div className="post-detail-images-box">
                        <img className="post-detail-image" src={ props.images_path + data["images"][currentImageNumber]["file"] }></img>
                    </div>
                    {
                        data["images"].length > 1 ?
                        <button className="arrow-button" onClick={() => {setCurrentImageNumber((currentImageNumber + 1) % data["images"].length)}}>
                            {">"}
                        </button> : null
                    }
                </div>
                {
                        data["images"].length > 1 ?
                            <div className="post-image-number-label">{(currentImageNumber + 1) + " из " +data["images"].length}</div> : null
                }
                </>
                : null
                }
            <>
                <CommentFormComponent api_url={props.api_url} post_id={data["post_info"]["id"]}></CommentFormComponent>
            </>
            <>
                {comments.map((item) => {
                    return (
                        <CommentComponent comment={item} images_path={props.images_path} key={uuidv4()}></CommentComponent>
                    )
                }
                )}
            </>
            </>
        );
    }
    else if (fetchStatus == "pending") {
        return (
            <>
                <div> Fetching data... </div>
            </>
        )
    }
    else {
        return (
            <>
                <div> Oops, something went wrong </div>
            </>
        )
    }
}
 
export default PostComponent;