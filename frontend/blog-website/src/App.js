import './styles/App.css';
import FeedContent from './FeedContent';
import Header from './Header';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import LoginComponent from './LoginComponent';
import AccountComponent from './AccountComponent';
import PostComponent from './PostComponent';
import { KeepAlive, AliveScope } from 'react-activation';
import PageTracker from './PageTracker';

function App() {
  const api_url = process.env.REACT_APP_API_URL;
  const image_url = process.env.REACT_APP_IMAGE_SERVER_URL;
  const auth_url = api_url + "auth/";
  const fetch_post_url = api_url + "/posts_detail/";
  const fetch_comments_url = api_url + "comments/";
  const save_scroll_pages = ["/"];

  console.log(image_url)
  return (
    <>
    <AliveScope>
      <BrowserRouter>
        <PageTracker pages={save_scroll_pages}/>
        <Header></Header>
        <Routes>
          <Route path="/" element={<KeepAlive><FeedContent api_url={api_url}/></KeepAlive>}/>
          <Route path="/login" element={<LoginComponent api_url={auth_url}/>}/>
          <Route path="/account" element={<AccountComponent/>}/>
          <Route path="/account/:username" element={<AccountComponent/>}/>
          <Route path="/post/:post_id" element={<PostComponent fetch_post_url={fetch_post_url} fetch_comments_url={fetch_comments_url} images_path={image_url}/>}/>
        </Routes>
      </BrowserRouter>
    </AliveScope>
    </>
  );
}

export default App;
