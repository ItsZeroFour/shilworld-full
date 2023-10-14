import React, { useState } from "react";
import style from "./ForgotPassword.module.scss";
import axios from "../../utils/axios";
import Header from "Components/Header/Header";

const ForgotPassword = ({ user, userIsLoaded }) => {
  const [email, setEmail] = useState("");

  const sendEmailWithLinkForUpdatePassword = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/user/resetPasswordTokenEmail", {
        email,
      });

      if (data) alert("Преверьте вашу почту! Письмо было отправлено");
    } catch (err) {
      console.log(err);
      alert("Ошибка!");
    }
  };

  return (
    <main className={style.forgotpassword}>
      <div className="container">
        <Header user={user} userIsLoaded={userIsLoaded} />

        <form className={style.forgotpassword__form}>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <button
            disabled={!email}
            onClick={sendEmailWithLinkForUpdatePassword}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
