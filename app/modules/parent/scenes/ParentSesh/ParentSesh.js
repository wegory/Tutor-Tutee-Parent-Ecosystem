import React from "react";
var {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} = require("react-native");

import ActionButton from "react-native-action-button";
import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import SessionThumbnail from "../../components/SessionThumbnail/SessionThumbnail";
import styles from "./styles";

import { getSessions, checkSessionChanges } from "../../api";

export default class ParentSesh extends React.Component {
  constructor() {
    super();
    this.state = { collectionSessions: {} };

    this.onGetSession = this.onGetSession.bind(this);
    this.setSession = this.setSession.bind(this);
    this.renderThumbnail = this.renderThumbnail.bind(this);
  }

  setSession(collection) {
    this.setState({ collectionSessions: collection });
  }

  onGetSession() {
    var _this = this;
    console.log("onGetSessions");

    getSessions(function(collection) {
      console.log(
        "collectionSession in getSession: " + JSON.stringify(collection)
      );
      _this.setSession(collection);
    });
  }

  componentWillMount() {
    this.onGetSession();
    _this = this;
    checkSessionChanges(function(changed) {
      if (changed) {
        console.log("checkSessionsChanged");
        // _this.onGetSession();
      }
    });
  }

  renderThumbnail() {
    const thumbnails = this.state.collectionSessions;
    const results = [];
    console.log("thumbnails undefined?: " + typeof thumbnails == "undefined");
    if (typeof thumbnails != "undefined" && typeof thumbnails !== "object") {
      const keys = Object.keys(thumbnails);
      keys.map((key, index) => {
        console.log("keys in renderThumbnail: " + key);
        results.push(
          <SessionThumbnail
            key={key}
            childProfileImage={thumbnails[`${key}`].profileImage}
            childUsername={thumbnails[`${key}`].username}
            childUID={thumbnails[`${key}`].childUID}
            tutorProfileImage={thumbnails[`${key}`].tutorProfileImage}
            tutorUsername={thumbnails[`${key}`].tutorUsername}
            tutorUID={thumbnails[`${key}`].tutorUID}
            date={thumbnails[`${key}`].date}
            time={thumbnails[`${key}`].time}
            remarks={thumbnails[`${key}`].remarks}
          />
        );
      });
    }
    if (results == []) {
      results.push(
        <Text style={styles.emptyText}>
          Your children currently do not have any tuition scheduled! Schedule
          one now.
        </Text>
      );
    }
    return results;
  }

  render() {
    console.log("sesh state: " + JSON.stringify(this.state.collectionSessions));
    return (
      <View style={styles.mainContainer}>
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
                source={require("../../../../assets/images/profilePicture.png")}
              />
              <Image
                style={styles.image2}
                source={require("../../../../assets/images/bradPitt.png")}
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoCol1}>
                <Text style={styles.infoTitle}>01 May, 04:30pm</Text>
                <Text style={styles.infoTutor}>Gregory x Brad Pitt</Text>
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
                style={styles.image1}
                source={require("../../../../assets/images/profilePicture.png")}
              />
              <Image
                style={styles.image2}
                source={require("../../../../assets/images/jeremy.png")}
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoCol1}>
                <Text style={styles.infoTitle}>02 May, 04:30pm</Text>
                <Text style={styles.infoTutor}>Gregory x Jeremy</Text>
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
                style={styles.image1}
                source={require("../../../../assets/images/profilePicture.png")}
              />
              <Image
                style={styles.image2}
                source={require("../../../../assets/images/bradPitt.png")}
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoCol1}>
                <Text style={styles.infoTitle}>01 May, 04:30pm</Text>
                <Text style={styles.infoTutor}>Gregory x Brad Pitt</Text>
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
