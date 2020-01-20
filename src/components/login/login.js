import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "username is Too Short!")
    .max(50, "username is Too Long!")
    .required("Username is Required"),
  password: Yup.string().required("Password is required")
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }
  componentDidMount() {
    if (localStorage.getItem("TOKEN_KEY") != null) {
        return this.props.history.goBack();
     }
   }
  submitForm = (values, history) => {
    console.log(values);
    axios
      .post("http://localhost:8080/login", values)
      .then(res => {
        if (res.data.result === "success") {
          localStorage.setItem("TOKEN_KEY", res.data.token);
          swal("Success!", res.data.message, "success").then(value => {
            history.push("/dashboard");
          });
        } else if (res.data.result === "error") {
          swal("Error!", res.data.message, "error");
        }
      })
      .catch(error => {
        console.log(error);
        swal("Error!", error, "error");
      });
  };
  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group input-group has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            className="form-control"
            placeholder="Username"
            className={
              errors.username && touched.username
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
          {errors.username && touched.username ? (
            <small id="passwordHelp" class="text-danger">
              {errors.username}
            </small>
          ) : null}
        </div>
        <div className="form-group input-group mb-3 has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            className="form-control"
            placeholder="Password"
            className={
              errors.password && touched.password
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
          {errors.password && touched.password ? (
            <small id="passwordHelp" class="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember Me</label>
            </div>
          </div>
          <div class="col-4">
            <button
              type="submit"
              disabled={isSubmitting}
              class="btn btn-primary btn-block"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    );
  };

  render() {
    return (
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">
            <b>Basic</b>POS
          </a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <Formik
              initialValues={{
                username: "",
                password: ""
              }}
              onSubmit={(values, { setSubmitting }) => {
                this.submitForm(values, this.props.history);
                setSubmitting(false);
              }}
              validationSchema={LoginSchema}
            >
              {/* {this.showForm()}            */}
              {props => this.showForm(props)}
            </Formik>
            <p class="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p class="mb-0">
              <Link to="/register">Register a new membership</Link>
            </p>
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
    );
  }
}

export default Login;
