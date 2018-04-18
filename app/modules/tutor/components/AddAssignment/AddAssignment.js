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
import { actions as add } from "../../index";
import AssignmentForm from "../AssignmentForm";
// import { getChildren } from "../../api";

const { addAssignment } = add;

const assignmentFields = [
  {
    key: "Assignment",
    label: "Assignment",
    placeholder: "Assignment Title",
    autoFocus: true,
    secureTextEntry: false,
    value: "",
    type: "text"
  }
];

const error = {
  Assignment: ""
};

export default class AddAssignment extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error,
      username: "",
      profileImage: ""
      // collectionChildren: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setName = this.setName.bind(this);
    this.getProfileImage = this.getProfileImage.bind(this);
    this.setProfileImage = this.setProfileImage.bind(this);
  }
  setName(name) {
    this.setState({ username: name });
  }

  setProfileImage(picture) {
    this.setState({ profileImage: picture });
  }
  componentDidMount() {
    this.getUsername();
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
  setModalVisible() {
    console.log("called by onSucess of adding Child");
    this.props.controlVisible();
  }

  onSubmit(data) {
    this.setState({ error: error }); //clear out error messages
    data["tuteeUID"] = this.props.tuteeUID;
    data["username"] = this.state.username;
    data["profileImage"] = this.state.profileImage;
    addAssignment(data, this.onSuccess, this.onError);
  }

  onSuccess() {
    console.log("add tutor success!");
    this.setModalVisible();
  }

  onError(error) {
    let errObj = this.state.error;

    if (error.hasOwnProperty("message")) {
      errObj["general"] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      });
    }

    this.setState({ error: errObj });
  }
  render() {
    console.log("this.props.isVisible: " + this.props.isVisible);
    return (
      <Modal
        isVisible={this.props.isVisible}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        onBackdropPress={() => this.setModalVisible()}
        backdropOpacity={0.6}
        swipeDirection="left"
        style={styles.modal}
        onSwipe={() => {
          this.setModalVisible(false);
        }}
        onSwipeThreshold={20}
        animationOutTiming={200}
        animationInTiming={50}
        backdropTransitionOutTiming={100}
        backdropTransitionInTiming={0}
      >
        <View style={styles.popout}>
          <AssignmentForm
            fields={assignmentFields}
            showLabel={false}
            onSubmit={this.onSubmit}
            buttonTitle={"Assign"}
            error={this.state.error}
          />
        </View>
      </Modal>
    );
  }
}

// export default connect(null, { addAssignment })(AddAssignment);
