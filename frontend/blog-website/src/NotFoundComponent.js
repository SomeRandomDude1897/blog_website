import "./styles/NotFoundComponent.css";
import { Link } from "react-router-dom";

const NotFoundComponent = () => {
  return (
    <>
      <div className="action-box">
        <h2 className="not-found-main-label"> Страница не найдена </h2>
        <Link to="/" className="return-to-main-button">
          {" "}
          Вернуться на главную{" "}
        </Link>
      </div>
    </>
  );
};

export default NotFoundComponent;
