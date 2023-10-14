import React, { useState } from "react";
import style from "./RightMenu.module.scss";
import { Link } from "react-router-dom";
/* IMAGES */
import galaxyImg from "../../images/RightMenu/galaxy.webp";
import magicImg from "../../images/RightMenu/magic.webp";
import nanotechImg from "../../images/RightMenu/nanotech.webp";
import pvpImg from "../../images/RightMenu/pvp.webp";
import skyblockImg from "../../images/RightMenu/skyblock.webp";
import technoImg from "../../images/RightMenu/techno.webp";
import voteImg from "../../images/RightMenu/voteImage.svg";
import discord from "../../images/RightMenu/discord.svg";
import telegram from "../../images/RightMenu/telegram.svg";
import vk from "../../images/RightMenu/vk.svg";
/* OTHER */
import { fetchCreateUser, logout } from "redux/slices/auth";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";

const RightMenu = React.memo(({ user, userIsLoaded }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [twoFA, setTwoFA] = useState(false);
  const [code, setCode] = useState("");

  const dispatch = useDispatch();

  /* AUTH FUNCTIONS */
  const registerUser = async () => {
    try {
      const data = await dispatch(
        fetchCreateUser({
          nickname: username,
          email,
          password,
        })
      );

      if (!data.payload) return setError(true);

      if ("token" in data.payload)
        window.localStorage.setItem("token", data.payload.token);
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = async () => {
    try {
      const data = await axios.post("/user/login", { email, password, code });

      if (!data.data) return setError(true);

      if (data.data.TwoFA) {
        if (!code) {
          setTwoFA(true);
          await axios.post("/user/sendCode", {
            email: data.data.email,
            userId: data.data._id,
          });
        }

        if (data.data.success) {
          if ("token" in data.data)
            window.localStorage.setItem("token", data.data.token);
          window.location.reload();
        }
      } else {
        if ("token" in data.data)
          window.localStorage.setItem("token", data.data.token);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const logOut = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  return (
    <section className={style.rightMenu}>
      {!userIsLoaded && !user ? (
        <div className={style.rightMenu__register}>
          <div className={style.rightMenu__register__title}>
            <h5>{!isRegister ? "Добро пожаловать" : "Регистрация"}</h5>
          </div>

          {!isRegister ? (
            <form className={style.rightMenu__form}>
              <input
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-mail"
              />
              <input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />

              {twoFA && (
                <input
                  type="number"
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="Enter code"
                />
              )}
            </form>
          ) : (
            <form className={style.rightMenu__form}>
              <input
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Придумайте себе ник"
              />
              <input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Придумайте себе пароль"
              />
              <input
                type="password"
                onChange={(event) => setConfirmPassowrd(event.target.value)}
                placeholder="Повторите придуманный пароль"
              />
              <input
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Ваш Email адрес"
              />
            </form>
          )}

          {password !== "" && password.length < 8 && (
            <p className={style.rightMenu__worning}>
              Пароль должен содержать более 8 символов
            </p>
          )}

          {error && (
            <p className={style.rightMenu__error}>
              Что-то пошло не так...
              <br />
              Попробуйте поменять имя, email или пароль
            </p>
          )}

          {!isRegister && (
            <Link
              to="/forgot-password"
              className={style.rightMenu__register__forgotpass}
            >
              Забыли пароль?
            </Link>
          )}

          <button
            className={style.rightMenu__register__login}
            onClick={!isRegister ? loginUser : registerUser}
            disabled={isRegister && confirmPassowrd !== password}
          >
            {!isRegister ? "Войти" : "Зарегестрироватся"}
          </button>

          {!isRegister ? (
            <button
              className={style.rightMenu__register__reg}
              onClick={() => setIsRegister(true)}
            >
              Нет аккаунта? Зарегистрируйтесь
            </button>
          ) : (
            <button
              className={style.rightMenu__register__reg}
              onClick={() => setIsRegister(false)}
            >
              Уже есть аккаунта? Войти
            </button>
          )}
        </div>
      ) : (
        <div className={style.rightMenu__account}>
          <div className={style.rightMenu__account__title}>
            <h5>{user?.nickname}</h5>
          </div>

          <div className={style.rightMenu__account__top}>
            <img
              src={process.env.REACT_APP_API_URL + user?.avatar}
              alt="avatar"
            />

            <div className={style.rightMenu__account__money}>
              <div className={style.rightMenu__account__money__rub}>
                <p>Рублей: {user?.rub}</p>
              </div>
              <div className={style.rightMenu__account__money__eu}>
                <p>Евро: {user?.euro}</p>
              </div>
            </div>
          </div>

          <a className={style.rightMenu__account__replenish} href="/">
            Пополнить баланс
          </a>

          <div className={style.rightMenu__account__buttons}>
            <Link to="/account">Личный аккаунта</Link>
            <Link to="/account">Активировать промокод</Link>
            <button onClick={logOut}>Покинуть аккаунт</button>

            {user && user.role.toLowerCase() === "admin" && (
              <Link to="/create-post" type="submit">
                Создать пост
              </Link>
            )}
          </div>
        </div>
      )}

      <div className={style.rightMenu__servers}>
        <div className={style.rightMenu__servers__title}>
          <h5>Мониторинг</h5>
        </div>

        <ul>
          <li>
            <img src={nanotechImg} alt="" />

            <div>
              <h6>NanoTech</h6>
              <p>Серверов: 1</p>
            </div>

            <div className={style.rightMenu__servers__online}>
              <h6>16</h6>
            </div>
          </li>

          <li>
            <img src={magicImg} alt="" />

            <div>
              <h6>NanoTech</h6>
              <p>Серверов: 1</p>
            </div>

            <div className={style.rightMenu__servers__online}>
              <h6>16</h6>
            </div>
          </li>

          <li>
            <img src={pvpImg} alt="" />

            <div>
              <h6>NanoTech</h6>
              <p>Серверов: 1</p>
            </div>

            <div className={style.rightMenu__servers__online}>
              <h6>16</h6>
            </div>
          </li>

          <li>
            <img src={technoImg} alt="" />

            <div>
              <h6>NanoTech</h6>
              <p>Серверов: 1</p>
            </div>

            <div className={style.rightMenu__servers__online}>
              <h6>16</h6>
            </div>
          </li>

          <li>
            <img src={skyblockImg} alt="" />

            <div>
              <h6>NanoTech</h6>
              <p>Серверов: 1</p>
            </div>

            <div className={style.rightMenu__servers__online}>
              <h6>16</h6>
            </div>
          </li>

          <li>
            <img src={galaxyImg} alt="" />

            <div>
              <h6>NanoTech</h6>
              <p>Серверов: 1</p>
            </div>

            <div className={style.rightMenu__servers__online}>
              <h6>16</h6>
            </div>
          </li>
        </ul>

        <p className={style.rightMenu__servers__total}>
          Общий онлайн: <span>75 игроков</span>
        </p>
      </div>

      <div className={style.rightMenu__votes__liders}>
        <div className={style.rightMenu__votes__liders__title}>
          <h5>Топ голосующих</h5>
        </div>

        <ul className={style.rightMenu__votes__liders__names}>
          <li>Место</li>
          <li>Игрок</li>
          <li>Голосов</li>
        </ul>

        <ol className={style.rightMenu__votes__players}>
          <li>
            <p>1</p>
            <p>beb</p>
            <p>40</p>
          </li>

          <li>
            <p>1</p>
            <p>214312</p>
            <p>40</p>
          </li>

          <li>
            <p>1</p>
            <p>Laranwene</p>
            <p>40</p>
          </li>

          <li>
            <p>1</p>
            <p>Laranwene</p>
            <p>40</p>
          </li>

          <li>
            <p>1</p>
            <p>Laranwene</p>
            <p>40</p>
          </li>

          <li>
            <p>1</p>
            <p>Laranwene</p>
            <p>40</p>
          </li>

          <li>
            <p>1</p>
            <p>Laranwene</p>
            <p>40</p>
          </li>
        </ol>

        <button>
          <img src={voteImg} alt="arrow" /> Голосовать
        </button>
      </div>

      <div className={style.rightMenu__socials}>
        <h5>Присоединяйся!</h5>

        <ul className={style.rightMenu__socials__list}>
          {[
            {
              img: telegram,
              title: "telegram",
              link: "https://t.me/ShilWorld_Ru",
            },
            { img: vk, title: "vk", link: "https://vk.com/shilworld" },
            {
              img: discord,
              title: "discord",
              link: "https://discord.gg/pj58RJGZS9",
            },
          ].map(({ img, title, link }, index) => (
            <li key={index}>
              <a href={link} target="_blank" rel="norefferer">
                <img src={img} alt={title} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

export default RightMenu;
