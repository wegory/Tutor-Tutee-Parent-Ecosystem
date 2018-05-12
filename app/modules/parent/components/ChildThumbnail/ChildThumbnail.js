import React from "react";
var {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} = require("react-native");
import styles from "./styles";
import { Actions } from "react-native-router-flux";

export default class ChildThumbnail extends React.Component {
  constructor() {
    super();
    this.state = {
      //   tutorFormModalVisible: false,
      //   username: "Loading",
      //   profileImage: null,
      //   role: null
    };
    this.getInitialsFromName = this.getInitialsFromName.bind(this);
  }

  getInitialsFromName() {
    var string = this.props.username;
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();
    return initials;
  }

  render() {
    console.log("ChildThumbnail");
    console.log("thumbnail props: " + JSON.stringify(this.props));
    const initials = this.getInitialsFromName(this.state.username);
    const profileImage = { uri: this.props.profileImage };
    const displayInitials = (
      <View style={styles.imageWithInitials}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
    );
    const displayImage = <Image style={styles.image} source={profileImage} />;
    return (
      <TouchableOpacity
        onPress={() =>
          Actions.ParentEachChildNav({
            username: this.props.username,
            childUID: this.props.childUID
          })
        }
      >
        <View style={styles.taskContainer}>
          <View style={styles.imageContainer}>
            {this.props.profileImage == null ? displayInitials : displayImage}
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoCol1}>
              <Text style={styles.infoTitle}>{this.props.username}</Text>
              <Text style={styles.infoTutor}>Upcoming Tuition:</Text>
              <Text style={styles.infoDueDate}>02 May 18, 8pm</Text>
            </View>
            <View style={styles.infoCol2}>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() =>
                  this.props.controlVisible(
                    this.props.childUID,
                    this.props.profileImage,
                    this.props.username
                  )
                }
              >
                <Text style={styles.buttonText}>Schedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
