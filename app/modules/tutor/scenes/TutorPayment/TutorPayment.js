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

import { addAssignment } from "../../actions";

export default class TutorPayment extends React.Component {
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
        <View style={styles.taskContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../../assets/images/juliette.jpg")}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>Juliette Chia</Text>
              <Text style={styles.infoTutor}>Paid for May, $200</Text>
              <Text style={styles.infoDueDate}>Created on: 5th March</Text>
            </View>
            <View style={styles.infoCol2}>
              {/* <TouchableOpacity
                style={styles.infoButton}
                onPress={() => addAssignment()}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        <View style={styles.taskContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../../assets/images/aaron.jpg")}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>Aaron Pang</Text>
              <Text style={styles.infoTutor}>Paid for April, $200</Text>
              <Text style={styles.infoDueDate}>Created on: 28 April</Text>
            </View>
            <View style={styles.infoCol2}>
              {/* <TouchableOpacity
                style={styles.infoButton}
                onPress={() => addAssignment()}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        <View style={styles.taskContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../../assets/images/juliette.jpg")}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>Juliette Chia</Text>
              <Text style={styles.infoTutor}>Paid for April, $500</Text>
              <Text style={styles.infoDueDate}>Created on: 27 April</Text>
            </View>
            <View style={styles.infoCol2}>
              {/* <TouchableOpacity
                style={styles.infoButton}
                onPress={() => addAssignment()}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
