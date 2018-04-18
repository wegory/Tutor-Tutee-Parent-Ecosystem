import { StyleSheet } from "react-native";
import { theme } from "../../index";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = "contain";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  contentContainer: {
    flexDirection: "column",
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE"
  },

  taskContainer: {
    marginTop: 7.5,
    marginBottom: 7.5,
    width: "95%",
    height: 90,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.white,
    elevation: 2,
    borderColor: color.grey,
    elevation: 3
  },

  imageContainer: {
    flex: 1,
    marginLeft: 15
  },

  infoContainer: {
    flex: 3,
    backgroundColor: color.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  infoTitle: {
    // marginTop: 10,
    fontSize: fontSize.regular,
    lineHeight: fontSize.regular,
    fontFamily: fontFamily.bold,
    color: color.black,
    letterSpacing: 1,
    marginBottom: 7
  },

  infoTutor: {
    fontSize: fontSize.small,
    lineHeight: fontSize.small,
    fontFamily: fontFamily.regular,
    color: color.black,
    letterSpacing: 1,
    marginBottom: 3
  },

  infoDueDate: {
    fontSize: fontSize.small,
    lineHeight: fontSize.small,
    fontFamily: fontFamily.medium,
    color: color.black,
    letterSpacing: 1
  },

  infoCol1: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },

  infoCol2: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },

  infoButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 25,
    borderRadius: 3,
    backgroundColor: "#81C054",
    elevation: 3
  },

  buttonText: {
    fontSize: fontSize.regular - 2,
    fontFamily: fontFamily.bold,
    color: color.white
  },

  // imageContainer: {
  //   flex: 1,
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center"
  // },

  // image: {
  //   // marginTop: 150,
  //   // marginBottom: 10,
  //   width: 80,
  //   height: 80,
  //   borderRadius: 80 / 2,
  //   backgroundColor: color.white
  //   // resizeMode
  // },
  image: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode
  },

  imageWithInitials: {
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // width: 80,
    // height: 80,
    // borderRadius: 80 / 2,
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    // resizeMode,
    backgroundColor: "#FFA500"
    // resizeMode
  },

  initials: {
    marginTop: 17,
    fontSize: fontSize.large + 12,
    lineHeight: fontSize.large + 12,
    fontFamily: fontFamily.extrabold,
    color: color.white,
    letterSpacing: 2,
    textAlign: "center"
    // resizeMode
  },

  imagePlaceholder: {
    // marginTop: 150,
    // marginBottom: 10,
    // width: 80,
    // height: 80,
    // borderRadius: 80 / 2,
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode,
    backgroundColor: color.grey
    // resizeMode
  }
});

export default styles;
