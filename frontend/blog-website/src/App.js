import './styles/App.css';
import FeedContent from './FeedContent';
import Header from './Header';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import LoginComponent from './LoginComponent';

function App() {
  const api_url = process.env.REACT_APP_API_URL;
  const post_fetch_amount = 100;
  const fetch_url = api_url + "posts/?amount=" + post_fetch_amount;
  const auth_url = api_url + "auth/";
  console.log(fetch_url)
  return (
    <>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<FeedContent api_url={fetch_url} />}/>
        <Route path="/login" element={<LoginComponent api_url={auth_url}/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
