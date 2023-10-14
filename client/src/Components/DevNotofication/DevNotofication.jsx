import React from "react";
import style from "./DevNotofication.module.scss";
import griphonImg from "../../images/griphoneNF.webp";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const DevNotofication = ({title, text}) => {
  return (
    <section className={style.notification}>
      <div className={style.notification__wrapper}>
        <img src={griphonImg} alt="griphon" />

        <div className={style.notification__content}>
          <div className={style.notification__item}>
            <div className={style.notification__close}>
              <Link to="/" style={{ color: "red" }}>
                <IoCloseOutline />
              </Link>
            </div>

            <h6>{title}</h6>

            <div className={style.notification__text}>
              <p>
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevNotofication;
