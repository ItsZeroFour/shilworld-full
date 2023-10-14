import React, { useState } from "react";
import style from "./CreatePost.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const CreatePost = ({ user, userIsLoaded }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  if (
    (userIsLoaded && !user) ||
    (userIsLoaded && user && user.role.toLowerCase() !== "admin")
  ) {
    navigate("/");
  }

  /*
    Get file and send it to the server
    If we get an error send notification
  */
  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);

      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRemoverImage = () => {
    if (window.confirm("Are you sure you want to delete this image?"))
      setImageUrl("");
  };

  /*
    Create post and send us to this post page
    If we have an error send notificate
  */
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const fields = {
        title,
        subtitle,
        link,
        image: imageUrl,
      };

      const { data } = await axios.post("/post/create", fields);

      if (data) {
        navigate(`/`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className={style.createPost}>
      <form>
        {imageUrl === "" ? (
          <>
            <input
              id="create-post-img"
              type="file"
              onChange={handleChangeFile}
              hidden
              accept=".jpg, .png, .jpeg, .webp"
            />
            <label htmlFor="create-post-img">Загрузить изоброжение</label>
          </>
        ) : (
          <>
            <img
              className={style.createPost__image}
              src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
              alt="post img"
            />
            <button
              className={style.createPost__delete__image}
              onClick={onClickRemoverImage}
            >
              Delete image
            </button>
          </>
        )}

        <input
          className={style.createPost__title}
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          placeholder="Заголовок"
        />

        <input
          className={style.createPost__subtitle}
          type="text"
          onChange={(event) => setSubtitle(event.target.value)}
          value={subtitle}
          placeholder="Подзаголовок"
        />
        <input
          className={style.createPost__link}
          type="text"
          onChange={(event) => setLink(event.target.value)}
          value={link}
          placeholder="Ссылка на пост"
        />

        <button type="submit" onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Пост создается..." : "Создать пост"}
        </button>
      </form>
    </main>
  );
};

export default CreatePost;
