import "./styles/FeedPost.css"
import { Link } from "react-router-dom";

const FeedPost = (props) => {
    const crop_const = 20
    function CropText(text) {
        if (text.length > window.innerWidth/crop_const)
        {
            return text.substring(0, window.innerWidth/crop_const) + "...";
        }
        return text;
    }
    return ( 
        <>
            <Link to={"/post/" + props.item.id} className="feed-post-box">
                <h3 className="post-name">{props.item.postname}</h3>
                <div className="post-content">{CropText(props.item.content)}</div>
            </Link>
        </>
     );
}
 
export default FeedPost;