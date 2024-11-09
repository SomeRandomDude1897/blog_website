import CrossImage from "./images/cross.png";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./styles/AddImages.css";

const AddImagesComponent = (props) => {
  function AddPicture(event) {
    event.preventDefault();
    if (props.images.length < props.max_images) {
      if (currentPicture != null) {
        const newPicture = {
          file: currentPicture,
          id: uuidv4(),
        };

        // Добавляем новый объект в массив картинок
        props.setImages(props.images.concat(newPicture));
      }
    }
  }

  const [currentPicture, setCurrentPicture] = useState(null);

  return (
    <>
      <label htmlFor="PostFileInput">
        {" "}
        {"Прикрепите картинки" +
          (props.max_images
            ? " (не больше " + String(props.max_images) + ")"
            : "")}
      </label>
      <input
        id="PostFileInput"
        accept="image/*"
        type="file"
        multiple
        onChange={(e) => setCurrentPicture(e.target.files[0])}
      />
      <button onClick={AddPicture}> Добавить картинку</button>
      <div className="added-pictures-box">
        {props.images.map((item) => {
          return (
            <div key={item.id} className="added-picture-box">
              <div>{item.file.name}</div>
              <img
                className="delete-image-button"
                src={CrossImage}
                alt="Удалить изображение"
                onClick={() => {
                  props.setImages(
                    props.images.filter((image) => image.id !== item.id)
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddImagesComponent;
