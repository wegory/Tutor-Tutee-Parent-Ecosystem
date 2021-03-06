import { StyleSheet } from "react-native";
import { theme } from "../../index";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = "contain";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
  },

  topContainer: {
    flex: 0.95,
    paddingHorizontal: 15,
    paddingBottom: padding * 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#81C054"
  },

  image: {
    height: 200,
    width: 200,
    // backgroundColor: color.grey,
    // backgroundColor: "#81C054",
    backgroundColor: "transparent",
    marginBottom: padding,
    resizeMode
  },

  title: {
    marginTop: 5,
    fontSize: fontSize.large + 10,
    lineHeight: fontSize.large + 10,
    fontFamily: fontFamily.bold,
    color: color.white,
    letterSpacing: 1
  },

  subText: {
    color: "#414141",
    fontSize: fontSize.large,
    lineHeight: fontSize.large + 10,
    marginVertical: padding * 2
  },

  //===============================

  bottomContainer: {
    backgroundColor: "white",
    paddingVertical: padding * 4,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  containerView: {
    width: windowWidth - 90
  },

  socialButton: {
    height: normalize(55),
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 0
  },

  button: {
    backgroundColor: "#FF553F",
    height: normalize(55)
  },

  buttonText: {
    fontSize: fontSize.regular - 1,
    fontFamily: fontFamily.medium
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: padding * 2
  },

  bottomText: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
    marginRight: 5,
    color: "#414141"
  },

  signInText: {
    fontSize: fontSize.regular,
    color: "#FF553F",
    fontFamily: fontFamily.medium
  },

  orContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: windowWidth
  },

  divider: {
    backgroundColor: "#D0D5DA",
    position: "absolute",
    top: 19,
    left: 20,
    right: 20
  },

  orText: {
    backgroundColor: color.white,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
    color: "#414141",
    paddingHorizontal: padding
  }
});

export default styles;
