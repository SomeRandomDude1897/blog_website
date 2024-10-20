import './styles/App.css';
import FeedContent from './FeedContent';
import Header from './Header';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import LoginComponent from './LoginComponent';
import AccountComponent from './AccountComponent';
import PostComponent from './PostComponent';

function App() {
  const api_url = process.env.REACT_APP_API_URL;
  const image_url = process.env.REACT_APP_IMAGE_SERVER_URL;
  const auth_url = api_url + "auth/";
  const fetch_post_url = api_url + "/posts_detail/";
  const fetch_comments_url = api_url + "comments/";
  
  console.log(image_url)
  return (
    <>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<FeedContent api_url={api_url}/>}/>
        <Route path="/login" element={<LoginComponent api_url={auth_url}/>}/>
        <Route path="/account" element={<AccountComponent/>}/>
        <Route path="/account/:username" element={<AccountComponent/>}/>
        <Route path="/post/:post_id" element={<PostComponent fetch_post_url={fetch_post_url} fetch_comments_url={fetch_comments_url} images_path={image_url}/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
