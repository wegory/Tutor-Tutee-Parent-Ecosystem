import React from "react";
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet
} from "react-native";
import Modal from "react-native-modal";
import { AsyncStorage } from "react-native";
import firebase from "firebase";
import {
  Scene,
  Router,
  ActionConst,
  Stack,
  Tabs,
  Drawer
} from "react-native-router-flux";
import styles from "./styles";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Icon, ThemeProvider } from "react-native-material-ui";
import { actions as auth } from "./index";
import Settings from "./SideMenu/Settings";

const { signOut } = auth;

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      username: "Loading",
      profileImage: null,
      role: null
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.setName = this.setName.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.getProfileImage = this.getProfileImage.bind(this);
    this.setProfileImage = this.setProfileImage.bind(this);
    this.getInitialsFromName = this.getInitialsFromName.bind(this);
    this.getRole = this.getRole.bind(this);
    this.setRole = this.setRole.bind(this);
  }

  setName(name) {
    this.setState({ username: name });
  }

  setProfileImage(picture) {
    this.setState({ profileImage: picture });
  }

  setRole(role) {
    this.setState({ role: role });
  }

  componentDidMount() {
    this.getUsername();
    this.getProfileImage();
    this.getRole();
  }

  async getUsername() {
    AsyncStorage.getItem("user")
      .then(res => {
        res = JSON.parse(res);
        console.log("res: " + JSON.stringify(res));
        this.setName(res.user.username);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getProfileImage() {
    AsyncStorage.getItem("user")
      .then(res => {
        res = JSON.parse(res);
        console.log("res: " + JSON.stringify(res));
        if (typeof res.user.profileImage !== "undefined") {
          this.setProfileImage(res.user.profileImage);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getRole() {
    AsyncStorage.getItem("user")
      .then(res => {
        res = JSON.parse(res);
        console.log("res: " + JSON.stringify(res));
        this.setRole(res.user.role);
      })
      .catch(error => {
        console.log(error);
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onSignOut() {
    this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this));
  }

  getInitialsFromName(username) {
    var string = this.state.username;
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
    return initials;
  }

  onSuccess() {
    Actions.reset("Auth");
  }

  onError(error) {
    Alert.alert("Oops!", error.message);
  }

  render() {
    console.log(this.state.username);
    // console.log(this.state.profileImage);
    console.log("role: " + this.state.role);
    const initials = this.getInitialsFromName(this.state.username);
    console.log("initials: " + initials);
    const profileImage = { uri: this.state.profileImage };
    const displayInitials = (
      <View style={styles.imageWithInitials}>
        <Text style={styles.initials}>{this.state.username}</Text>
      </View>
    );
    const displayImage = <Image style={styles.image} source={profileImage} />;
    const display =
      typeof this.state.profileImage == null ? displayInitials : displayImage;
    const displayRole =
      this.state.role == "tutee" ? (
        <Text style={styles.header}>Genius</Text>
      ) : this.state.role == "tutor" ? (
        <Text style={styles.header}>Student's Name</Text>
      ) : (
        <Text style={styles.header}>Child's Name</Text>
      );

    return (
      <View>
        <ThemeProvider>
          <View style={styles.tuteeNavBarContainer}>
            <TouchableOpacity
              onPress={() => {
                Actions.pop();
              }}
            >
              <Icon name="arrow-back" style={[styles.arrowBack]} size={30} />
            </TouchableOpacity>
            {displayRole}
            <Icon name="search" style={[styles.search]} size={30} />
          </View>
        </ThemeProvider>
      </View>
    );
  }
}

export default connect(null, { signOut })(NavBar);
