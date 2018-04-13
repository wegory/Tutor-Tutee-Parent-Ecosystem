import { StyleSheet } from "react-native";

import { theme } from "../../index";
const { windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },

  inputContainer: {
    width: 190,
    height: normalize(55),
    fontSize: fontSize.regular,
    fontFamily: fontFamily.bold,
    borderBottomColor: "#A5A7A9"
  }
});

export default styles;
