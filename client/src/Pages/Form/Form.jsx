import React, { useRef } from "react";
import style from "./Form.module.scss";
import Header from "Components/Header/Header";
import emailjs from "@emailjs/browser";
import { SlSocialVkontakte } from "react-icons/sl";

const Form = ({user, userIsLoaded}) => {
  const form = useRef();

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Сообщение отправлено успешно!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <main className={style.form}>
      <div className="container">
        <Header user={user} userIsLoaded={userIsLoaded} />
        <div className={style.form__content}>
          <h2>Напишите нам!</h2>

          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name="to_name" placeholder="Ваша почта" />
            <input type="text" name="theme" placeholder="Тема" />
            <textarea name="message" />
            <button type="submit">Отправить</button>
          </form>

          <a className={style.form__link} href="/">
            Напишите нам в вк! <SlSocialVkontakte />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Form;
