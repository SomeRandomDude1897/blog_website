import "./styles/App.css";
import FeedContent from "./FeedContent";
import Header from "./Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import AccountComponent from "./AccountComponent";
import PostComponent from "./PostComponent";
import { KeepAlive, AliveScope } from "react-activation";
import PageTracker from "./PageTracker";
import NewPostComponent from "./NewPostComponent";
import { AuthProvider } from "./context/AuthProvider";
import RegisterForm from "./RegisterForm";
import NotFoundComponent from "./NotFoundComponent";

function App() {
  const api_url = process.env.REACT_APP_API_URL;
  const image_url = process.env.REACT_APP_IMAGE_SERVER_URL;
  const auth_url = api_url + "auth/";
  const save_scroll_pages = ["/"];

  return (
    <>
      <AuthProvider api_url={api_url}>
        <AliveScope>
          <BrowserRouter>
            <PageTracker pages={save_scroll_pages} />
            <Header></Header>
            <Routes>
              <Route
                path="/"
                element={
                  <KeepAlive>
                    <FeedContent api_url={api_url} />
                  </KeepAlive>
                }
              />
              <Route
                path="/login"
                element={<LoginComponent api_url={auth_url} />}
              />
              <Route
                path="/account"
                element={
                  <AccountComponent api_url={api_url} images_path={image_url} />
                }
              />
              <Route
                path="/account/:username"
                element={
                  <AccountComponent api_url={api_url} images_path={image_url} />
                }
              />
              <Route
                path="/post/:post_id"
                element={
                  <PostComponent api_url={api_url} images_path={image_url} />
                }
              />
              <Route
                path="/add_new_post"
                element={<NewPostComponent api_url={api_url} />}
              />
              <Route
                path="/register"
                element={<RegisterForm api_url={api_url} />}
              />
              <Route path="*" element={<NotFoundComponent />}></Route>
            </Routes>
          </BrowserRouter>
        </AliveScope>
      </AuthProvider>
    </>
  );
}

export default App;
