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
              source={require("../../../../assets/images/profilePicture.png")}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>Problem 1 Ex 5a, 6b, 9a</Text>
              <Text style={styles.infoTutor}>Set by Mr Chia</Text>
              <Text style={styles.infoDueDate}>Due on: 5th March</Text>
            </View>
            <View style={styles.infoCol2}>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => addAssignment()}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.taskContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../../assets/images/profilePicture.png")}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>Problem 1 Ex 5a, 6b, 9a</Text>
              <Text style={styles.infoTutor}>Set by Mr Chia</Text>
              <Text style={styles.infoDueDate}>Due on: 5th March</Text>
            </View>
            <View style={styles.infoCol2}>
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.taskContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../../assets/images/profilePicture.png")}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>Problem 1 Ex 5a, 6b, 9a</Text>
              <Text style={styles.infoTutor}>Set by Mr Chia</Text>
              <Text style={styles.infoDueDate}>Due on: 5th March</Text>
            </View>
            <View style={styles.infoCol2}>
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
