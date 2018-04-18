import { StyleSheet } from "react-native";
import * as theme from "../../../../styles/theme";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = "contain";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#81C054",
    height: normalize(55),
    flexDirection: "row"
  },

  tuteeNavBarContainer: {
    width: "100%",
    backgroundColor: "#81C054",
    height: normalize(70),
    flexDirection: "row"
  },

  menu: {
    width: 64,
    color: color.white,
    marginTop: 30,
    textAlign: "center"
  },

  arrowBack: {
    width: 64,
    color: color.white,
    marginTop: 30,
    textAlign: "center"
  },

  search: {
    width: 64,
    color: "#535353",
    marginTop: 30,
    textAlign: "center"
  },

  header: {
    flex: 1,
    marginTop: 38,
    fontSize: fontSize.large,
    lineHeight: fontSize.large,
    fontFamily: fontFamily.bold,
    color: color.white,
    letterSpacing: 2,
    textAlign: "center"
  },

  menuContent: {
    marginTop: 14,
    fontSize: fontSize.large - 5,
    lineHeight: fontSize.large - 5,
    fontFamily: fontFamily.regular,
    color: color.grey,
    letterSpacing: 1
    // textAlign: "center"
  },

  menuContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
    // textAlign: "center"
  },

  name: {
    marginTop: -8,
    marginBottom: 10,
    fontSize: fontSize.regular + 2,
    lineHeight: fontSize.regular + 2,
    fontFamily: fontFamily.medium,
    color: color.black,
    letterSpacing: 2
  },

  imageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  image: {
    // marginTop: 150,
    // marginBottom: 10,
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: color.white
    // resizeMode
  },

  imageWithInitials: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "#FFA500"
    // resizeMode
  },

  initials: {
    marginTop: 8,
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
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: color.grey
    // resizeMode
  },

  popout: {
    flexDirection: "column",
    width: 240,
    height: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderEndColor: "grey",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
