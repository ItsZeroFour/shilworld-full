import React from "react";
import style from "./NotFound.module.scss";
import griphoneImg from "../../images/griphoneNF.webp";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className={style.notfound}>
      <div className={style.notfound__type}>
        <h1>4</h1>
        <img src={griphoneImg} alt="griphone" />
        <h1>4</h1>
      </div>

      <div className={style.notfound__text}>
        <h2>Ууупс...</h2>
        <p>
          Страница не найдена, попробуйте обратиться в тех. поддержку или
          вернитесь позже.
        </p>
      </div>

      <Link className={style.notfound__link} to="/">Вернуться домой</Link>
    </main>
  );
};

export default NotFound;
