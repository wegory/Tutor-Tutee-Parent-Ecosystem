import React from "react";
var {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} = require("react-native");

import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import styles from "./styles";

import { actions as auth, theme } from "../../../auth/index";
import { checkRole } from "../../actions";

const { signOut } = auth;

const { color } = theme;

class TuteeSesh extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {};

  //   this.onSignOut = this.onSignOut.bind(this);
  // }

  // onSignOut() {
  //   this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this));
  // }

  // onSuccess() {
  //   Actions.reset("Auth");
  // }

  // onError(error) {
  //   Alert.alert("Oops!", error.message);
  // }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="on-drag"
        alwaysBounceVertical={true}
        endFillColor="#EEEEEE"
      >
        {/* {this.renderThumbnail()} */}
        <View style={styles.taskContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image1}
              source={require("../../../../assets/images/bradPitt.png")}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>01 May, 04:30pm</Text>
              <Text style={styles.infoTutor}>Brad Pitt</Text>
              <Text style={styles.infoDueDate}>Remarks: None</Text>
            </View>
            <View style={styles.infoCol2}>
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.taskContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image2}
              source={require("../../../../assets/images/jeremy.png")}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>02 May, 04:30pm</Text>
              <Text style={styles.infoTutor}>Jeremy Yew</Text>
              <Text style={styles.infoDueDate}>Remarks: Last tuition</Text>
            </View>
            <View style={styles.infoCol2}>
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.taskContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image2}
              source={require("../../../../assets/images/bradPitt.png")}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>01 May, 08:00pm</Text>
              <Text style={styles.infoTutor}>Brad Pitt</Text>
              <Text style={styles.infoDueDate}>Remarks: None</Text>
            </View>
            <View style={styles.infoCol2}>
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(null, { signOut })(TuteeSesh);
