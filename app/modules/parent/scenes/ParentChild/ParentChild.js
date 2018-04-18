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
import store from "../../../../redux/store";
import styles from "./styles";
import { getChildrenForDisplay, checkChildChanges } from "../../api";
import ChildThumbnail from "../../components/ChildThumbnail/ChildThumbnail";

export default class ParentChild extends React.Component {
  constructor() {
    super();
    this.state = {
      collectionChildren: {}
    };

    this.onGetChildren = this.onGetChildren.bind(this);
    this.setChildren = this.setChildren.bind(this);
    this.renderThumbnail = this.renderThumbnail.bind(this);
  }

  componentDidMount() {
    this.onGetChildren();
    _this = this;
    checkChildChanges(function(changed) {
      if (changed) {
        console.log("hi");
        _this.onGetChildren();
      }
    });
  }

  // componentWillMount() {

  // }

  setChildren(collectionChildren) {
    this.setState({ collectionChildren: collectionChildren });
  }

  onGetChildren() {
    var _this = this;
    console.log("onGetChildren");
    getChildrenForDisplay(function(collection) {
      console.log(
        "collectionChildren in getChildren: " + JSON.stringify(collection)
      );
      _this.setChildren(collection);
    });
  }

  renderThumbnail() {
    const thumbnails = this.state.collectionChildren;
    const keys = Object.keys(thumbnails);
    const results = [];

    const thumbnailsController = keys.map((key, index) => {
      console.log("keys in renderThumbnail: " + key);
      results.push(
        <ChildThumbnail
          key={key}
          profileImage={thumbnails[`${key}`].profileImage}
          username={thumbnails[`${key}`].username}
          childUID={key}
        />
      );
    });
    if (results == []) {
      results.push(
        <Text style={styles.emptyText}>
          Connect to your child by click on the menu on the top right button!
        </Text>
      );
    }
    return results;
  }

  render() {
    console.log(
      "parentChild state: " + JSON.stringify(this.state.collectionChildren)
    );
    console.log(store.getState());
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
