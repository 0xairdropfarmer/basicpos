import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const PasswordresetSchema = Yup.object().shape({
  password: Yup.string().required("New Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Both password need to be the same"
  )
});

class Passwordreset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {},
      error_message: null,
      avatar: ""
    };
  }

  submitForm = async (values, history, token) => {
    await axios
      .put("http://localhost:8080/password/reset?token=" + token, values)
      .then(res => {
        if (res.data.result === "success") {
          swal("Success!", res.data.message, "success").then(value => {
            history.push("/login");
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
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              onChange={handleChange}
              value={values.password}
              type="password"
              className={
                errors.password && touched.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="password"
              placeholder="Enter new password"
            />
            {errors.password && touched.password ? (
              <small id="passwordHelp" class="text-danger">
                {errors.password}
              </small>
            ) : null}
          </div>
          <div className="form-group  has-feedback">
            <label htmlFor="password">Confirm Password:</label>

            <input
              onChange={handleChange}
              value={values.confirm_password}
              type="password"
              className={
                errors.confirm_password && touched.confirm_password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="confirm_password"
              name="confirm_password  "
              placeholder="Enter password again"
            />
            {errors.confirm_password && touched.confirm_password ? (
              <small id="passwordHelp" class="text-danger">
                {errors.confirm_password}
              </small>
            ) : null}
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <button
              type="submit"
              disabled={isSubmitting}
              class="btn btn-primary btn-block"
            >
              Save new password
            </button>
          </div>
        </div>
      </form>
    );
  };

  render() {
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
                You are only one step a way from your new password, recover your
                password now.
              </p>
              <Formik
                initialValues={{
                  password: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(
                    values,
                    this.props.history,
                    this.props.match.params["token"]
                  );
                  setSubmitting(true);
                }}
                validationSchema={PasswordresetSchema}
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

export default Passwordreset;
