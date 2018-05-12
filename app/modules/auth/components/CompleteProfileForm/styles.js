import { StyleSheet } from "react-native";

import { theme } from "../../index";
const { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  wrapper: {
    flex: 4,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  errorText: {
    color: color.red,
    width: windowWidth - 45,
    marginTop: 20
  },

  containerView: {
    marginVertical: padding * 3,
    width: windowWidth - 40
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
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium
  },

  forgotText: {
    textAlign: "center",
    color: color.black,
    marginBottom: padding,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium
  },

  role: {
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 40,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: "white",
    elevation: 3,
    marginTop: 10
  },

  roleActive: {
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 40,
    borderRadius: 3,
    backgroundColor: "#808080",
    borderWidth: 1,
    elevation: 3,
    marginTop: 10
  },

  roleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    flexDirection: "column"
  },

  header: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
    textAlign: "center",
    marginBottom: 30
  },

  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    marginBottom: 20,
    marginTop: 30
  },

  logo: {
    height: 70,
    marginTop: 40,
    width: 70
  }
});

export default styles;
