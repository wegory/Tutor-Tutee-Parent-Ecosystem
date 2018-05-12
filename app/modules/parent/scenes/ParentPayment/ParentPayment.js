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
import ActionButton from "react-native-action-button";
import styles from "./styles";

import { addAssignment } from "../../actions";

export default class ParentPayment extends React.Component {
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
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardDismissMode="on-drag"
          alwaysBounceVertical={true}
          endFillColor="#EEEEEE"
        >
          <View style={styles.taskContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../../../assets/images/jeremy.png")}
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoCol1}>
                <Text style={styles.infoTitle}>Jeremy Yew</Text>
                <Text style={styles.infoTutor}>Paid for May, $200</Text>
                <Text style={styles.infoDueDate}>Created on: 5th March</Text>
              </View>
              <View style={styles.infoCol2}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => addAssignment()}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.taskContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../../../assets/images/bradPitt.png")}
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoCol1}>
                <Text style={styles.infoTitle}>Brad Pitt</Text>
                <Text style={styles.infoTutor}>Paid for April, $500</Text>
                <Text style={styles.infoDueDate}>Created on: 5th March</Text>
              </View>
              <View style={styles.infoCol2}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => addAssignment()}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.taskContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../../../assets/images/jeremy.png")}
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoCol1}>
                <Text style={styles.infoTitle}>Jeremy</Text>
                <Text style={styles.infoTutor}>Paid for May, $500</Text>
                <Text style={styles.infoDueDate}>Created on: 5th March</Text>
              </View>
              <View style={styles.infoCol2}>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => addAssignment()}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <ActionButton
          size={52}
          offsetY={20}
          offsetX={25}
          position="right"
          buttonColor="rgba(231,76,60,1)"
        />
      </View>
    );
  }
}
