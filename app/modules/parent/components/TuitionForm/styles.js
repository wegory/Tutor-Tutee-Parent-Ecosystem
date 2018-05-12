import { StyleSheet } from "react-native";

import { theme } from "../../index";
const { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;
const resizeMode = "contain";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },

  wrapper: {
    justifyContent: "center",
    alignItems: "center"
  },

  errorText: {
    color: color.red,
    width: 190,
    marginTop: 3,
    textAlign: "center"
  },

  text: {
    textAlign: "center",
    color: color.grey,
    marginRight: padding,
    marginLeft: padding,
    marginTop: 30,
    // marginBottom: padding,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium
  },

  image: {
    marginTop: 20,
    height: 100,
    width: 100,
    backgroundColor: color.white,
    marginBottom: padding,
    resizeMode
  },

  containerView: {
    marginVertical: padding * 3,
    width: windowWidth - 40
  },

  containerDropdown: {
    height: 70,
    width: 190,
    marginBottom: 3
  },

  labelFontSize: {
    fontSize: 11
  },

  // textColor: {
  //   color: color.black
  // },

  // socialButton: {
  //   height: normalize(55),
  //   borderRadius: 4,
  //   marginTop: 0,
  //   marginBottom: 0
  // },

  selectedChildButton: {
    // marginTop: 10,
    backgroundColor: "#FF553F",
    height: normalize(35),
    width: normalize(90)
  },

  unselectedChildButton: {
    // marginTop: 10,
    backgroundColor: color.grey,
    height: normalize(35),
    width: normalize(90)
  },

  buttonText: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium
  },

  label: {
    marginTop: 10,
    backgroundColor: color.grey,
    height: normalize(35),
    width: normalize(90)
  },

  labelText: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium
  },

  datePicker: {
    width: windowWidth - 50 - 40,
    marginBottom: 10,
    marginTop: 5
  },

  forgotText: {
    textAlign: "center",
    color: color.black,
    marginBottom: padding,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium
  }
});

export default styles;
