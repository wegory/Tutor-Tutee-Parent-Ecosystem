import React from "react";
var {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} = require("react-native");

import store from "../../../../redux/store";
import EachAssignmentThumbnail from "../../components/EachAssignmentThumbnail/EachAssignmentThumbnail";
import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import styles from "./styles";
import { checkAssignmentChanges } from "../../api";
import { addAssignment } from "../../actions";
import { getAssignments } from "../../api";

export default class ParentEachChild extends React.Component {
  constructor() {
    super();
    this.state = {
      collectionAssignments: ""
    };

    this.onGetAssignments = this.onGetAssignments.bind(this);
    this.setAssignments = this.setAssignments.bind(this);
    this.renderThumbnail = this.renderThumbnail.bind(this);
  }

  componentDidMount() {
    this.onGetAssignments();
  }

  componentWillMount() {
    _this = this;
    checkAssignmentChanges(_this.props.childUID, function(changed) {
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
    getAssignments(_this.props.childUID, function(collection) {
      console.log(
        "collectionAssignments in getAssignments: " + JSON.stringify(collection)
      );
      if (collection !== null) {
        _this.setAssignments(collection);
      }
    });
  }

  renderThumbnail() {
    const thumbnails = this.state.collectionAssignments;
    const results = [];
    console.log("thumbnails: " + JSON.stringify(thumbnails));
    if (thumbnails !== "") {
      console.log("not empty");
      const keys = Object.keys(thumbnails);
      const thumbnailsController = keys.map((key, index) => {
        var obj = thumbnails[`${key}`];
        var tutor = obj["tutor"];
        // console.log("obj: " + JSON.stringify(obj));
        // console.log("tutor: " + JSON.stringify(tutor));
        // console.log("tutor: " + tutor);
        // console.log("tutor.profileImage: " + tutor.profileImage);
        // console.log(JSON.stringify(obj.tutor));
        const tutorProfileImage = obj.tutor.profileImage
          ? obj.tutor.profileImage
          : "NA";
        console.log("keys in renderThumbnail: " + key);
        results.push(
          <EachAssignmentThumbnail
            key={key}
            assignedDate={obj.assignedDate}
            dueDate={obj.dueDate}
            done={obj.done}
            assignment={obj.assignment}
            tutorUsername={obj.tutor.username}
            tutorProfileImage={tutorProfileImage}
            assignmentUID={key}
          />
        );
      });
    } else if (!thumbnails) {
      results.push(
        <Text style={styles.emptyText} key={0}>
          Your child has not been assigned any homework at the moment.
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
        {/* <TouchableOpacity onPress={() => console.log(store.getState())}>
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
        </TouchableOpacity>
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
