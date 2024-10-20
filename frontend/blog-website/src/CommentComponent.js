import "./styles/Comment.css"

const CommentComponent = (props) => {
    const datetime = new Date(props.comment.created_at);
    return ( 
        <div className="comment-box">
            <div className="comment-author">
                {props.comment.user["username"]}
            </div>
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
                     <img className="comment-image" src={ props.images_path + item["file"] }></img>
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