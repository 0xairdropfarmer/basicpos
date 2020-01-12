import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import Passwordreset from "./components/passwordreset";
import Passwordforgot from "./components/passwordforgot";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
const isLoggedIn = () => {
  return localStorage.getItem("TOKEN_KEY") != null;
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // ternary condition

      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
export default class App extends Component {
  componentWillUpdate(nextProps, nextState) {
    console.log("update");
  }

  render() {
    // const {pathname} = this.props.location;
    return (
      <Router>
        <Switch>
          <div>
            {isLoggedIn() && <Header />}
            {isLoggedIn() && <Sidebar />}
            <Route path="/register" component={Register} />
            <Route path="/login/:notify?" component={Login} />
            <Route path="/password/reset/:token" component={Passwordreset} />
            <Route path="/password/forgot" component={Passwordforgot} />
            <SecuredRoute path="/dashboard" component={Dashboard} />
            <SecuredRoute path="/profile" component={Profile} />
            {isLoggedIn() && <Footer />}
          </div>
        </Switch>
      </Router>
    );
  }
}
