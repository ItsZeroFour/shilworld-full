import React, { useState } from "react";
import style from "./Account.module.scss";
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";
import RightMenu from "Components/RightMenu/RightMenu";
import { Link, Navigate } from "react-router-dom";
import moment from "moment";
import skinImg from "../../images/minecraft_skin.png";
import ReactSkinview3d from "react-skinview3d";
import axios from "../../utils/axios";
import { fetchCreateUser, logout } from "redux/slices/auth";
import { useDispatch } from "react-redux";

const Account = ({ user, userIsLoaded }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");
  const [twoFA, setTwoFA] = useState(false);
  const [code, setCode] = useState("");

  const dispatch = useDispatch();

  const sendVerifyEmail = async () => {
    try {
      if (!user.emailIsVerified) {
        await axios.post("user/sendLetter", { email: user.email });
        alert("Проверьте вашу почту, мы отправили на него письмо");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const send2FAEmail = async () => {
    try {
      if (!user.TwoFA) {
        await axios.post("/user/send2FALetter", { email: user.email });
        alert("Проверьте вашу почту, мы отправили на него письмо");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    }
  };

  const logOut = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <main className={style.account}>
      <div className={style.account__banner}>
        {!userIsLoaded && !user ? (
          <div className="container">
            <Header user={user} userIsLoaded={userIsLoaded} />

            <div className={style.account__wrapper}>
              <div>
                <div className={style.account__content}>
                  <div className={style.account__register}>
                    {!isRegister ? (
                      <form className={style.account__form}>
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
                      <form className={style.account__form}>
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
                          onChange={(event) =>
                            setConfirmPassowrd(event.target.value)
                          }
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
                      <p className={style.account__worning}>
                        Пароль должен содержать более 8 символов
                      </p>
                    )}

                    {error && (
                      <p className={style.account__error}>
                        Что-то пошло не так...
                        <br />
                        Попробуйте поменять имя, email или пароль
                      </p>
                    )}

                    {!isRegister && (
                      <Link
                        to="/forgot-password"
                        className={style.account__register__forgotpass}
                      >
                        Забыли пароль?
                      </Link>
                    )}

                    <button
                      className={style.account__register__login}
                      onClick={!isRegister ? loginUser : registerUser}
                      disabled={isRegister && confirmPassowrd !== password}
                    >
                      {!isRegister ? "Войти" : "Зарегестрироватся"}
                    </button>

                    {!isRegister && (
                      <button
                        className={style.account__register__reg}
                        onClick={() => setIsRegister(true)}
                      >
                        Нет аккаунта? Зарегестрируйтесь
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className={style.account__rightmenu}>
                <RightMenu user={user} userIsLoaded={userIsLoaded} />
              </div>
            </div>

            <div className={style.account__footer}>
              <Footer />
            </div>
          </div>
        ) : (
          <div className="container">
            <Header user={user} userIsLoaded={userIsLoaded} />

            <div className={style.account__wrapper}>
              <div>
                {userIsLoaded ? (
                  <section className={style.account__content}>
                    Loading...
                  </section>
                ) : (
                  !userIsLoaded &&
                  user && (
                    <section className={style.account__content}>
                      <h2 className={style.account__nickname}>
                        {user.nickname}
                      </h2>

                      <div className={style.account__main}>
                        <div className={style.account__main__skin}>
                          <ReactSkinview3d
                            skinUrl={skinImg}
                            height="500"
                            width="303"
                          />
                        </div>
                        <div className={style.account__main__info}>
                          <h6>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="16"
                              viewBox="0 0 20 16"
                              fill="none"
                            >
                              <path
                                d="M2 16C1.45 16 0.979002 15.804 0.587002 15.412C0.195002 15.02 -0.000664969 14.5493 1.69779e-06 14V2C1.69779e-06 1.45 0.196002 0.979002 0.588002 0.587002C0.980002 0.195002 1.45067 -0.000664969 2 1.69779e-06H18C18.55 1.69779e-06 19.021 0.196001 19.413 0.588001C19.805 0.980001 20.0007 1.45067 20 2V14C20 14.55 19.804 15.021 19.412 15.413C19.02 15.805 18.5493 16.0007 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V14V4Z"
                                fill="white"
                              />
                            </svg>{" "}
                            {user.email}
                          </h6>
                          <h6>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M4.375 0C4.54076 0 4.69973 0.065848 4.81694 0.183058C4.93415 0.300269 5 0.45924 5 0.625V1.25H15V0.625C15 0.45924 15.0658 0.300269 15.1831 0.183058C15.3003 0.065848 15.4592 0 15.625 0C15.7908 0 15.9497 0.065848 16.0669 0.183058C16.1842 0.300269 16.25 0.45924 16.25 0.625V1.25H17.5C18.163 1.25 18.7989 1.51339 19.2678 1.98223C19.7366 2.45107 20 3.08696 20 3.75V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V3.75C0 3.08696 0.263392 2.45107 0.732233 1.98223C1.20107 1.51339 1.83696 1.25 2.5 1.25H3.75V0.625C3.75 0.45924 3.81585 0.300269 3.93306 0.183058C4.05027 0.065848 4.20924 0 4.375 0ZM1.25 5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V5H1.25Z"
                                fill="white"
                              />
                            </svg>{" "}
                            {moment(user.createdAt).format("YYYY-MM-DD")}
                          </h6>
                          <button
                            onClick={sendVerifyEmail}
                            disabled={user.emailIsVerified}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19"
                              height="19"
                              viewBox="0 0 20 16"
                              fill="none"
                            >
                              <path
                                d="M2 16C1.45 16 0.979002 15.804 0.587002 15.412C0.195002 15.02 -0.000664969 14.5493 1.69779e-06 14V2C1.69779e-06 1.45 0.196002 0.979002 0.588002 0.587002C0.980002 0.195002 1.45067 -0.000664969 2 1.69779e-06H18C18.55 1.69779e-06 19.021 0.196001 19.413 0.588001C19.805 0.980001 20.0007 1.45067 20 2V14C20 14.55 19.804 15.021 19.412 15.413C19.02 15.805 18.5493 16.0007 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7ZM2 4V2V14V4Z"
                                fill="url(#paint0_linear_105_790)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_105_790"
                                  x1="3.52298"
                                  y1="7.05377"
                                  x2="19.3215"
                                  y2="7.07272"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#91FF67" />
                                  <stop offset="1" stop-color="#4052FF" />
                                </linearGradient>
                              </defs>
                            </svg>{" "}
                            <p>
                              {user.emailIsVerified
                                ? "Почта верефецированна"
                                : "Подтвердите почтовый адрес"}
                            </p>
                          </button>
                          <button onClick={send2FAEmail} disabled={user.TwoFA}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19"
                              height="19"
                              viewBox="0 0 15 20"
                              fill="none"
                            >
                              <path
                                d="M1.875 20C1.35938 20 0.917814 19.8133 0.550314 19.44C0.182814 19.0667 -0.000623408 18.6184 1.59168e-06 18.0952V8.57143C1.59168e-06 8.04762 0.183751 7.59905 0.551251 7.22571C0.918751 6.85238 1.36 6.66603 1.875 6.66667H2.8125V4.7619C2.8125 3.44444 3.26969 2.32127 4.18406 1.39238C5.09844 0.463493 6.20375 -0.00063427 7.5 6.50534e-07C8.79688 6.50534e-07 9.9025 0.464445 10.8169 1.39333C11.7312 2.32222 12.1881 3.44508 12.1875 4.7619V6.66667H13.125C13.6406 6.66667 14.0822 6.85333 14.4497 7.22667C14.8172 7.6 15.0006 8.04825 15 8.57143V18.0952C15 18.619 14.8162 19.0676 14.4487 19.441C14.0812 19.8143 13.64 20.0006 13.125 20H1.875ZM1.875 18.0952H13.125V8.57143H1.875V18.0952ZM7.5 15.2381C8.01562 15.2381 8.45719 15.0514 8.82469 14.6781C9.19219 14.3048 9.37562 13.8565 9.375 13.3333C9.375 12.8095 9.19125 12.361 8.82375 11.9876C8.45625 11.6143 8.015 11.4279 7.5 11.4286C6.98438 11.4286 6.54281 11.6152 6.17531 11.9886C5.80781 12.3619 5.62438 12.8102 5.625 13.3333C5.625 13.8571 5.80875 14.3057 6.17625 14.679C6.54375 15.0524 6.985 15.2387 7.5 15.2381ZM4.6875 6.66667H10.3125V4.7619C10.3125 3.96825 10.0391 3.29365 9.49219 2.7381C8.94531 2.18254 8.28125 1.90476 7.5 1.90476C6.71875 1.90476 6.05469 2.18254 5.50781 2.7381C4.96094 3.29365 4.6875 3.96825 4.6875 4.7619V6.66667Z"
                                fill="url(#paint0_linear_105_794)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_105_794"
                                  x1="2.64223"
                                  y1="8.8172"
                                  x2="14.4911"
                                  y2="8.82573"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#91FF67" />
                                  <stop offset="1" stop-color="#4052FF" />
                                </linearGradient>
                              </defs>
                            </svg>{" "}
                            <p>
                              {user.TwoFA
                                ? "Двухфакторная защита подключена"
                                : "Включите двухфакторную защиту"}
                            </p>
                          </button>
                        </div>
                      </div>
                    </section>
                  )
                )}
              </div>

              <div className={style.account__rightmenu}>
                <RightMenu user={user} userIsLoaded={userIsLoaded} />
              </div>
            </div>

            <div className="footer">
              <div className={style.account__footer}>
                <Footer />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Account;
