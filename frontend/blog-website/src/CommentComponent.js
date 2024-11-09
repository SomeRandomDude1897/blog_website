import { useContext, useState } from "react";
import "./styles/Comment.css";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

const CommentComponent = (props) => {
  const { auth, useAuth } = useContext(AuthContext);
  const datetime = new Date(props.comment.created_at);

  return (
    <>
      <div className="comment-box">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            className="comment-author"
            to={"/account/" + props.comment.user["username"]}
          >
            {props.comment.user["username"]}
          </Link>
          {auth?.user?.username == props.comment.user["username"] ? (
            <button
              onClick={() => {
                props.killSelfFunc(props.comment.id);
              }}
              className="delete-comment-button"
            >
              X
            </button>
          ) : null}
        </div>
        <div className="comment-created-time">
          {"Комментирует " +
            datetime.toLocaleDateString() +
            " в " +
            datetime.toLocaleTimeString()}
        </div>
        <div className="comment-content">{props.comment.content}</div>
        <div className="comment-image-box">
          {props.comment.images[0]
            ? props.comment.images.map((item) => {
                return (
                  <img
                    className="comment-image"
                    key={item.id}
                    src={props.images_path + item["file"]}
                  ></img>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default CommentComponent;
