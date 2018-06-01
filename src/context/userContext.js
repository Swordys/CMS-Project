import React, { Component } from "react";
import PropTypes from "prop-types";
import { retunUserAccount } from "../API/firestore";
import { returnUserId } from "../API/auth";

const UserContext = React.createContext();

export const UserConsumer = UserContext.Consumer;

/* eslint-disable react/no-did-mount-set-state */

export class UserProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    userSignedIn: false,
    userData: null
  };

  async componentDidMount() {
    const uid = returnUserId();
    const userData = await retunUserAccount(uid);
    this.setState({
      userData
    });
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
