import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import signupPageStyle from "assets/jss/material-kit-react/views/signupPage.jsx";

import image from "assets/img/banner_busymall.jpeg";
import { TextField } from "@material-ui/core";
import { relativeTimeThreshold } from "moment";

const renderTextField = ({
  input,
  label,
  meta: {touched, error},
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      form: {
        name: "",
        parent: "",
        email: "",
        password: "",
        confirm: ""
      },
      errors: {
        email: false,
        password: false,
        confirm: false
      }
    };
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  redirectLogin = () => {
    this.props.history.push("/login");
  }

  onBlur(event) {
    const target = event.target;
    const form = this.state.form;
    const errors = this.state.errors;
    form[target.id] = target.value;

    // Perform error checking
    if (target.id === "email") {
      errors.email = !this.validEmail(form.email);
    } else if (target.id === "password") {
      errors.password = !this.validPassword(form.name, form.password);
      if (form.confirm) {
        errors.confirm = (form.password !== form.confirm);
      }
    } else if (target.id === "confirm") {
      errors.confirm = (form.password !== form.confirm);
    }
    // console.log(form);
    console.log(errors.password);
  }

  handleInputChange = (event) => {
    console.log(this.state.form.name);
  }

  validEmail(email) {
    const rfc5322 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const res = email.match(rfc5322);
    return (res !== null);
  }

  validPassword(username, password) {
    const passwordUpper = password.toUpperCase();
    const usernameUpper = username.toUpperCase();

    // Password cannot contain username
    if (usernameUpper && passwordUpper.includes(usernameUpper)) {
      return false;
    }

    // Require a number, symbol, and alphanumeric characters
    const matcher = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])(?=.{8,512})");
    return matcher.test(password);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="DealMe"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="danger" className={classes.cardHeader}>
                      <h4>Create An Account</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Store Name"
                        id="name"
                        onBlur={this.onBlur.bind(this)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                      <CustomInput
                        labelText="Parent Company (optional)"
                        id="parent"
                        onBlur={this.onBlur.bind(this)}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                      <br/><br/>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        onBlur={this.onBlur.bind(this)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        onBlur={this.onBlur.bind(this)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Confirm Password"
                        id="confirm"
                        onBlur={this.onBlur.bind(this)}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      <div className={classes.signup}>
                        <Button simple color="primary" size="lg">
                          Sign up
                        </Button>
                      </div>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                          simple
                          color="primary"
                          size="lg"
                          onClick={this.redirectLogin}
                        >
                        Already have an account? Click here to log in.
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(signupPageStyle)(SignupPage);
