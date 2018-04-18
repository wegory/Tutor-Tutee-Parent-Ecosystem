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
import { getChildrenForDisplay } from "../../api";
import TuteeThumbnail from "../../components/TuteeThumbnail/TuteeThumbnail";
import styles from "./styles";

import { addAssignment } from "../../actions";

export default class TutorTutee extends React.Component {
  constructor() {
    super();
    this.state = {
      collectionChildren: "NA"
    };

    this.onGetChildren = this.onGetChildren.bind(this);
    this.setChildren = this.setChildren.bind(this);
    this.renderThumbnail = this.renderThumbnail.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount TutorTutee");
    this.onGetChildren();
  }

  componentWillUpdate(nextProps) {
    console.log("this.componentWillUpdate");
    console.log("tutor: " + JSON.stringify(nextProps.tutor));
    if (
      nextProps.tutor !== this.props.tutor &&
      nextProps.tutor["authReducer"].isLoggedIn == true
    ) {
      this.onGetChildren();
    }
  }

  setChildren(collectionChildren) {
    this.setState({ collectionChildren: collectionChildren });
  }

  onGetChildren() {
    var _this = this;
    getChildrenForDisplay(function(collection) {
      console.log(
        "collectionChildren in getChildren: " + JSON.stringify(collection)
      );
      if (typeof collection !== "undefined") {
        console.log("defined");
        _this.setChildren(collection);
      }
    });
  }

  renderThumbnail() {
    const thumbnails = this.state.collectionChildren;
    console.log("thumbnails: " + JSON.stringify(thumbnails));
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
          <TuteeThumbnail
            key={key}
            profileImage={thumbnails[`${key}`].profileImage}
            username={thumbnails[`${key}`].username}
            uid={thumbnails[`${key}`].uid}
          />
        );
      });
    } else if (thumbnails == "NA") {
      results.push(
        <Text style={styles.emptyText} key={0}>
          You currently do not have any tutees.
        </Text>
      );
    }
    return results;
  }
  render() {
    console.log("componentDidMount render");
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="on-drag"
        alwaysBounceVertical={true}
        endFillColor="#EEEEEE"
      >
        {this.renderThumbnail()}
      </ScrollView>
    );
  }
}
