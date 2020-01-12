import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const PasswordForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required")
});

class Passwordforgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {},
      error_message: null,
      avatar: ""
    };
  }

  submitForm = async formData => {
    await axios
      .post("http://localhost:8080/password/reset", formData)
      .then(res => {
        console.log(res.data.result);
        if (res.data.result === "success") {
          swal("Success!", res.data.message, "success").then(value => {
            //s window.location.reload();
          });
        } else if (res.data.result === "error") {
          swal("Error!", res.data.message, "error");
        }
      })
      .catch(error => {
        console.log(error);
        swal("Error!", "Unexpected error", "error");
      });
  };
  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    onSubmit,
    isSubmitting,
    setFieldValue
  }) => {
    return (
      <form role="form" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group  has-feedback">
            <label htmlFor="email">Email address</label>
            <input
              onChange={handleChange}
              value={values.email}
              type="email"
              className={
                errors.email && touched.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="email"
              placeholder="Enter email"
            />
            {errors.email && touched.email ? (
              <small id="passwordHelp" class="text-danger">
                {errors.email}
              </small>
            ) : null}
          </div>
        </div>
        {/* /.card-body */}
        <div class="row">
          <div class="col-12">
            <button
              type="submit"
              disable={isSubmitting}
              class="btn btn-primary btn-block"
            >
              Request new password
            </button>
          </div>
        </div>
      </form>
    );
  };

  render() {
    let result = this.state.response;
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="#">
              <b>Basic</b>POS
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                You forgot your password? Here you can easily retrieve a new
                password.
              </p>
              <Formik
                initialValues={{
                  email: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(values, this.props.history);
                  setSubmitting(false);
                }}
                validationSchema={PasswordForgotSchema}
              >
                {/* {this.showForm()}            */}
                {props => this.showForm(props)}
              </Formik>
                <p className="mb-0">
                  <Link to="/login">Login</Link>
                </p>

                <p className="mb-0">
                  <Link to="/register">Register a new membership</Link>
                </p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    );
  }
}

export default Passwordforgot;
