import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

import { Button, SocialIcon, Divider } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import * as firebase from "firebase";
import { Facebook } from "expo";

import { actions as auth, constants as c } from "../../index";
const { signInWithFacebook } = auth;

import styles from "./styles";

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      role: "none"
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);

    // this.getRole = this.getRole.bind(this);
  }

  //get users permission authorization (ret: facebook token)
  async onSignInWithFacebook() {
    const options = { permissions: ["public_profile", "email"] };
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      c.FACEBOOK_APP_ID,
      options
    );
    if (type === "success") {
      this.props.signInWithFacebook(token, this.onSuccess, this.onError);
    }
  }

  onSuccess({ newUser, user }) {
    console.log("Welcome, onSucess");
    console.log("newUser? " + newUser);
    if (newUser) Actions.CompleteProfile({ user });
    else {
      const role = user.toJSON().role;
      if (role === "tutor") Actions.tutor();
      if (role === "tutee") Actions.tutee();
      if (role === "parent") Actions.parent();
    }
  }

  onError(error) {
    alert(error.message);
  }

  render() {
    // console.log("Welcome, render, role: " + JSON.stringify(this.getRole()));
    console.log("welcome, props: " + JSON.stringify(this.props));
    return (
      <View style={styles.container}>
        <View
          style={styles.topContainer}
          // source={require("../../../../assets/images/background.png")}
        >
          <Image
            style={styles.image}
            // source={{ uri: "" }}
            source={require("../../../../assets/images/owl.png")}
          />
          {/* <Image style={styles.image} /> */}
          <Text style={styles.title}>[insert pretentious app name]</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={[styles.buttonContainer]}>
            <SocialIcon
              raised
              button
              type="facebook"
              title="CONTINUE WITH FACEBOOK"
              iconSize={19}
              style={[styles.containerView, styles.socialButton]}
              fontStyle={styles.buttonText}
              onPress={this.onSignInWithFacebook}
            />

            <View style={styles.orContainer}>
              <Divider style={styles.divider} />
              <Text style={styles.orText}>Or</Text>
            </View>

            <Button
              raised
              borderRadius={4}
              title={"SIGN UP WITH E-MAIL"}
              containerViewStyle={[styles.containerView]}
              buttonStyle={[styles.button]}
              textStyle={styles.buttonText}
              onPress={Actions.Register}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>Already have an account?</Text>

            <TouchableOpacity onPress={Actions.Login}>
              <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, { signInWithFacebook })(Welcome);
