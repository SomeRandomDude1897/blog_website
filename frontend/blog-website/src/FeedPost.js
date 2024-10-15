import "./styles/FeedPost.css"

const FeedPost = (props) => {
    const crop_const = 20
    function CropText(text) {
        console.log(window.innerWidth);
        if (text.length > window.innerWidth/crop_const)
        {
            return text.substring(0, window.innerWidth/crop_const) + "...";
        }
        return text;
    }
    return ( 
        <>
            <button className="feed-post-box">
                <h3 className="post-name">{props.item.postname}</h3>
                <div className="post-content">{CropText(props.item.content)}</div>
            </button>
        </>
     );
}
 
export default FeedPost;