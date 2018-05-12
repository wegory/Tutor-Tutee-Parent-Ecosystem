import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-native-material-dropdown";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import store from "../../../../redux/store";
import { isEmpty, validate } from "../../utils/validate";
import styles from "./styles";
import AddTuitionTextInput from "../AddTuitionTextInput";
import DatePicker from "react-native-datepicker";

export default class TuitionForm extends React.Component {
  constructor(props) {
    super(props);

    const { fields, error } = props;
    console.log("props: " + JSON.stringify(props));
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var time = hours + ":" + minutes;
    console.log("time: " + time);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    this.state = this.createState(fields, error);
    this.state["date"] = today;
    this.state["time"] = time;
    this.state["tutorUID"] = "";
    this.state["tutorProfileImage"] = "";
    this.state["tutorUsername"] = "";
    console.log("TuitionForm, state: " + JSON.stringify(this.state));
    //bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setTutor = this.setTutor.bind(this);
  }

  setTutor(tutorUID, tutorUsername, tutorProfileImage) {
    this.setState({
      tutorUID: tutorUID,
      tutorUsername: tutorUsername,
      tutorProfileImage: tutorProfileImage
    });
  }

  createState(fields, error) {
    //create the state
    const state = {};
    fields.forEach(field => {
      let { key, type, value } = field;
      state[key] = { type: type, value: value };
    });

    state["error"] = error;
    return state;
  }

  onSubmit() {
    const Remarks = this.state.Remarks;
    const error = this.state.error;
    const data = { Remarks, error };
    const result = validate(data);
    console.log("onSubmit, data: " + JSON.stringify(data));
    const date = this.state.date;
    const time = this.state.time;
    const tutorUsername = this.state.tutorUsername;
    const tutorUID = this.state.tutorUID;
    const tutorProfileImage = this.state.tutorProfileImage;
    const newData = {
      Remarks,
      error,
      date,
      time,
      tutorUsername,
      tutorUID,
      tutorProfileImage
    };
    console.log("onSubmit, newData: " + JSON.stringify(newData));
    if (!result.success) this.setState({ error: result.error });
    else this.props.onSubmit(this.extractData(newData));
  }

  extractData(data) {
    const retData = {};
    retData["remarks"] = data.Remarks.value;
    console.log("here");
    retData["date"] = data.date;
    retData["time"] = data.time;
    retData["tutorUsername"] = data.tutorUsername;
    retData["tutorUID"] = data.tutorUID;
    console.log("there");
    retData["tutorProfileImage"] = data.tutorProfileImage
      ? data.tutorProfileImage
      : "NA";
    console.log("retData: " + JSON.stringify(retData));
    return retData;
  }

  onChange(key, text) {
    const state = this.state;
    state[key]["value"] = text;
    this.setState(state);
  }

  render() {
    const { fields, showLabel, buttonTitle, onForgotPassword } = this.props;
    console.log(this.state);
    const names = [];
    console.log("TuitionForm props: " + JSON.stringify(this.props));
    if (this.props.collection != "NA" && this.props.collection != null) {
      const collection = this.props.collection;
      const nameKeys = Object.keys(collection);

      nameKeys.map((key, index) => {
        names.push({
          value: collection[key].username
        });
      });
    }
    console.log("names: " + JSON.stringify(names));
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {/* <Image
            style={styles.image}
            source={require("../../../../assets/images/calendar.png")}
          /> */}
          <Text style={styles.text}>Schedule Tuition</Text>
          <Dropdown
            label="Tutor"
            data={names}
            shadeOpacity={0.3}
            containerStyle={styles.containerDropdown}
            labelFontSize={styles.labelFontSize}
            // textColor={styles.labelColor}
            onChangeText={(value, index, data) => {
              console.log(
                "value, index, data: " +
                  JSON.stringify(value) +
                  ", " +
                  JSON.stringify(index) +
                  ", " +
                  JSON.stringify(data)
              );
              const collectionTuition = this.props.collection;
              console.log("collection: " + JSON.stringify(collectionTuition));
              const key = Object.keys(collectionTuition).find(
                key => collectionTuition[key].username === value
              );
              const tutor = collectionTuition[key];
              console.log("tutor: " + JSON.stringify(tutor));
              this.setTutor(tutor.uid, tutor.username, tutor.profileImage);
              console.log("tutor state: " + JSON.stringify(this.state));
            }}
          />
          <DatePicker
            style={styles.datePicker}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={this.state.date}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: 14
              },
              dateInput: {
                marginLeft: 14
              }
            }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
          <DatePicker
            style={styles.datePicker}
            date={this.state.time}
            mode="time"
            format="HH:mm"
            minuteInterval={10}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("../../../../assets/images/clock.png")}
            customStyles={{
              dateInput: {
                marginLeft: 14
              }
            }}
            onDateChange={time => {
              this.setState({ time: time });
            }}
          />
          {!isEmpty(this.state.error["general"]) && (
            <Text style={styles.errorText}>{this.state.error["general"]}</Text>
          )}
          {fields.map((data, idx) => {
            let { key, label, placeholder, autoFocus, secureTextEntry } = data;
            return (
              <AddTuitionTextInput
                key={key}
                label={label}
                showLabel={showLabel}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChangeText={text => this.onChange(key, text)}
                secureTextEntry={secureTextEntry}
                value={this.state[key]["value"]}
                error={this.state.error[key]}
              />
            );
          })}

          <Button
            raised
            title={buttonTitle}
            borderRadius={4}
            buttonStyle={styles.selectedChildButton}
            textStyle={styles.buttonText}
            onPress={this.onSubmit}
          />
        </View>
      </View>
    );
  }
}

TuitionForm.propTypes = {
  // fields: PropTypes.object,
  showLabel: PropTypes.bool,
  buttonTitle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

TuitionForm.defaultProps = {
  onForgotPassword: null
};
