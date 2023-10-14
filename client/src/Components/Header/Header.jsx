import React, { useState } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = React.memo(({ user, userIsLoaded }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const navList = [
    { title: "Главная", link: "/" },
    { title: "Правила", link: "/rules" },
    { title: "Форум", link: "/forum" },
    { title: "Донат", link: "/donat" },
    { title: "Банлист", link: "/banlist" },
    { title: "FAQ", link: "/faq" },
  ];

  return (
    <header className={style.header}>
      <div className={style.header__desctop}>
        <nav className={style.header__nav}>
          {navList.map(({ title, link }, index) => (
            <li key={index}>
              <Link to={link}>{title}</Link>
            </li>
          ))}

          {user && user.role.toLowerCase() === "admin" && (
            <li>
              <Link to="/commands">Команды</Link>
            </li>
          )}
        </nav>

        <div className={style.header__account}>
          <Link to="/account">
            {" "}
            {!userIsLoaded && user && (
              <img
                src={process.env.REACT_APP_API_URL + user.avatar}
                alt="avatar"
              />
            )}{" "}
            Личный кабинет
          </Link>
        </div>
      </div>

      <div className={style.header__mobile}>
        <div
          className={
            openMenu ? "header__mobile__menu openmenu" : "header__mobile__menu"
          }
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div className="header__line__1"></div>
          <div className="header__line__2"></div>
          <div className="header__line__3"></div>
        </div>

        {openMenu && (
          <div className={style.header__mobile__menu__list}>
            <nav className={style.header__mobile__nav}>
              {navList.map(({ title, link }, index) => (
                <li key={index}>
                  <Link to={link}>{title}</Link>
                </li>
              ))}

              {user && user.role.toLowerCase() === "admin" && (
                <li>
                  <Link to="/commands">Команды</Link>
                </li>
              )}
            </nav>

            <div className={style.header__mobile__account}>
              <Link to="/account">Личный кабинет</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});

export default Header;
