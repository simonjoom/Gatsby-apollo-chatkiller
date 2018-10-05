import React, { Component } from "react";
import { Router, Location } from "@reach/router";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Loading from "../components/error/Loading";
import NotAuth from "../components/error/NotAuth";
import "../index.css";
import "./index.scss";
import Col from "../reactLIB/Col"
import Badge from "../reactLIB/Badge"
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

class App extends Component {
  state = {
    isSideBarOpen: true,
    variant: "permanent",
    isMobile: false
  };
  componentDidMount() {
    console.log("Materialize Ready?", global.M);
    var elems = document.querySelectorAll(".collapsible");
    this.instances = global.M.Collapsible.init(elems, {});
  }

  componentWillUnmount() {
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
    const child = this.props.children;
    const Page = props => { 
      return (
        <div
          className="page"
          default={!!props.default}
          path={props.path}
          style={{ background: `hsl(${props.page * 75}, 60%, 60%)` }}
        >
          {child}
        </div>
      );
    };
    const propstoshare = this.props.children ? this.props.children.props : {};
    const { me: Me, validation } = this.props;

    return (
      <SideBarContext.Provider
        value={{
          state: this.state,
          Me: !Me.loading && !Me.error && Me.me
        }}
      >
        <div>
          <SideBar />
          <div
            style={{
              width: 350,
              position: "absolute",
              right: 0,
              bottom: 0,
              margin:10
            }}
          >
            <ul className="collapsible popout">
              <li>
                <div className="collapsible-body" style={{padding:0}}>
                  {Me.loading && <Loading />}
                  {!global.isSSR || (Me.error && <NotAuth />)}
                  <Header location={propstoshare.location} />
                  {!Me.loading &&
                    !Me.error &&
                    validation && (
                      <EmailValidated emailvalidated={Me.me.emailvalidated} />
                    )}

                  <FadeTransitionRouter propstoshare={propstoshare}>
                    <Page path="/car/create" />
                    <Page path="/car/:id" />
                    <Page path="/cars" />
                    <Page path="/drafts" />
                    <Page path="/users" />
                    <Page path="/user/create" />
                    <Page path="/user/:id" />
                    <Page path="/api" />
                    <Page path="/create" />
                    <Page path="/post/:id" />
                    <Page path="/login" />
                    <Page path="/signup" />
                    <Page path="/forgetPassword" />
                    <Page path="/resetPassword" />
                    <Page path="/updatePassword" />
                    <Page path="/validateEmail" />
                    <Page path="/" default/>
                  </FadeTransitionRouter>
                </div>
                <Col className="collapsible-header" style={collapsibleStyle}>
                    <i className="material-icons">chat</i>
                    Need Help?
                    <Badge newIcon>4</Badge>
                </Col>
              </li>
            </ul>
          </div>
        </div>
      </SideBarContext.Provider>
    );
  }
}
const collapsibleStyle={
  height:70, display:'flex', justifyContent:'center', alignItems:'center'
}

const FadeTransitionRouter = ({ propstoshare, children }) => {
  // const childrenpass = React.cloneElement(children, propstoshare);
  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={propstoshare.location.key}
        classNames="fade"
        timeout={{ enter: 500, exit: 300 }}
      >
        <Router location={propstoshare.location}>{children}</Router>
      </CSSTransition>
    </TransitionGroup>
  );
};

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
