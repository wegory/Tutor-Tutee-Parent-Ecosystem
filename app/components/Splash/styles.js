import { StyleSheet } from "react-native";

import { color, fontFamily, padding, fontSize } from "../../styles/theme";

const resizeMode = "contain";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#81C054"
  },

  wrapper: {
    paddingHorizontal: 15,
    paddingBottom: padding * 2,
    justifyContent: "center",
    alignItems: "center"
  },

  image: {
    height: 100,
    width: 100,
    backgroundColor: "#81C054",
    marginBottom: padding,
    resizeMode
  },

  title: {
    fontSize: fontSize.large,
    lineHeight: fontSize.large,
    fontFamily: fontFamily.medium,
    color: color.white,
    letterSpacing: 1
  },

  activityIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    height: 50
  },

  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80
  }
});

export default styles;
