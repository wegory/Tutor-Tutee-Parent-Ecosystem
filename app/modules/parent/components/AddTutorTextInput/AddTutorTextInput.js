import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text } from "react-native";

import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import { isEmpty } from "../../utils/validate";
import styles from "./styles";

class AddTutorTextInput extends Component {
  render() {
    const {
      showLabel,
      placeholder,
      autoFocus,
      onChangeText,
      secureTextEntry
    } = this.props;
    console.log("AddTutorOrChildTextInput");

    return (
      <View>
        {showLabel && <FormLabel>{this.props.label}</FormLabel>}
        <FormInput
          autoCapitalize="none"
          clearButtonMode="while-editing"
          underlineColorAndroid={"#A5A7A9"}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          inputStyle={styles.inputContainer}
          value={this.props.value}
        />
        {!isEmpty(this.props.error) && (
          <FormValidationMessage>{this.props.error}</FormValidationMessage>
        )}
      </View>
    );
  }
}

AddTutorTextInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  error: PropTypes.string
};

AddTutorTextInput.defaultProps = {
  autoFocus: false,
  secureTextEntry: false
};

export default AddTutorTextInput;
