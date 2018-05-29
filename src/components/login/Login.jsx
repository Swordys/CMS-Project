import React, { Component } from "react";
import { GridLoader } from "react-spinners";
import firebase from "../../firebase/firestoreAuth";

import "../../css/messageApp/login/login.css";

const Login = class extends Component {
  state = {
    phoneNumber: "",
    confirmCode: "",
    numberLoading: false,
    numberSuccess: false,
    codeLoading: false,
    codeSuccess: false,
    user: null,
    error: null
  };

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible"
      }
    );
  }

  handleSubmitNumber = e => {
    e.preventDefault();
    const { phoneNumber } = this.state;
    if (phoneNumber) {
      this.setState({
        numberLoading: true
      });
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          this.setState({
            numberSuccess: true,
            numberLoading: false
          });
        })
        .catch(error => {
          this.setState({ error, numberLoading: false });
        });
    }
  };

  handleConfirmCode = e => {
    e.preventDefault();
    const { confirmCode } = this.state;
    if (confirmCode) {
      this.setState({
        codeLoading: true
      });
      window.confirmationResult
        .confirm(this.state.confirmCode)
        .then(result => {
          const { user } = result.user;
          this.setState({ user, codeLoading: false, codeSuccess: true });
        })
        .catch(error => {
          this.setState({ error, codeLoading: false });
        });
    }
  };

  render() {
    const loading = stateItem =>
      this.state[stateItem] ? (
        <div className="input-loader-wrap">
          <GridLoader size={8} color="#466edc" />
        </div>
      ) : null;

    return (
      <div className="messenger-login-page-wrap">
        <div className="messenger-login-wrap">
          <div
            style={{
              transform: `${
                this.state.numberSuccess
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(0, 55px, 0)"
              }`
            }}
            className="messenger-login-banner"
          />
          <div
            style={{
              transform: `${
                this.state.numberSuccess
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(0, 55px, 0)"
              }`
            }}
            className="messenger-login-form-wrap"
          >
            <form
              className="messenger-login-form"
              onSubmit={this.handleSubmitNumber}
            >
              <label htmlFor="input-number">
                SIGN IN
                <input
                  readOnly={this.state.numberSuccess}
                  placeholder="Mobile Number"
                  id="input-number"
                  className="login-form-input"
                  value={this.state.phoneNumber}
                  onChange={({ target }) => {
                    this.setState({ phoneNumber: target.value });
                  }}
                  type="text"
                />
              </label>
            </form>
            {loading("numberLoading")}
          </div>
          <div
            style={{
              transform: `${
                this.state.numberSuccess
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(0, -58px, 0)"
              }`,
              opacity: `${this.state.numberSuccess ? "1" : "0.5"}`
            }}
            className="messenger-login-form-wrap"
          >
            <form
              className="messenger-login-form"
              onSubmit={this.handleConfirmCode}
            >
              <label htmlFor="input-number">
                VERIFY
                <input
                  readOnly={!this.state.numberSuccess}
                  placeholder="Verification Code"
                  id="input-code"
                  className="login-form-input"
                  value={this.state.confirmCode}
                  onChange={({ target }) => {
                    this.setState({ confirmCode: target.value });
                  }}
                  type="text"
                />
              </label>
            </form>
            {loading("codeLoading")}
          </div>
        </div>
        <div id="sign-in-button" />
      </div>
    );
  }
};
export default Login;
