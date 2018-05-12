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
import TuitionForm from "../TuitionForm";
import { getTutorsForDisplay, addTuition } from "../../api";

const tuitionFields = [
  {
    key: "Remarks",
    label: "Remarks",
    placeholder: "Remarks",
    autoFocus: false,
    secureTextEntry: false,
    value: "",
    type: "text"
  }
];

const error = {
  Tuition: ""
};

export default class AddTuition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: error,
      // username: "",
      // profileImage: "NA",
      collectionTutors: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onGetTutors = this.onGetTutors.bind(this);
  }

  setTutors(collection) {
    this.setState({ collectionTutors: collection });
  }

  componentDidMount() {
    console.log("First childUID: " + this.props.childUID);
    this.onGetTutors();
  }

  componentWillUpdate(newprops) {
    if (newprops.childUID != this.props.childUID) {
      console.log("changed");
      this.onGetTutors(newprops.childUID);
    }
    // if (newprops.username != this.props.username) {
    //   console.log("changed");
    //   this.setState({ username: newprops.username });
    // }
    // if (newprops.profileImage != this.props.profileImage) {
    //   console.log("changed");
    //   this.setState({ profileImage: newprops.profileImage });
    // }
  }

  onGetTutors(childUID) {
    console.log("onGetTutors");
    var _this = this;
    getTutorsForDisplay(childUID, function(collection) {
      console.log(
        "collectionTutors in getTutors: " + JSON.stringify(collection)
      );
      if (typeof collection !== "undefined") {
        console.log("defined");
        _this.setTutors(collection);
      }
    });
  }

  setModalVisible() {
    console.log("called by onSucess of adding Child");
    this.props.getTuitionModal();
  }

  onSubmit(data) {
    _this = this;
    this.setState({ error: error }); //clear out error messages
    data["childUID"] = this.props.childUID;
    data["username"] = this.props.childUsername;
    data["profileImage"] =
      typeof this.props.childProfileImage == "undefined"
        ? "NA"
        : this.props.childProfileImage;
    console.log("Data: " + JSON.stringify(data));
    addTuition(data, function(success) {
      if (success) {
        console.log("add tuition success!");
        _this.onSuccess();
      }
    });
  }

  onSuccess() {
    console.log("add tutor success!");
    this.props.controlVisible(
      this.props.childUID,
      this.props.username,
      this.props.profileImage
    );
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
    console.log("props addTuition: " + JSON.stringify(this.props));
    console.log(
      "collectionTutors: " + JSON.stringify(this.state.collectionTutors)
    );
    // const collectionTutors = this.state.collectionTutors;
    // const nameKeys = Object.keys(collectionTutors);
    // const names = [];
    // nameKeys.map((key, index) => {
    //   names.push({
    //     value: collectionTutors[key].username
    //   });
    // });
    // console.log("Names: " + JSON.stringify(names));
    return (
      <Modal
        isVisible={this.props.tuitionFormModalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        onBackdropPress={() =>
          this.props.controlVisible(
            "NA",
            this.props.profileImage,
            this.props.username
          )
        }
        backdropOpacity={0.6}
        swipeDirection="left"
        style={styles.modal}
        onSwipe={() => {
          this.setModalVisible(false);
        }}
        onSwipeThreshold={20}
        animationOutTiming={200}
        animationInTiming={200}
        backdropTransitionOutTiming={200}
        backdropTransitionInTiming={200}
      >
        <View style={styles.popout}>
          <TuitionForm
            fields={tuitionFields}
            showLabel={false}
            onSubmit={this.onSubmit}
            buttonTitle={"Schedule"}
            error={this.state.error}
            collection={this.state.collectionTutors}
          />
        </View>
      </Modal>
    );
  }
}

// export default connect(null, { addAssignment })(AddAssignment);
