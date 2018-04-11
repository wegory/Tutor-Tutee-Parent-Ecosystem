import { StyleSheet } from "react-native";
import * as theme from "../../styles/theme";
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = "contain";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
  },

  tabBarStyle: {
    height: normalize(45),
    backgroundColor: "#81C054",
    borderTopColor: "transparent",
    //iOS
    shadowColor: "#81C054",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 4,
      width: 0
    },
    //Andriod
    elevation: 5
  },

  labelStyle: {
    fontSize: fontSize.regular,
    color: "#FFFFFF",
    fontFamily: fontFamily.medium,
    marginBottom: padding,
    letterSpacing: 2
  },

  indicator: {
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 2
  },

  title: {
    fontSize: fontSize.large + 7,
    lineHeight: fontSize.large + 4,
    fontFamily: fontFamily.bold,
    color: color.white,
    letterSpacing: 1
  }
});

export default styles;
