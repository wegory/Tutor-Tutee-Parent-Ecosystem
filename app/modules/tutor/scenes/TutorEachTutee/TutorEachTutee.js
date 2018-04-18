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
import { checkAssignmentChanges, getAssignments } from "../../api";
import styles from "./styles";
import EachAssignmentThumbnail from "../../components/EachAssignmentThumbnail/EachAssignmentThumbnail";

import AddAssignment from "../../components/AddAssignment/AddAssignment";

export default class TutorEachTutee extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      collectionAssignments: {}
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onGetAssignments = this.onGetAssignments.bind(this);
    this.setAssignments = this.setAssignments.bind(this);
    this.renderThumbnail = this.renderThumbnail.bind(this);
  }

  componentDidMount() {
    _this = this;
    _this.onGetAssignments();
    // checkChanges(function(changed) {
    //   if (changed) {
    //     console.log("hi");
    //     _this.setState({ change: !_this.state.change });
    //   }
    // });
    // if (changed) {
    //   // _this.setState({ change: !this.state.change });
    //   console.log("hi");
    // }
  }

  componentWillMount() {
    _this = this;
    checkAssignmentChanges(this.props.uid, function(changed) {
      if (changed) {
        console.log("hi");
        _this.onGetAssignments();
      }
    });
  }

  setAssignments(collectionAssignments) {
    this.setState({ collectionAssignments: collectionAssignments });
  }

  onGetAssignments() {
    var _this = this;
    getAssignments(this.props.uid, function(collection) {
      console.log(
        "collectionChildren in getChildren: " + JSON.stringify(collection)
      );
      _this.setAssignments(collection);
    });
  }

  renderThumbnail() {
    const thumbnails = this.state.collectionAssignments;
    const results = [];
    if (thumbnails !== null) {
      const keys = Object.keys(thumbnails);
      const thumbnailsController = keys.map((key, index) => {
        console.log("keys in renderThumbnail: " + key);

        results.push(
          <EachAssignmentThumbnail
            key={key}
            assignedDate={thumbnails[`${key}`].assignedDate}
            dueDate={thumbnails[`${key}`].dueDate}
            done={thumbnails[`${key}`].done}
            assignment={thumbnails[`${key}`].assignment}
            tutorUsername={thumbnails[`${key}`].tutor.username}
            assignmentUID={key}
          />
        );
      });
    }

    if (results === []) {
      results.push(
        <Text style={styles.emptyText}>
          You currently do not have any assignments!
        </Text>
      );
    }
    return results;
  }
  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    console.log("TutorEachTutee, props: " + JSON.stringify(this.props));
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardDismissMode="on-drag"
          alwaysBounceVertical={true}
          endFillColor="#EEEEEE"
        >
          {this.renderThumbnail()}
          {/* <View style={styles.taskContainer}>
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
          </View> */}
        </ScrollView>
        <AddAssignment
          isVisible={this.state.modalVisible}
          controlVisible={this.setModalVisible}
          tuteeUID={this.props.uid}
        />
        <ActionButton
          size={52}
          offsetY={20}
          offsetX={25}
          position="right"
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            this.setModalVisible();
          }}
        />
      </View>
    );
  }
}
