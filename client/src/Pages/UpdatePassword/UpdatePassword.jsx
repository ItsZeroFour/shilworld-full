import React, { useState } from "react";
import style from "./UpdatePassword.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import Header from "Components/Header/Header";

const UpdatePassword = ({ user, userIsLoaded }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { token } = useParams();

  const updatePassword = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`/user/resetPassword/${token}`, {
        password,
      });

      if (data) {
        alert("Пароль успешно обновлен!");
        navigate("/");
      } else {
        alert("Что-то пошло не так...");
      }
    } catch (err) {
      console.log(err);
      alert("Не удалось обновить пароль 500");
    }
  };

  return (
    <main className={style.updatepassword}>
      <div className="container">
        <Header user={user} userIsLoaded={userIsLoaded} />
        <form className={style.updatepassword__form}>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="New password"
          />
          <input
            type="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
          />

          {(password !== confirmPassword ||
            password === "" ||
            confirmPassword === "" ||
            password.length < 8) && <p>Password mismatch</p>}

          <button
            disabled={
              password !== confirmPassword ||
              password === "" ||
              confirmPassword === "" ||
              password.length < 8
            }
            onClick={updatePassword}
          >
            Update
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdatePassword;
