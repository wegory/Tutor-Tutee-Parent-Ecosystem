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

  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: color.grey,
    borderLeftWidth: 1,
    height: 70
  },

  infoContainer: {
    flex: 2.7,
    marginLeft: 20,
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
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },

  infoCol2: {
    flex: 1.3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  infoButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 25,
    borderRadius: 3,
    backgroundColor: "#FF553F",
    elevation: 3
  },

  editButton: {
    flex: 1,
    alignItems: "center"
  },

  editImage: {
    width: 30,
    height: 30
  },

  deleteButton: {
    flex: 1
  },

  deleteImage: {
    width: 20,
    height: 20
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

  status: {
    width: 30,
    height: 30,
    backgroundColor: color.white
  },

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
