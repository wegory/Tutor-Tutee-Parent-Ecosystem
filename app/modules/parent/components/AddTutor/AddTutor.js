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
import TutorForm from "../TutorForm";
// import { getChildren } from "../../api";

const { addTutor } = add;

const tutorFields = [
  {
    key: "TutorToken",
    label: "TutorToken",
    placeholder: "Tutor's Token",
    autoFocus: false,
    secureTextEntry: false,
    value: "",
    type: "text"
  }
];

const error = {
  TutorToken: ""
};

class AddTutor extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error
      // collectionChildren: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    // this.setChildren = this.setChildren.bind(this);
    // this.onGetChildren = this.onGetChildren.bind(this);
  }

  // componentDidMount() {
  //   this.onGetChildren();
  // }

  // setChildren(collectionChildren) {
  //   this.setState({ collectionChildren: collectionChildren });
  // }

  // onGetChildren() {
  //   var that = this;
  //   getChildren(function(collection) {
  //     console.log(
  //       "collectionChildren in getChildren: " + JSON.stringify(collection)
  //     );
  //     that.setChildren(collection);
  //   });
  // }

  setModalVisible(visible) {
    console.log("called by onSucess of adding Child");
    this.props.controlVisible(visible);
  }

  onSubmit(data) {
    this.setState({ error: error }); //clear out error messages
    this.props.addTutor(data, this.onSuccess, this.onError);
  }

  onSuccess() {
    console.log("add tutor success!");
    this.setModalVisible(false);
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
    // console.log(
    //   "collection State: " + JSON.stringify(this.state.collectionChildren)
    // );
    return (
      <Modal
        isVisible={true}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        onBackdropPress={() => this.setModalVisible(false)}
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
          {/* <View style={styles.menuContainer}> */}
          <TutorForm
            fields={tutorFields}
            showLabel={false}
            onSubmit={this.onSubmit}
            buttonTitle={"Add"}
            error={this.state.error}
          />
        </View>
        {/* </View> */}
      </Modal>
    );
  }
}

export default connect(null, { addTutor })(AddTutor);
