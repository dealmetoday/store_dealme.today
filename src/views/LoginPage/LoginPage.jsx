import React from "react";
import classNames from 'classnames';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

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

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import ErrorIcon from '@material-ui/icons/Error';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/banner_busymall.jpeg";

// Utils
import Utils from "components/Utils/Utils.jsx";

// Redux and cookies ...
import { withCookies } from 'react-cookie';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { updateProfile } from 'redux/actions.js';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      error: "login",
      open: false,

      email: "",
      password: "",
      visible: false
    };

    this.utils = new Utils();
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

  test = async () => {
    // let params =
    // {
    //   access: 'store',
    //   email: 'store@store.com',
    //   id: 'asdfasd89fuq0we'
    // }
    //
    // let result = await this.utils.get('/bearer', params);
    // console.log(result);
    //
    // let data =
    // {
    //   id: "5c9682de8b4831dba037c876",
    //   Bearer: result.Bearer,
    // }
    //
    // await this.utils.getData(data.id, data.Bearer);
    //
    // let updateObj = {
    //   id: "5c9682de8b4831dba037c876",
    // 	name: "What",
    // 	description: "THE",
    // 	parentCompany: "aHHHHH",
    // }
    //
    // result = await this.utils.put('/stores', updateObj);
    // console.log(result);

    // let latlng = { lat: 49.2834041, lng: -123.1172924 };
    // let address = "UBC";
    // let result = await this.utils.getAddress(latlng);
    // console.log(result);
    // result = await this.utils.getLatLng(address);
    // console.log(result);
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
    // await this.test();
    const params = {
      email: this.state.email,
      role: "store",
      password: await this.utils.encrypt(this.state.password)
    }

    let data = null;
    try {
      data = await this.utils.put('/auth/login/email', params);
      console.log(data);
    } catch (e) {
      this.setState({ error: "network" });
      this.setState({ open: true });
      return;
    }

    if (data.status !== "Success") {
      this.error = "login";
      this.setState({ open: true });
    } else {
      global.bearer = data.Bearer;
      global.id = data.id;

      await this.utils.getData(global.id, global.bearer);

      this.props.history.push("/admin/dashboard");
    }
  }

  renderSnackbarMessage = () => {
    switch (this.state.error) {
      case "network":
        return <span>A network error has occurred. Please refresh and try again.</span>;
      case "load":
        return <span>Failed to load store data. Please try again.</span>;
      default:
        return <span>Username or password is incorrect. Please try again.</span>;
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
             <span className={classes.message}>
               <Icon className={classNames(classes.icon, classes.iconVariant)} />
               {this.renderSnackbarMessage()}
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

let mapStateToProps = (state) => {
  return {
    todos: state.todos,
    userInfo: state.userInfo,
  };
}

export default compose(
  withStyles(loginPageStyle),
  connect(mapStateToProps, null)
)(LoginPage);
