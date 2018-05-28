import React from "react";
import firebase from "../../firebase/firestoreAuth";

import "../../css/messageApp/login/login.css";

const Login = class extends React.Component {
  state = {
    phoneNumber: "",
    confirmCode: "",
    numberConfirm: false,
    codeConfirm: false,
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
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          this.setState({
            numberConfirm: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleConfirmCode = e => {
    e.preventDefault();
    const { confirmCode } = this.state;
    if (confirmCode) {
      window.confirmationResult
        .confirm(this.state.confirmCode)
        .then(result => {
          const { user } = result.user;
          this.setState({ user, codeConfirm: true });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  };

  render() {
    return (
      <div className="messenger-login-wrap">
        <div
          style={{
            transform: `${
              this.state.numberConfirm
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
                placeholder="Mobile number"
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
        </div>
        <div
          style={{
            transform: `${
              this.state.numberConfirm
                ? "translate3d(0, 0, 0)"
                : "translate3d(0, -55px, 0)"
            }`,
            zIndex: `${this.state.numberConfirm ? "1" : "-1"}`
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
                placeholder="Verification code"
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
        </div>
        <div id="sign-in-button" />
      </div>
    );
  }
};
export default Login;
