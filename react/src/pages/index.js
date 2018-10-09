import React from "react";
import UsersPage from "../components/user/UsersPage";
import UserPageCreate from "../components/user/UserPageCreate";
import UserPage from "../components/user/UserPage";
import CreateCar from "../components/car/CreateCar";
import DetailCar from "../components/car/DetailCar";
import CarsPage from "../components/car/CarsPage";
import Api from "../components/api/Api";
import ForgetPassword from "../components/user/auth/ForgetPassword";
import Login from "../components/user/auth/Login";
import Signup from "../components/user/auth/Signup";
import ResetPassword from "../components/user/auth/ResetPassword";
import UpdatePassword from "../components/user/auth/UpdatePassword";
import ValidateEmail from "../components/user/auth/ValidateEmail";
import DraftsPage from "../components/post/DraftsPage";
import CreatePage from "../components/post/CreatePage";
import DetailPage from "../components/post/DetailPage";
import FeedPage from "../components/post/FeedPage";
import ChatsPage from "../components/chat/ChatsPage";
import { AUTH_TOKEN } from "../constants/constants";

export default props => {
  const authToken = global.isSSR || localStorage.getItem(AUTH_TOKEN);
  const { location } = props;
//select correct component for correct location
// if noauthtoken show login page by default else show chatslist

  const Comp =
    location.pathname == "/z/user/create"
      ? UserPageCreate
      : location.pathname == "/z/users"
        ? UsersPage
        : location.pathname.indexOf("/z/user/") == !-1 //:id
          ? UserPage
          : location.pathname == "/z/car/create"
            ? CreateCar
            : location.pathname == "/z/cars"
              ? CarsPage
              : location.pathname == "/z/api"
                ? Api
                : location.pathname.indexOf("/z/car/") == !-1 //:id
                  ? DetailCar
                  : location.pathname == "/z/create"
                    ? CreatePage
                    : location.pathname == "/z/drafts"
                      ? DraftsPage
                      : location.pathname == "/z/login"
                        ? Login
                        : location.pathname == "/z/posts"
                          ? FeedPage
                          : location.pathname.indexOf("/z/post/") == !-1 //:id
                            ? DetailPage
                            : location.pathname == "/z/forgetPassword"
                              ? ForgetPassword
                              : location.pathname == "/z/resetPassword"
                                ? ResetPassword
                                : location.pathname == "/z/updatePassword"
                                  ? UpdatePassword
                                  : location.pathname == "/z/validateEmail"
                                    ? ValidateEmail
                                    : location.pathname == "/z/signup"
                                      ? Signup
                                      : !authToken
                                        ? Login
                                        : ChatsPage;
  return <Comp {...props} />;
};
