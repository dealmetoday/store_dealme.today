import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Fingerprint from "@material-ui/icons/Fingerprint";
import Snowflake from "@material-ui/icons/AcUnit"
import Timeline from "@material-ui/icons/Timeline"
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import aboutStyle from "assets/jss/material-kit-react/views/landingPageSections/aboutStyle.jsx";

class AboutSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Meet DealMe</h2>
            <h5 className={classes.description}>
              DealMe strives to provide value for brick and mortar stores as
              well as their customers.
            </h5>
            <br/>
            <h5 className={classes.description}>
              For shoppers, we aim to aleviate the pains experiences when
              bombarded by mass marketing efforts. We understand that shoppers
              do, in fact, want to make use of promotional materials - but only
              if those offers align to their interests. At DealMe, we provide
              shoppers a platform to view the deals relevant to them and their
              interests.
            </h5>
            <br/>
            <h5 className={classes.description}>
              For stores, we provide a platform to bring some of the benefits
              of e-commerce to brick and mortar. Our platform empowers you to
              create and distribute promotions to customers that have shown
              interest in your business. The platform also gives you concrete
              data on the perfornace of each and every promotions you have
              created through our services.
            </h5>
          </GridItem>
        </GridContainer>
        <div className={classes.description}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Intelligent"
                description="Stores receive concrete data about the performance of their promotions"
                icon={Timeline}
                iconColor="danger"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Unique"
                description="As a shopper, the deals you see are tailored to your preferences"
                icon={Snowflake}
                iconColor="danger"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Secure"
                description="We hash passwords, encrypt data, and ensure all interactions are done over a secure network so your data stays your data"
                icon={Fingerprint}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(aboutStyle)(AboutSection);
