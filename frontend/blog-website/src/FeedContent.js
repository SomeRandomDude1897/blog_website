import useLoad from "./UseLoad";
import FeedPost from "./FeedPost";
import "./styles/FeedContent.css"
import { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";

const FeedContent = (props) => {

    let auth = useContext(AuthContext);

    console.log(auth?.username)

    const {data: feed_data, receivedData} = useLoad(props.api_url);

    if (receivedData == "Pending") {
        return (
            <>
                <div className="loading-block">
                    <h2> Loading data... </h2>
                </div>
            </>
        );
    }

    if (receivedData == "Fail")
    {
        return (
            <>
                <div className="loading-block">
                    <h2> Failed to fetch data </h2>
                </div>
            </>
        );
    }

    return ( 
        <>
            <div className="feed-content"> 
                <div className="feed-box">
                    {
                        feed_data.map((item) => (
                            <FeedPost item={item} key={item.id}></FeedPost>
                        ))
                    }
                </div>
            </div>
        </>
     );
}
 
export default FeedContent;