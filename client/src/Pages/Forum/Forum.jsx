import React from "react";
import style from "./Forum.module.scss";
/* IMAGES */
import telegram from "../../images/Home/telegram.svg";
import vk from "../../images/Home/vk.svg";
import discord from "../../images/Home/discord.svg";
/* OTHER*/
import Header from "Components/Header/Header";
import { Link } from "react-router-dom";
import DevNotofication from "Components/DevNotofication/DevNotofication";

const Forum = ({ user, userIsLoaded }) => {
  return (
    <main className={style.forum}>
      <DevNotofication
        title="В разработке"
        text="Уважаемая Администрация приносит свои извинения за доставленные неудобства"
      />
      <div className={style.forum__banner}>
        <div className="container">
          <Header user={user} userIsLoaded={userIsLoaded} />

          <div className={style.forum__banner__top}>
            <div className={style.forum__banner__description}>
              <h3>ShilWorld создан для истинных любителей Minecraft.</h3>
              <p>
                Присоединяйтесь к "SHILWORLD" и погрузитесь в захватывающий мир
                Minecraft!
              </p>
            </div>

            <ul className={style.forum__banner__list}>
              <li>
                <a href="/" target="_blank" rel="norefferer">
                  <img src={telegram} alt="telegram" />
                </a>
              </li>

              <li>
                <a href="/" target="_blank" rel="norefferer">
                  <img src={vk} alt="vk" />
                </a>
              </li>

              <li>
                <a href="/" target="_blank" rel="norefferer">
                  <img src={discord} alt="discord" />
                </a>
              </li>
            </ul>
          </div>

          <h1 className={style.forum__banner__title}>SHILWORLD</h1>

          <div className={style.forum__banner__bottom}>
            <ul className={style.forum__banner__bottom__list}>
              <li className={style.forum__banner__bottom__about}>
                <h6>Survival</h6>
                <p>
                  Это режим игры, где игрокам предстоит собирать ресурсы,
                  создавать предметы, строить убежища и бороться с монстрами.
                </p>
              </li>

              <li className={style.forum__banner__bottom__button}>
                <Link to="/faq">Начать играть</Link>
              </li>

              <li className={style.forum__banner__bottom__about}>
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
    </main>
  );
};

export default Forum;
