import React, { Component } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class App extends Component {
  render() {
    // const {pathname} = this.props.location;
    return (
      <Router>
        <Switch>
          <div>
            {false && <Header />}
            {false && <Sidebar />}
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            {false && <Footer />}
          </div>
        </Switch>
      </Router>
    );
  }
}
