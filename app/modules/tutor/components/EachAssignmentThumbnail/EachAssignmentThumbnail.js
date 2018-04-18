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

export default class EachAssignmentThumbnail extends React.Component {
  constructor() {
    super();
    this.state = {
      //   modalVisible: false,
      //   tuteeFormModalVisible: false,
      //   tutorFormModalVisible: false,
      //   username: "Loading",
      //   profileImage: null,
      //   role: null
    };
    this.getInitialsFromName = this.getInitialsFromName.bind(this);
  }

  getInitialsFromName() {
    var string = this.props.tutorUsername;
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();
    return initials;
  }

  render() {
    console.log("EachChildThumbnail, props: " + JSON.stringify(this.props));
    const initials = this.getInitialsFromName();
    const displayInitials = (
      <View style={styles.imageWithInitials}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
    );
    const neutral = (
      <Image
        style={styles.status}
        source={require("../../../../assets/images/neutral.png")}
      />
    );
    const finished = (
      <Image
        style={styles.status}
        source={require("../../../../assets/images/finished.png")}
      />
    );
    const overdue = (
      <Image
        style={styles.status}
        source={require("../../../../assets/images/overdue.png")}
      />
    );
    const dateFormat = new Date(this.props.dueDate).getTime();
    console.log("date format: " + dateFormat);
    var now = new Date();
    now = now.setHours(0, 0, 0, 0);
    // const bool = now == dateFormat;
    // console.log("now: " + now);
    // console.log("dateFormat: " + dateFormat);
    // console.log("equi?: " + bool);
    const status =
      dateFormat >= now && this.props.done
        ? finished
        : dateFormat >= now && !this.props.done
          ? neutral
          : overdue;

    return (
      <View style={styles.taskContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoCol1}>
            <Text style={styles.infoTitle}>{this.props.assignment}</Text>
            <Text style={styles.infoTutor}>
              Set by: {this.props.tutorUsername}
            </Text>
            <Text style={styles.infoDueDate}>Due on: {this.props.dueDate}</Text>
          </View>
          <View style={styles.infoCol2}>{status}</View>
        </View>
        <View style={styles.buttonsContainer}>
          {/* <TouchableOpacity style={styles.deleteButton}>
            <Image
              style={styles.deleteImage}
              source={require("../../../../assets/images/delete.png")}
            />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.editButton}>
            <Image
              style={styles.editImage}
              source={require("../../../../assets/images/edit.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
