import React from "react";
import {
  Scene,
  Router,
  ActionConst,
  Stack,
  Modal,
  Tabs,
  Drawer,
  Actions
} from "react-native-router-flux";
import { AsyncStorage } from "react-native";
//Splash Component
import Splash from "../components/Splash/Splash";

//Authentication Scenes
import Welcome from "../modules/auth/scenes/Welcome";
import Register from "../modules/auth/scenes/Register";
import CompleteProfile from "../modules/auth/scenes/CompleteProfile";
import Login from "../modules/auth/scenes/Login";
import ForgotPassword from "../modules/auth/scenes/ForgotPassword";

//Dashboard and Tabs
import TutorTutee from "../modules/tutor/scenes/TutorTutee";
import TutorSesh from "../modules/tutor/scenes/TutorSesh";
import TutorPayment from "../modules/tutor/scenes/TutorPayment";
import TutorEachTutee from "../modules/tutor/scenes/TutorEachTutee";

import TuteeAssignment from "../modules/tutee/scenes/TuteeAssignment";
import TuteeEachAssignment from "../modules/tutee/scenes/TuteeEachAssignment";
import TuteeSesh from "../modules/tutee/scenes/TuteeSesh";

import ParentChild from "../modules/parent/scenes/ParentChild";
import ParentEachChild from "../modules/parent/scenes/ParentEachChild";
import ParentSesh from "../modules/parent/scenes/ParentSesh";
import ParentPayment from "../modules/parent/scenes/ParentPayment";

//Import Store, actions
import store from "../redux/store";
import { checkLoginStatus } from "../modules/auth/actions";
import { color, navTitleStyle } from "../styles/theme";

//Custom Tab Bar Styles
import styles from "../components/Routes/styles";

//NavBar Component
import TutorEachTuteeNavBar from "../modules/tutor/components/NavBar/TutorEachTuteeNavBar";
import TutorNavBar from "../../app/modules/tutor/components/NavBar/navBar";

import TuteeNavBar from "../../app/modules/tutee/components/NavBar/navBar";
import TuteeEachAssignmentNav from "../modules/tutee/components/NavBar/TuteeEachAssignmentNavBar";

import ParentNavBar from "../../app/modules/parent/components/NavBar/navBar";
import ParentEachChildNav from "../modules/parent/components/NavBar/ParentEachChildNavBar";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isLoggedIn: false,
      role: null
    };
    this.getRole = this.getRole.bind(this);
    this.setRole = this.setRole.bind(this);
  }

  setRole(role) {
    this.setState({ role: role });
  }

  async getRole() {
    AsyncStorage.getItem("user")
      .then(res => {
        res = JSON.parse(res);
        console.log("res: " + JSON.stringify(res));
        this.setRole(res.user.role);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    let _this = this;
    store.dispatch(
      checkLoginStatus(isLoggedIn => {
        _this.setState({ isReady: true, isLoggedIn });
      })
    );
    _this.getRole();
  }

  render() {
    if (!this.state.isReady) return <Splash />;
    // const username = this.state.username;
    // console.log(this.state.role);
    return (
      <Router>
        <Scene
          key="root"
          hideNavBar
          navigationBarStyle={{ backgroundColor: "#fff" }}
          titleStyle={navTitleStyle}
          backButtonTintColor={color.black}
        >
          <Stack key="Auth" initial={!this.state.isLoggedIn}>
            <Scene
              key="Welcome"
              component={Welcome}
              title=""
              initial={true}
              hideNavBar
            />
            <Scene key="Register" component={Register} title="Register" back />
            <Scene
              key="CompleteProfile"
              component={CompleteProfile}
              title="Select Username"
              back={false}
            />
            <Scene key="Login" component={Login} title="Login" />
            <Scene
              key="ForgotPassword"
              component={ForgotPassword}
              title="Forgot Password"
            />
          </Stack>

          <Stack
            key="tutor"
            initial={this.state.isLoggedIn && this.state.role == "tutor"}
          >
            <Scene
              key="tutorTabBar"
              tabs={true}
              tabBarPosition={"top"}
              indicatorStyle={styles.indicator}
              tabBarStyle={styles.tabBarStyle}
              labelStyle={styles.labelStyle}
              hideNavBar={false}
              navBar={TutorNavBar}
            >
              <Scene
                key="TutorTutee"
                component={TutorTutee}
                title="Students"
                initial={true}
                type={ActionConst.REPLACE}
                labelStyle={styles.labelStyle}
                hideNavBar
              />
              <Scene
                key="TutorSesh"
                component={TutorSesh}
                title="Schedule"
                type={ActionConst.REPLACE}
                labelStyle={styles.labelStyle}
                hideNavBar
              />
              <Scene
                key="TutorPayment"
                component={TutorPayment}
                title="Payment"
                type={ActionConst.REPLACE}
                labelStyle={styles.labelStyle}
                hideNavBar
              />
            </Scene>
            <Scene
              key="TutorEachTuteeNav"
              indicatorStyle={styles.indicator}
              labelStyle={styles.labelStyle}
              hideNavBar={false}
              navBar={TutorEachTuteeNavBar}
            >
              <Scene
                key="TutorEachTutee"
                component={TutorEachTutee}
                hideNavBar
              />
            </Scene>
            {/* <Scene key="Settings" component={Settings} /> */}
          </Stack>
          <Stack
            key="parent"
            initial={this.state.isLoggedIn && this.state.role == "parent"}
          >
            <Scene
              key="ParentTabBar"
              tabs={true}
              tabBarPosition={"top"}
              indicatorStyle={styles.indicator}
              tabBarStyle={styles.tabBarStyle}
              labelStyle={styles.labelStyle}
              hideNavBar={false}
              navBar={ParentNavBar}
            >
              <Scene
                key="ParentChild"
                component={ParentChild}
                title="Child"
                initial={true}
                type={ActionConst.REPLACE}
                labelStyle={styles.labelStyle}
                hideNavBar
              />
              <Scene
                key="ParentSesh"
                component={ParentSesh}
                title="Schedule"
                initial={false}
                type={ActionConst.REPLACE}
                hideNavBar
              />

              <Scene
                key="ParentPayment"
                component={ParentPayment}
                title="Payment"
                initial={false}
                type={ActionConst.REPLACE}
                hideNavBar
              />
            </Scene>
            <Scene
              key="ParentEachChildNav"
              indicatorStyle={styles.indicator}
              labelStyle={styles.labelStyle}
              hideNavBar={false}
              navBar={ParentEachChildNav}
            >
              <Scene
                key="ParentEachChild"
                component={ParentEachChild}
                hideNavBar
              />
            </Scene>
          </Stack>
          <Stack
            key="tutee"
            initial={this.state.isLoggedIn && this.state.role == "tutee"}
          >
            <Scene
              key="TuteeTabBar"
              tabs={true}
              tabBarPosition={"top"}
              indicatorStyle={styles.indicator}
              tabBarStyle={styles.tabBarStyle}
              labelStyle={styles.labelStyle}
              hideNavBar={false}
              navBar={TuteeNavBar}
            >
              <Scene
                key="TuteeAssignment"
                component={TuteeAssignment}
                title="Assignment"
                initial={true}
                type={ActionConst.REPLACE}
                labelStyle={styles.labelStyle}
                hideNavBar
              />
              <Scene
                key="TuteeSesh"
                component={TuteeSesh}
                title="Schedule"
                initial={false}
                type={ActionConst.REPLACE}
                hideNavBar
              />
            </Scene>
            <Scene
              key="TuteeEachAssignmentNav"
              indicatorStyle={styles.indicator}
              labelStyle={styles.labelStyle}
              hideNavBar={false}
              navBar={TuteeEachAssignmentNav}
            >
              <Scene
                key="TuteeEachAssignment"
                component={TuteeEachAssignment}
                hideNavBar
              />
            </Scene>
            {/* <Scene key="Settings" component={Settings} /> */}
          </Stack>
        </Scene>
      </Router>
    );
  }
}
