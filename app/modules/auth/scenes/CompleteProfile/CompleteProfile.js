import React from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import { actions as auth } from "../../index";
const { createUser } = auth;

import CompleteProfileForm from "../../components/CompleteProfileForm";

const fields = [
  {
    key: "username",
    label: "Preferred Name",
    placeholder: "Preferred Name",
    autoFocus: false,
    secureTextEntry: false,
    value: "",
    type: "text"
  }
  // {
  //   key: "role",
  //   label: "Role",
  //   placeholder: "Role",
  //   autoFocus: false,
  //   secureTextEntry: false,
  //   value: "",
  //   type: "radio"
  // }
];

const error = {
  general: "",
  username: ""
};

class CompleteProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSubmit(data) {
    this.setState({ error: error }); //clear out error messages

    //attach user id
    const { user } = this.props;
    console.log("user in onSubmit: ");
    console.log(JSON.stringify(user));
    data["uid"] = user.uid;
    data["email"] = user.email;
    // if (typeof user.profileImage !== "undefined") {
    //   data["profileImage"] = user.profileImage;
    // }
    data["profileImage"] =
      typeof user.profileImage !== "undefined" ? user.profileImage : null;
    console.log("onSubmit in completeProfile");
    this.props.createUser(data, this.onSuccess, this.onError);
  }

  onSuccess({ exists, user }) {
    console.log("complete profile success!");
    console.log(JSON.stringify(user));
    var role = user.role;
    console.log(role);
    if (role === "tutor") Actions.tutor();
    if (role === "tutee") Actions.tutee();
    if (role === "parent") Actions.parent();
  }

  onError(error) {
    let errObj = this.state.error;

    if (error.hasOwnProperty("message")) {
      errObj["general"] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      });
    }

    this.setState({ error: errObj });
  }

  render() {
    return (
      <CompleteProfileForm
        fields={fields}
        showLabel={false}
        onSubmit={this.onSubmit}
        buttonTitle={"CONTINUE"}
        error={this.state.error}
      />
    );
  }
}

export default connect(null, { createUser })(CompleteProfile);
