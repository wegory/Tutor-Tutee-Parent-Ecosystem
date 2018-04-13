import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-native-material-dropdown";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import store from "../../../../redux/store";
import { isEmpty, validate } from "../../utils/validate";
import styles from "./styles";
import { getChildren } from "../../api";
import AddTutorTextInput from "../AddTutorTextInput";

export default class TutorForm extends React.Component {
  constructor(props) {
    super(props);

    const { fields, error } = props;

    this.state = this.createState(fields, error);
    this.state["child"] = "";
    this.state["collectionChildren"] = {};
    console.log("TutorForm, state: " + JSON.stringify(this.state));
    //bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setChild = this.setChild.bind(this);
    this.onGetChildren = this.onGetChildren.bind(this);
    this.setChildren = this.setChildren.bind(this);
  }

  componentDidMount() {
    this.onGetChildren();
  }

  setChild(child) {
    this.setState({ child: child });
  }

  setChildren(collectionChildren) {
    this.setState({ collectionChildren: collectionChildren });
  }

  onGetChildren() {
    var _this = this;
    getChildren(function(collection) {
      console.log(
        "collectionChildren in getChildren: " + JSON.stringify(collection)
      );
      _this.setChildren(collection);
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
    const TutorToken = this.state.TutorToken;
    const error = this.state.error;
    var data = { TutorToken, error };
    const result = validate(data);
    console.log("onSubmit, data: " + JSON.stringify(data));
    const child = this.state.child;
    const newData = { TutorToken, error, child };
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
    retData["child"] = data.child;
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
    console.log(
      "collection State: " + JSON.stringify(this.state.collectionChildren)
    );
    const { fields, showLabel, buttonTitle, onForgotPassword } = this.props;
    const collectionChildren = this.state.collectionChildren;
    const nameKeys = Object.keys(collectionChildren);
    const names = [];
    nameKeys.map((key, index) => {
      names.push({
        value: collectionChildren[key]
      });
    });

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={require("../../../../assets/images/logo.png")}
          />
          <Text style={styles.text}>Connect a tutor to your child!</Text>
          {!isEmpty(this.state.error["general"]) && (
            <Text style={styles.errorText}>{this.state.error["general"]}</Text>
          )}
          <Dropdown
            label="Child"
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
              var collectionChildren = this.state.collectionChildren;
              var uid = Object.keys(collectionChildren).find(
                key => collectionChildren[key] === value
              );
              this.setChild(uid);
              console.log(this.state.child);
            }}
          />
          {fields.map((data, idx) => {
            let { key, label, placeholder, autoFocus, secureTextEntry } = data;
            return (
              <AddTutorTextInput
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
          {this.state.child != "" && (
            <Button
              raised
              title={buttonTitle}
              borderRadius={4}
              buttonStyle={styles.selectedChildButton}
              textStyle={styles.buttonText}
              onPress={this.onSubmit}
            />
          )}
          {this.state.child == "" && (
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

TutorForm.propTypes = {
  // fields: PropTypes.object,
  showLabel: PropTypes.bool,
  buttonTitle: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

TutorForm.defaultProps = {
  onForgotPassword: null
};
