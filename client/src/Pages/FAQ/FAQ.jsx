import React from "react";
import style from "./FAQ.module.scss";
import Header from "Components/Header/Header";
import vk from "../../images/RightMenu/vk.svg";
import discord from "../../images/RightMenu/discord.svg";
import telegram from "../../images/RightMenu/telegram.svg";
import RightMenu from "Components/RightMenu/RightMenu";
import Footer from "Components/Footer/Footer";

const FAQ = ({ user, userIsLoaded }) => {
  return (
    <main className={style.faq}>
      <section className={style.faq__banner}>
        <div className="container">
          <Header user={user} userIsLoaded={userIsLoaded} />
          <div className={style.faq__banner__wrapper}>
            <div>
              <div className={style.faq__info}>
                <h2 className={style.faq__info__title}>Как начать играть?</h2>

                <div className={style.faq__info__block}>
                  <h2>1. Регистрация аккаунта</h2>

                  <p>
                    Для начала создайте игровой аккаунтВам потребуется придумать
                    игровой ник, указать пароль и почту для его восстановления
                  </p>

                  <button>Зарегистрироваться</button>
                </div>

                <div className={style.faq__info__block}>
                  <h2>2. Скачайте лаунчер</h2>

                  <p>Cкачайте лаунчер под свою операционную систему:</p>
                </div>

                <div className={style.faq__info__block}>
                  <h2>3. Будьте с нами на связи</h2>
                  <ul>
                    <li>
                      Подписывайтесь на наш Дискорд-сервер, чтобы задавать
                      вопросы и получать поддержку
                    </li>
                    <li>
                      Подписывайтесь на наш Телеграм и ВК, чтобы задавать
                      вопросы и получать поддержку
                    </li>
                  </ul>
                </div>

                <div className={style.faq__info__socials}>
                  <ul>
                    <li>
                      <a href="https://vk.com/shilworld" target="_blank">
                        <img src={telegram} alt="telegram" />
                      </a>
                    </li>

                    <li>
                      <a href="https://vk.com/shilworld" target="_blank">
                        <img src={vk} alt="vk" />
                      </a>
                    </li>

                    <li>
                      <a href="https://discord.gg/pj58RJGZS9" target="_blank">
                        <img src={discord} alt="discord" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={style.faq__right__menu}>
              <RightMenu user={user} userIsLoaded={userIsLoaded} />
            </div>
          </div>

          <div className="footer">
            <div className={style.faq__footer}>
              <Footer />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
