import React from "react";
import PropTypes from "prop-types";

import { Text, View, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-elements";

import { isEmpty, validate } from "../../utils/validate";

import styles from "./styles";

import AuthTextInput from "../AuthTextInput";

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { fields, error } = props;

    this.state = this.createState(fields, error);
    this.state["role"] = "NA";

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
    const role = this.state.role;
    const username = this.state.username;
    const error = this.state.error;
    const data = { username, error };
    const result = validate(data);
    const newData = { username, error, role };
    console.log("submit role: " + role);
    console.log("newData: " + JSON.stringify(newData));
    if (!result.success) this.setState({ error: result.error });
    else this.props.onSubmit(this.extractData(newData));
  }

  extractData(data) {
    const retData = {};
    console.log("extractData error? : " + JSON.stringify(data));
    Object.keys(data).forEach(function(key) {
      if (key !== "error") {
        let { value } = data[key];
        retData[key] = value;
      }
    });
    retData["role"] = data.role;
    return retData;
  }

  onChange(key, text) {
    const state = this.state;
    state[key]["value"] = text;
    this.setState(state);
  }

  render() {
    const { fields, showLabel, buttonTitle, onForgotPassword } = this.props;
    console.log("complete profile state: " + JSON.stringify(this.state));
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.logo}
            source={require("../../../../assets/images/owl.png")}
          />
          <Text style={styles.header}>
            Almost there! Tell us your role and your preferred name.
          </Text>
        </View>
        <View style={styles.roleContainer}>
          {this.state.role == "parent" ? (
            <TouchableOpacity style={styles.roleActive}>
              <Text> Parent or Guardian </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.role}
              onPress={() => this.setState({ role: "parent" })}
            >
              <Text> Parent or Guardian </Text>
            </TouchableOpacity>
          )}
          {this.state.role == "tutee" ? (
            <TouchableOpacity style={styles.roleActive}>
              <Text> Tutee </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.role}
              onPress={() => this.setState({ role: "tutee" })}
            >
              <Text> Tutee </Text>
            </TouchableOpacity>
          )}
          {this.state.role == "tutor" ? (
            <TouchableOpacity style={styles.roleActive}>
              <Text> Tutor </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.role}
              onPress={() => this.setState({ role: "tutor" })}
            >
              <Text> Tutor </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.wrapper}>
          {/* {!isEmpty(this.state.error["general"]) && (
            <Text style={styles.errorText}>{this.state.error["general"]}</Text>
          )} */}

          {fields.map((data, idx) => {
            let { key, label, placeholder, autoFocus, secureTextEntry } = data;
            return (
              <AuthTextInput
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
            containerViewStyle={styles.containerView}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={this.onSubmit}
          />
          {this.props.onForgotPassword !== null && (
            <Text style={styles.forgotText} onPress={onForgotPassword}>
              Forgot password?
            </Text>
          )}
        </View>
      </View>
    );
  }
}

Form.propTypes = {
  // fields: PropTypes.object,
  showLabel: PropTypes.bool,
  buttonTitle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

Form.defaultProps = {
  onForgotPassword: null
};

export default Form;
