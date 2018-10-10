import React, { Component } from "react";
import { Router, Location } from "@reach/router";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Loading from "../components/error/Loading";
import NotAuth from "../components/error/NotAuth";
import "./index.scss";
import "../index.css";
/*import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'*/
import EmailValidated from "../components/nav/EmailValidated";
import Header from "../components/nav/layout/Header";
import NotFound from "../components/error/NotFound";
import SideBar from "../components/nav/layout/SideBar";
import { SideBarContext } from "../components/SideBarContext";
import UsersPage from "../components/user/UsersPage";
import UserPageCreate from "../components/user/UserPageCreate";
import UserPage from "../components/user/UserPage";
/*import CreateCar from "../components/car/CreateCar";
import DetailCar from "../components/car/DetailCar";
import CarsPage from "../components/car/CarsPage";
import Api from "../components/api/Api";*/
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

class App extends Component {
  state = {
    isSideBarOpen: true,
    variant: "permanent",
    isMobile: false
  };
  componentDidMount() {
    console.log("mountLayout")
    console.log("Materialize Ready?", global.M);
    var elems = document.querySelectorAll(".collapsible");
    this.instances = global.M.Collapsible.init(elems, {});
  }

  componentWillUnmount() {
    console.log("unmountLayout")
    if (this.instance) {
      this.instance.destroy();
    }
  }

  /*
  toggleDrawer = isSideBarOpen => () => {
    if (!isSideBarOpen && !this.isMobile()) {
      return;
    }
    this.setState({
      isSideBarOpen: isSideBarOpen
    });
  };*/
  /*
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.setState({
      isMobile: this.isMobile(),
      variant: this.isMobile() ? "persistent" : "permanent"
      //   isSideBarOpen: this.isMobile() ? false : true
    });
  }

  resize = () => {
    this.setState({
      isMobile: this.isMobile(),
      variant: this.isMobile() ? "persistent" : "permanent"
      //    isSideBarOpen: this.isMobile() ? false : true
    });
  };*/

  isMobile = () => (window.innerWidth < 600 ? true : false);

  render() {
    const location = this.props.location;

  const authToken = (process.env.GATSBY_BUILD_STAGE!=="build-html") && localStorage.getItem(AUTH_TOKEN)||true;

    const Page = props => {
      return (
        <div
          className="page"
        >
          {props.page}
        </div>
      );
    };
    const { me: Me, validation } = this.props;

    return (
      <SideBarContext.Provider
        value={{
          state: this.state,
          Me: !Me.loading && !Me.error && Me.me
        }}
      >
        <div>
          <div
            style={{
              width: 600,
              position: "absolute",
              right: 0,
              bottom: 0
            }}
          >
            <ul className="collapsible popout">
              <li>
                <div className="collapsible-body">
                <div className="md-grid">
                  <SideBar />
                  <div className="md-cell md-cell--10">
                  {Me.loading && <Loading />}
                  {(process.env.GATSBY_BUILD_STAGE!=="build-html") && (Me.error && <NotAuth />)}
                  <Header location={location} />
                  {!Me.loading &&
                    !Me.error &&
                    validation && (
                      <EmailValidated emailvalidated={Me.me.emailvalidated} />
                    )}

                  <FadeTransitionRouter location={location}>
                     <Page path="/z/users" page={<UsersPage />} />
                      <Page path="/z/user/create" page={<UserPageCreate />} />
                      <Page
                        path="/z/user/:id"
                        page={<UserPage path="/z/user/:id" />}
                      />
                      <Page path="/z/chats" page={<ChatsPage />} />
                      <Page path="/z/login" page={<Login />} />
                      <Page path="/z/signup" page={<Signup />} />
                      <Page
                        path="/z/forgetPassword"
                        page={<ForgetPassword />}
                      />
                      <Page path="/z/resetPassword" page={<ResetPassword />} />
                      <Page
                        path="/z/updatePassword"
                        page={<UpdatePassword />}
                      />
                      <Page path="/z/validateEmail" page={<ValidateEmail />} />
                      <Page
                        path="/"
                        default
                        page={
                          !authToken ? (
                            <Login path="/" />
                          ) : (
                            <ChatsPage path="/" />
                          )
                        }
                      />
                  </FadeTransitionRouter>
                </div>
                </div>
                </div>
                <div className="collapsible-header">
                  <i className="material-icons">whatshot</i>
                  OPENCHAT
                </div>
              </li>
            </ul>
          </div>
        </div>
        {this.props.children}
      </SideBarContext.Provider>
    );
  }
}

const FadeTransitionRouter = ({ location, children }) => {
  // const childrenpass = React.cloneElement(children, propstoshare);
  return (
      <TransitionGroup className="transition-group">
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
          >
            <Router location={location} className="router">{children}</Router>
          </CSSTransition>
        </TransitionGroup>
  );
}

const USER_QUERY = gql`
  query Me {
    me {
      id
      role
      emailvalidated
    }
  }
`;

App.defaultProps = {
  validation: false
};
export default compose(
  graphql(USER_QUERY, {
    name: "me",
    options: props => {
      return {
        fetchPolicy: "cache-and-network",
        ssr: false
      };
    }
  })
)(App);

/*
              <Switch>
                <Route exact path='/' component={FeedPage} />
                <Route path='/car/create' component={CreateCar} />
                <Route path='/car/:id' component={DetailCar} />
                <Route path='/drafts' component={DraftsPage} />
                <Route path='/cars' component={CarsPage} />
                <Route path='/chats' component={ChatsPage} />
                <Route path='/users' component={UsersPage} />
                <Route path='/user/create' component={UserPageCreate} />
                <Route path='/user/:id' component={UserPage} />
                <Route path='/api' component={Api} />
                <Route path='/create' component={CreatePage} />
                <Route path='/post/:id' component={DetailPage} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/forgetPassword' component={ForgetPassword} />
                <Route path='/resetPassword' component={ResetPassword} />
                <Route path='/updatePassword' component={UpdatePassword} />
                <Route path='/validateEmail' component={ValidateEmail} />
                <Route component={NotFound} />
              </Switch>*/
