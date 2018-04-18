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
import { getAssignments } from "../../api";
import { checkChanges } from "../../api";
import AssignmentThumbnail from "../../components/AssignmentThumbnail/AssignmentThumbnail";
import styles from "./styles";

export default class TuteeAssignment extends React.Component {
  constructor() {
    super();
    this.state = {
      collectionAssignments: "NA"
      // change: "bye"
    };

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
    checkChanges(function(changed) {
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
    getAssignments(function(collection) {
      console.log(
        "collection in getAssignments: " + JSON.stringify(collection)
      );
      if (typeof collection !== "undefined") {
        console.log("defined");
        _this.setAssignments(collection);
      }
    });
  }

  renderThumbnail() {
    const thumbnails = this.state.collectionAssignments;
    const results = [];
    if (thumbnails !== "NA") {
      console.log("not empty");
      const keys = Object.keys(thumbnails);
      const thumbnailsController = keys.map((key, index) => {
        const tutorProfileImage =
          thumbnails[`${key}`].tutor.tutorProfileImage == undefined
            ? "NA"
            : thumbnails[`${key}`].tutor.tutorProfileImage;
        console.log("keys in renderThumbnail: " + key);
        results.push(
          <AssignmentThumbnail
            key={key}
            assignedDate={thumbnails[`${key}`].assignedDate}
            dueDate={thumbnails[`${key}`].dueDate}
            done={thumbnails[`${key}`].done}
            assignment={thumbnails[`${key}`].assignment}
            tutorUsername={thumbnails[`${key}`].tutor.username}
            tutorUID={thumbnails[`${key}`].tutor.uid}
            tutorProfileImage={tutorProfileImage}
            assignmentUID={key}
          />
        );
      });
    } else if (thumbnails == "NA") {
      results.push(
        <Text style={styles.emptyText} key={0}>
          You currently do not have any assignments!
        </Text>
      );
    }
    return results;
  }
  render() {
    return (
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
    );
  }
}
