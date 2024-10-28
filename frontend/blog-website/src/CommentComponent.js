import "./styles/Comment.css"
import { Link } from "react-router-dom";

const CommentComponent = (props) => {
    const datetime = new Date(props.comment.created_at);
    return ( 
        <div className="comment-box">
            <Link className="comment-author" to={"/account/" + props.comment.user["username"]}>
                {props.comment.user["username"]}
            </Link>
            <div className="comment-created-time">
                {"Комментирует " + datetime.toLocaleDateString() + " в " + datetime.toLocaleTimeString()}
            </div>
            <div className="comment-content">
                {props.comment.content}
            </div>
            <div className="comment-image-box">
                { props.comment.images[0] ? 
                    props.comment.images.map( (item) => {
                     return (
                     <img className="comment-image" key={item.id} src={ props.images_path + item["file"] }></img>
                    )
                    }
                    )
                    : null
                }
            </div>
        </div>
     );
}
 
export default CommentComponent;