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
import { doneDeal } from "../../api";

export default class AssignmentThumbnail extends React.Component {
  constructor() {
    super();
    this.state = {
      //   modalVisible: false,
      //   tuteeFormModalVisible: false,
      //   tutorFormModalVisible: false,
      //   profileImage: null,
      //   role: null
    };
    this.getInitialsFromName = this.getInitialsFromName.bind(this);
    this.doneDeal = this.doneDeal.bind(this);
  }

  getInitialsFromName() {
    var string = this.props.tutorUsername;
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();
    return initials;
  }

  doneDeal(assignmentUID, tutorUID) {
    doneDeal(assignmentUID, tutorUID);
  }

  render() {
    console.log("AssignmentThumbnail props:" + JSON.stringify(this.props));
    const initials = this.getInitialsFromName();
    console.log("initials: " + initials);
    const profileImage = { uri: this.props.tutorProfileImage };
    const displayInitials = (
      <View style={styles.imageWithInitials}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
    );
    const displayImage = <Image style={styles.image} source={profileImage} />;
    const displayDone = (
      <Image
        style={styles.doneImage}
        source={require("../../../../assets/images/done.png")}
      />
    );
    const displayButton = (
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => doneDeal(this.props.assignmentUID, this.props.tutorUID)}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    );
    return (
      <View style={styles.taskContainer}>
        <View style={styles.imageContainer}>
          {this.props.tutorProfileImage == "NA"
            ? displayInitials
            : displayImage}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoCol1}>
            <Text style={styles.infoTitle}>{this.props.assignment}</Text>
            <Text style={styles.infoTutor}>
              Set by: {this.props.tutorUsername}
            </Text>
            <Text style={styles.infoDueDate}>Due on: {this.props.dueDate}</Text>
          </View>
          <View style={styles.infoCol2}>
            {this.props.done == true ? displayDone : displayButton}
          </View>
        </View>
      </View>
    );
  }
}
