import React, { Component } from "react";
import PropTypes from "prop-types";
import { firebaseAuth } from "../firebase/index";

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

export class UserProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    userSignedIn: false,
    userData: null
  };

  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // const userData = {
        //   phone: user.phoneNumber,
        //   uid: user.uid
        // };
        // this.loadUserData(user);
        // this.setState({
        //   userSignedIn: true,
        //   userData
        // });
      } else {
        this.setState({ userSignedIn: false, userData: null });
      }
    });
    // firebaseAuth.signOut();
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          userSignedIn: this.state.userSignedIn,
          userData: this.state.userData
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
