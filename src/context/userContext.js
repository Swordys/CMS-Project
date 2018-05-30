import React, { Component } from "react";
import { firebaseAuth } from "../firebase/index";

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

export class UserProvider extends Component {
  state = {
    signedIn: true,
    userData: null
  };

  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const userData = {
          phone: user.phoneNumber,
          uid: user.uid
        };
        this.setState({
          signedIn: true,
          userData
        });
      } else {
        this.setState({ signedIn: false, userData: null });
      }
    });
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          userState: {
            signedIn: this.state.signedIn,
            userData: this.state.userData
          }
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
