import React from "react";
import firebase from "../../firebase/firestoreAuth";

import "../../css/messageApp/login/login.css";

const Login = class extends React.Component {
  state = {
    phoneNumber: "",
    confirmCode: "",
    user: null,
    error: null
  };

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: () => {
          this.handleVerify();
        }
      }
    );
  }

  handleVerify = () => {
    console.log("Verified");
  };

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
        })
        .catch(error => {
          console.log(error);
        });
      this.setState({ phoneNumber: "" });
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
          this.setState({ user });
        })
        .catch(error => {
          this.setState({ error });
        });
      this.setState({ confirmCode: "" });
    }
  };

  render() {
    return (
      <div className="messenger-login-wrap">
        <div className="messenger-login-form-wrap">
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
          <div id="sign-in-button" />
        </div>
      </div>
    );
  }
};
export default Login;
