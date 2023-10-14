import React from "react";
import style from "./BanList.module.scss";
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";
import RightMenu from "Components/RightMenu/RightMenu";

const BanList = ({ user, userIsLoaded }) => {
  const banList = [
    {
      nickname: "Laranwene",
      reason: "1.7 Поменяй ник",
      admin: "HikiFIght",
      bandate: "3.07.2023",
      unbandate: "16.01.2024",
    },

    {
      nickname: "Laranwene",
      reason: "1.7 Поменяй ник",
      admin: "HikiFIght",
      bandate: "3.07.2023",
      unbandate: "Пермаментно",
    },

    {
      nickname: "Laranwene",
      reason: "1.7 Поменяй ник",
      admin: "HikiFIght",
      bandate: "3.07.2023",
      unbandate: "Пермаментно",
    },

    {
      nickname: "Laranwene",
      reason: "1.7 Поменяй ",
      admin: "HikiFIght",
      bandate: "3.07.2023",
      unbandate: "Пермаментно",
    },

    {
      nickname: "Laranwene",
      reason: "1.7 Поменяй ник",
      admin: "HikiFIght",
      bandate: "3.07.2023",
      unbandate: "Пермаментно",
    },
  ];

  return (
    <main className={style.banlist}>
      <div className={style.banlist__banner}>
        <div className="container">
          <Header user={user} userIsLoaded={userIsLoaded} />

          <section className={style.banlist__wrapper}>
            <div>
              <div className={style.banlist__content}>
                <h2>Список заблокированных</h2>

                <form className={style.banlist__form}>
                  <select placeholder="Выбор сервера">
                    <option value="Server 1">Server 1</option>
                    <option value="Server 1">Server 2</option>
                    <option value="Server 1">Server 3</option>
                  </select>

                  <input type="text" placeholder="Ник игрока" />

                  <input type="text" placeholder="Ник модератора" />

                  <button type="submit">Поиск</button>
                </form>

                <div className={style.banlist__list}>
                  <ul className={style.banlist__list__categorys}>
                    {[
                      { title: "Ник" },
                      { title: "Причина" },
                      { title: "Забанил" },
                      { title: "Дата бана" },
                      { title: "Дата разбана" },
                    ].map(({ title }, index) => (
                      <li key={index}>{title}</li>
                    ))}
                  </ul>

                  <ul className={style.banlist__list__list}>
                    {banList.map(
                      (
                        { nickname, reason, admin, bandate, unbandate },
                        index
                      ) => (
                        <li key={index}>
                          <p>{nickname}</p>
                          <p>{reason}</p>
                          <p>{admin}</p>
                          <p>{bandate}</p>
                          <p>{unbandate}</p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className={style.banlist__rightmenu}>
              <RightMenu user={user} userIsLoaded={userIsLoaded} />
            </div>
          </section>

          <div className="footer">
            <div className={style.banlist__footer}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BanList;
