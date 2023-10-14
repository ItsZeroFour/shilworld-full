import React from "react";
import style from "./Home.module.scss";
import Header from "../../Components/Header/Header";
import telegram from "../../images/Home/telegram.svg";
import vk from "../../images/Home/vk.svg";
import discord from "../../images/Home/discord.svg";
import Posts from "./Posts/Posts";
import RightMenu from "../../Components/RightMenu/RightMenu";
import img from "../../images/background.webp";
import { Link } from "react-router-dom";
import Footer from "Components/Footer/Footer";
import md5 from 'md5-hash'

const Home = ({ user, userIsLoaded }) => {
  const postsItems = [
    {
      title: "Глобальное обновление",
      subtitle: "1.17.1",
      img,
    },

    {
      title: "",
      subtitle: "1.17.1",
      img,
    },

    {
      title: "",
      subtitle: "1.17.1",
      img,
    },

    {
      title: "",
      subtitle: "1.17.1",
      img,
    },

    {
      title: "eeeeee",
      subtitle: "1.17.1",
      img,
    },

    {
      title: "",
      subtitle: "1.17.1",
      img,
    },

    {
      title: "",
      subtitle: "1.17.1",
      img,
    },

    {
      title: "",
      subtitle: "1.17.1",
      img,
    },

    {
      title: "",
      subtitle: "1.17.1",
      img,
    },

    {
      title: "",
      subtitle: "1.17.1",
      img,
    },
  ];

  console.log(md5('40168:1000:vY6E8N$?7-Y5hc*:RUB:154'));

  return (
    <main className={style.home}>
      <div className={style.home__banner}>
        <div className="container">
          <Header user={user} userIsLoaded={userIsLoaded} />

          <div className={style.home__banner__top}>
            <div className={style.home__banner__description}>
              <h3>ShilWorld создан для истинных любителей Minecraft.</h3>
              <p>
                Присоединяйтесь к "SHILWORLD" и погрузитесь в захватывающий мир
                Minecraft!
              </p>
            </div>

            <ul className={style.home__banner__list}>
              <li>
                <a
                  href="https://t.me/ShilWorld_Ru"
                  target="_blank"
                  rel="norefferer"
                >
                  <img src={telegram} alt="telegram" />
                </a>
              </li>

              <li>
                <a
                  href="https://vk.com/shilworld"
                  target="_blank"
                  rel="norefferer"
                >
                  <img src={vk} alt="vk" />
                </a>
              </li>

              <li>
                <a
                  href="https://discord.gg/pj58RJGZS9"
                  target="_blank"
                  rel="norefferer"
                >
                  <img src={discord} alt="discord" />
                </a>
              </li>
            </ul>
          </div>

          <div className={style.home__banner__main}>
            <div className={style.home__banner__title}>
              <div>
                <h1>ShilWorld</h1>
              </div>
              {/* <img src={homeImg} alt="griphon" /> */}
            </div>

            <div className={style.home__banner__bottom}>
              <ul className={style.home__banner__bottom__list}>
                <li className={style.home__banner__bottom__about}>
                  <h6>Survival</h6>
                  <p>
                    Это режим игры, где игрокам предстоит собирать ресурсы,
                    создавать предметы, строить убежища и бороться с монстрами.
                  </p>
                </li>

                <li className={style.home__banner__bottom__button}>
                  <Link to="/faq">Начать играть</Link>
                </li>

                <li className={style.home__banner__bottom__about}>
                  <h6>MiniGames</h6>
                  <p>
                    Это игровые режимы, которые позволяют игрокам насладиться
                    чем-то новым и отличным от основного мира Minecraft.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={style.home__content}>
        <div className="container">
          <section className={style.home__content__wrapper}>
            <Posts postsItems={postsItems} />

            <div className={style.home__right__menu}>
              <RightMenu user={user} userIsLoaded={userIsLoaded} />
            </div>
          </section>
        </div>
      </div>

      <div className="container footer">
        <Footer />
      </div>
    </main>
  );
};

export default Home;
