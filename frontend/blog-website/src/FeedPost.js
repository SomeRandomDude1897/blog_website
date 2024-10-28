import "./styles/FeedPost.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ScrollContext } from "./context/ScrollProvider";
import { useLocation } from "react-router-dom";

const FeedPost = (props) => {
    const {scroll: savedScrollPosition, setScroll} = useContext(ScrollContext);
    const crop_const = 20
    const location = useLocation();
    function CropText(text) {
        if (text.length > window.innerWidth/crop_const)
        {
            return text.substring(0, window.innerWidth/crop_const) + "...";
        }
        return text;
    }
    function set_scroll_state() {
        setScroll({
            ...savedScrollPosition,
            [location.pathname]: window.scrollY
        });
    }
    console.log(props.item)
    return ( 
        <>
            <Link to={"/post/" + props.item.id} className="feed-post-box" onClick={set_scroll_state}>
                <h3 className="post-name">{props.item.postname}</h3>
                <div className="post-content">{CropText(props.item.content)}</div>
            </Link>
        </>
     );
}
 
export default FeedPost;