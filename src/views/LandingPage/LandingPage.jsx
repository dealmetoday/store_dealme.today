import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import MobileStoreButton from 'react-mobile-store-button';

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import AboutSection from "./Sections/AboutSection.jsx";
import TeamSection from "./Sections/TeamSection.jsx";
import WorkSection from "./Sections/WorkSection.jsx";

// Redux and cookies ...
import { withCookies } from 'react-cookie';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { updateProfile, addTodo } from 'redux/actions.js';

const dashboardRoutes = [];

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    let testProfile = { id: "5c82fd4b481499a8c03bca68" };
    dispatch(updateProfile(testProfile));
    console.log("Here");
    console.log(this.props.profile);
    console.log("There");
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="dark"
          routes={dashboardRoutes}
          brand="DealMe"
          rightLinks={<HeaderLinks history={this.props.history} />}
          fixed
          {...rest}
        />
        <Parallax filter image={require("assets/img/banner_busymall.jpeg")} className={classes.banner}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Meet DealMe</h1>
                <h4>
                  DealMe was founded by University students who found pains in
                  traditional brick and mortal promotional methods.
                  <br/>
                  For shoppers, we provide a personalized experience.
                  <br/>
                  For stores, and intelligent platform that shows returns on
                  marketing investments.
                </h4>
                <br />
                <div>
                  <MobileStoreButton
                    store="ios"
                    url={"https://itunes.apple.com/us/app/gmail-email-by-google/id422689480?mt=8"}
                    linkProps={{ title: 'iOS Store Button' }}
                  />
              </div>
              <div>
                <MobileStoreButton
                  store="android"
                  url={"https://play.google.com/store/apps/details?id=com.google.android.gm&hl=en_US"}
                  linkProps={{ title: 'Play Store Button' }}
                />
            </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <AboutSection />
            <TeamSection />
            <WorkSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    todos: state.todos,
    profile: state.userInfo.profile,
  };
}

export default compose(
  withStyles(landingPageStyle),
  connect(mapStateToProps, null)
)(LandingPage);
