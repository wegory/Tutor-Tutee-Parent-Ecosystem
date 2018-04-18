import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-native-material-dropdown";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import store from "../../../../redux/store";
import { isEmpty, validate } from "../../utils/validate";
import styles from "./styles";
import AddAssignmentTextInput from "../AddAssignmentTextInput";
import DatePicker from "react-native-datepicker";

export default class AssignmentForm extends React.Component {
  constructor(props) {
    super(props);

    const { fields, error } = props;

    var today = new Date();
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
    // this.state["date"] = "";
    console.log("AssignmentForm, state: " + JSON.stringify(this.state));
    //bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const Assignment = this.state.Assignment;
    const error = this.state.error;
    const data = { Assignment, error };
    const result = validate(data);
    console.log("onSubmit, data: " + JSON.stringify(data));
    const date = this.state.date;
    const newData = { Assignment, error, date };
    console.log("onSubmit, newData: " + JSON.stringify(newData));
    if (!result.success) this.setState({ error: result.error });
    else this.props.onSubmit(this.extractData(newData));
  }

  extractData(data) {
    const retData = {};
    Object.keys(data).forEach(function(key) {
      if (key !== "error") {
        let { value } = data[key];
        retData[key] = value;
        console.log("key: " + key);
        console.log("extractData: " + value);
      }
    });
    retData["date"] = data.date;
    console.log("retData: " + JSON.stringify(retData));
    return retData;
  }

  // onError(error) {
  //   alert(error.message);
  // }

  onChange(key, text) {
    const state = this.state;
    state[key]["value"] = text;
    this.setState(state);
  }

  render() {
    const { fields, showLabel, buttonTitle, onForgotPassword } = this.props;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={require("../../../../assets/images/homework.png")}
          />
          <Text style={styles.text}>Assign homework</Text>
          {!isEmpty(this.state.error["general"]) && (
            <Text style={styles.errorText}>{this.state.error["general"]}</Text>
          )}
          {fields.map((data, idx) => {
            let { key, label, placeholder, autoFocus, secureTextEntry } = data;
            return (
              <AddAssignmentTextInput
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
              }
            }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
          {this.state.Assignment.value != "" && (
            <Button
              raised
              title={buttonTitle}
              borderRadius={4}
              buttonStyle={styles.selectedChildButton}
              textStyle={styles.buttonText}
              onPress={this.onSubmit}
            />
          )}
          {this.state.Assignment.value == "" && (
            <Button
              raised
              title={buttonTitle}
              borderRadius={4}
              buttonStyle={styles.unselectedChildButton}
              textStyle={styles.buttonText}
            />
          )}
        </View>
      </View>
    );
  }
}

AssignmentForm.propTypes = {
  // fields: PropTypes.object,
  showLabel: PropTypes.bool,
  buttonTitle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

AssignmentForm.defaultProps = {
  onForgotPassword: null
};
