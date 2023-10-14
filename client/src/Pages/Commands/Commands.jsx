import React from "react";
import style from "./Commands.module.scss";
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import RightMenu from "Components/RightMenu/RightMenu";

const Commands = ({ user, userIsLoaded }) => {
  const navigate = useNavigate();

  if (
    (userIsLoaded && !user) ||
    (userIsLoaded && user && user.role.toLowerCase() !== "admin")
  ) {
    navigate("/");
  }

  return (
    <div className={style.commands}>
      {userIsLoaded && user && user.role.toLowerCase() === "admin" && (
        <section className={style.commands__banner}>
          <div className="container">
            <Header user={user} userIsLoaded={userIsLoaded} />

            <div className={style.commands__wrapper}>
              <div>
                <div className={style.commands__content}>
                  <h2>Основные команды наших серверов</h2>

                  <h2 className={style.commands__subtitle}>
                    1. Основные команды
                  </h2>
                  <ul>
                    {[
                      {
                        command: "!",
                        type: "Сообщение",
                        text: "написать сообщение в глобальный чат (видят все игроки).",
                      },

                      {
                        command: "!",
                        type: "Сообщение",
                        text: "написать сообщение в глобальный чат (видят все игроки).",
                      },

                      {
                        command: "!",
                        type: "Сообщение",
                        text: "написать сообщение в глобальный чат (видят все игроки).",
                      },

                      {
                        command: "!",
                        type: "Сообщение",
                        text: "написать сообщение в глобальный чат (видят все игроки).",
                      },
                    ].map(({ command, type, text }, index) => (
                      <li>
                        <div>
                          <p>{command}</p>
                          <p>[{type}]</p>
                        </div>

                        <p>{text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={style.commands__right__menu}>
                <RightMenu user={user} userIsLoaded={userIsLoaded} />
              </div>
            </div>

            <div className="footer">
              <div className={style.commands__footer}>
                <Footer />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Commands;
