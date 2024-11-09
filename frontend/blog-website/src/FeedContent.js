import FeedPost from "./FeedPost";
import "./styles/FeedContent.css";
import { AuthContext } from "./context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ScrollContext } from "./context/ScrollProvider";

const FeedContent = (props) => {
  const scrollPadding = 200;

  const { scroll: savedScrollPosition, setScroll } = useContext(ScrollContext);

  const [postsFetchAmount, SetPostsFetchAmount] = useState(20);

  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const [prevScroll, updateScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Высота документа (вся страница)
      const documentHeight =
        document.documentElement.scrollHeight - scrollPadding;

      // Текущая позиция скролла
      const scrollPosition = window.scrollY + window.innerHeight;

      // Если позиция скролла достигает или превышает высоту страницы
      if (scrollPosition >= documentHeight) {
        setHasScrolledToBottom(true); // Пользователь долистал до низа
      } else {
        setHasScrolledToBottom(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Удаление слушателя при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let auth = useContext(AuthContext);

  const [feedData, SetFeedData] = useState([]);

  const [gotData, SetGotData] = useState("Pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let post_time_prefix = "";
        if (feedData && feedData.length > 0) {
          let last_posts = [];
          feedData.slice(-postsFetchAmount).map((item) => {
            last_posts.push(item.id);
          });
          console.log(last_posts);
          post_time_prefix = "&last_posts=" + last_posts;
        }
        console.log(
          props.api_url + "posts/?amount=" + postsFetchAmount + post_time_prefix
        );
        const response = await axios.get(
          props.api_url + "posts/?amount=" + postsFetchAmount + post_time_prefix
        );

        SetFeedData(feedData.concat(response.data));
        SetGotData("Success");
      } catch (e) {
        console.log(e);
        SetGotData("Fail");
      }
    };
    if (
      ((hasScrolledToBottom &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - scrollPadding) ||
        feedData.length == 0) &&
      prevScroll <= window.scrollY + window.innerHeight
    ) {
      console.log("knjfsdf");
      fetchData();
    }
    updateScroll(window.scrollY + window.innerHeight);
  }, [hasScrolledToBottom]);

  if (gotData == "Pending") {
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <div className="loading-block">
          <h2> Loading data... </h2>
        </div>
      </>
    );
  }

  if (gotData == "Fail") {
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <div className="loading-block">
          <h2> Failed to fetch feed data </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="feed-content">
        <div className="feed-box">
          {feedData.map((item) => (
            <FeedPost item={item} key={uuidv4()}></FeedPost> // здесь они не будут перерисовываться но дублироваться могут как вариант решил использовать рандомные идентификаторы
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedContent;
