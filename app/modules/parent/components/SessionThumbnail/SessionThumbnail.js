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

export default class SessionThumbnail extends React.Component {
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

  getInitialsFromName(user) {
    var string = user;
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();
    return initials;
  }

  render() {
    console.log("SessionsThumbnail");
    // console.log("sessions thumbnail props: " + JSON.stringify(this.props));
    // const tutorInitials = this.getInitialsFromName(this.props.tutorUsername);
    // const childInitials = this.getInitialsFromName(this.props.childUsername);
    // const tutorProfileImage = { uri: this.props.tutorProfileImage };
    // const childProfileImage = { uri: this.props.childProfileImage };
    // const childDisplayInitials = (
    //   <View style={styles.imageWithInitials}>
    //     <Text style={styles.initials}>{childInitials}</Text>
    //   </View>
    // );
    // const tutorDisplayInitials = (
    //   <View style={styles.imageWithInitials}>
    //     <Text style={styles.initials}>{tutorInitials}</Text>
    //   </View>
    // );
    // const displayChildImage = (
    //   <Image style={styles.image} source={childProfileImage} />
    // );
    // const displayTutorImage = (
    //   <Image style={styles.image} source={tutorProfileImage} />
    // );
    return (
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
            <Text style={styles.infoTitle}>02 May, 04:30pm</Text>
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
    );
  }
}
