import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// core components
import classNames from 'classnames';
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
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import Email from "@material-ui/icons/Email";
import ErrorIcon from '@material-ui/icons/Error';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/banner_busymall.jpeg";

// // Testing Utils
// import Utils from "components/Utils/Utils.jsx";
//
// let utils = new Utils();

class LoginPage extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      open: false,

      email: "",
      password: "",
      visible: false
    };
    // this.utils = this.s
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

  redirectSignup = () => {
    this.props.history.push("/signup");
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSignin = async () => {
    const params = {
      email: this.state.email,
      role: "store",
      password: await this.props.utils.encrypt(this.state.password)
    }

    let data = await this.props.utils.put('/auth/login/email', params);
    console.log(data);

    if (data.status !== "Success") {
      this.setState({ open: true });
    } else {
      this.props.history.push("/admin/dashboard");
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const Icon = ErrorIcon;

    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="DealMe"
          rightLinks={<HeaderLinks history={this.props.history}/>}
          {...rest}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={classNames(classes.error)}
            aria-describedby="client-snackbar"
            message={
             <span id="message-id" className={classes.message}>
               <Icon className={classNames(classes.icon, classes.iconVariant)} />
               Username and Password are incorrect. Please try again.
             </span>
            }
          />
        </Snackbar>
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
              <GridItem xs={12} sm={12} md={8}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="danger" className={classes.cardHeader}>
                      <h4>Login</h4>
                    </CardHeader>
                    <CardBody>
                      <FormControl fullWidth className={classes.FormControl}>
                        <InputLabel
                          id="label_name"
                          htmlFor="component-simple"
                        >
                          Email
                        </InputLabel>
                        <Input
                          id="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton>
                                <Email />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <br/><br/>
                      <FormControl fullWidth className={classes.FormControl}>
                        <InputLabel
                          id="label_password"
                          htmlFor="component-simple"
                        >
                          Password
                        </InputLabel>
                        <Input
                          id="password"
                          type={this.state.showPassword ? "text" : "password"}
                          value={this.state.password}
                          onChange={this.handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleShowPassword}
                              >
                                {this.state.visible ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </CardBody>
                    <br/><br/>
                    <div className={classes.login}>
                      <Button round color="danger"
                              size="lg"
                              onClick={this.handleSignin}
                      >
                        Sign in
                      </Button>
                    </div>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                          simple color="primary"
                          size="lg"
                          onClick={this.redirectSignup}
                      >
                        New to DealMe? Create an account.
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
