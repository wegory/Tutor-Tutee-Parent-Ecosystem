import React from "react";

var { View, StyleSheet, Text } = require("react-native");

// import { Button } from "react-native-elements";
// import { Actions } from "react-native-router-flux";
// import { connect } from "react-redux";

// import styles from "./styles";

// import { actions as auth, theme } from "../../../auth/index";
// import { checkRole } from "../../actions";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10
  }
});
