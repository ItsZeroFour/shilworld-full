import React from "react";
import style from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = React.memo(() => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__content}>
        <h5>Все права защищены! © 2023 ShilWorld.ru</h5>

        <ul className={style.footer__list}>
          {[
            { title: "Техподдержка", link: "/form" },
            { title: "Администрация", link: "/" },
            { title: "Информация для администрации", link: "/" },
          ].map((item, index) => (
            <li key={index}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
});

export default Footer;
