import { StyleSheet } from "react-native";

import { theme } from "../../index";
const { windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },

  inputContainer: {
    width: windowWidth - 50 - 60,
    height: normalize(55),
    fontSize: fontSize.regular,
    fontFamily: fontFamily.bold
    // borderWidth: 1,
    // borderBottomColor: "#A5A7A9",
    // borderTopColor: "#A5A7A9",
    // borderLeftColor: "#A5A7A9",
    // borderRightColor: "#A5A7A9"
  }
});

export default styles;
