import "./styles/DeletePopup.css";

const DeletePopup = (props) => {
  return (
    <>
      {props.dependentProp ? (
        <>
          <div className="delete-popup-background"></div>
          <button
            className="cancel-delete"
            onClick={(e) => {
              props.setDependentProp(false);
            }}
          >
            {" "}
            X{" "}
          </button>
          <div className="delete-popup">
            <div style={{ color: "black" }} className="delete-popup-text">
              {" "}
              {props.text}
            </div>
            <div className="delete-popup-buttons-box">
              <button onClick={props.Action} className="yes-delete">
                Да, я уверен
              </button>
              <button
                onClick={(e) => {
                  props.setDependentProp(false);
                }}
                className="no-delete"
              >
                Нет, не надо
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DeletePopup;
