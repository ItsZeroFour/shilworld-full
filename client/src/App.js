import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { fetchGetUser, selectUser } from "redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import FAQ from "Pages/FAQ/FAQ";
import Rules from "Pages/Rules/Rules";
import Commands from "Pages/Commands/Commands";
import Forum from "Pages/Forum/Forum";
import Donat from "Pages/Donat/Donat";
import BanList from "Pages/BanList/BanList";
import Account from "Pages/Account/Account";
import NotFound from "Pages/NotFound/NotFound";
import CreatePost from "Pages/CreatePost/CreatePost";
import ForgotPassword from "Pages/ForgotPassword/ForgotPassword";
import UpdatePassword from "Pages/UpdatePassword/UpdatePassword";
import Form from "Pages/Form/Form";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser).data;
  const userIsLoaded = useSelector(selectUser).status === "loading";

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    token && dispatch(fetchGetUser());
  }, [dispatch, token]);

  return (
    <>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={<Home user={user} userIsLoaded={userIsLoaded} />}
          />
          <Route
            path="/faq"
            element={<FAQ user={user} userIsLoaded={userIsLoaded} />}
          />
          <Route
            path="/rules"
            element={<Rules user={user} userIsLoaded={userIsLoaded} />}
          />
          <Route
            path="/commands"
            element={<Commands user={user} userIsLoaded={userIsLoaded} />}
          />
          <Route
            path="/forum"
            element={<Forum user={user} userIsLoaded={userIsLoaded} />}
          />
          <Route
            path="/donat"
            element={<Donat user={user} userIsLoaded={userIsLoaded} />}
          />

          <Route
            path="/banlist"
            element={<BanList user={user} userIsLoaded={userIsLoaded} />}
          />

          <Route
            path="/account"
            element={<Account user={user} userIsLoaded={userIsLoaded} />}
          />

          <Route
            path="/create-post"
            element={<CreatePost user={user} userIsLoaded={userIsLoaded} />}
          />

          <Route path="/forgot-password" element={<ForgotPassword user={user} userIsLoaded={userIsLoaded} />} />
          <Route
            path="/forgot-password/update/:token"
            element={<UpdatePassword user={user} userIsLoaded={userIsLoaded} />}
          />

          <Route path="*" element={<NotFound />} />
          <Route path="/form" element={<Form user={user} userIsLoaded={userIsLoaded} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
