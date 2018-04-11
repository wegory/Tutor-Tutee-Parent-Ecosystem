import React from "react";
var { View, StyleSheet, Alert } = require("react-native");

import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import styles from "./styles";

import { actions as auth, theme } from "../../../auth/index";
import { checkRole } from "../../actions";

const { signOut } = auth;

const { color } = theme;

class TuteeSesh extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {};

  //   this.onSignOut = this.onSignOut.bind(this);
  // }

  // onSignOut() {
  //   this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this));
  // }

  // onSuccess() {
  //   Actions.reset("Auth");
  // }

  // onError(error) {
  //   Alert.alert("Oops!", error.message);
  // }

  render() {
    return <View style={styles.container} />;
  }
}

export default connect(null, { signOut })(TuteeSesh);
