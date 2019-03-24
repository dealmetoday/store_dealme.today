import React from "react";
import classNames from 'classnames';

// Material-UI Components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

// Material Kit Components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

// Material-UI Icons
import Email from "@material-ui/icons/Email";
import InfoIcon from '@material-ui/icons/Info';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// Styles and Images
import signupPageStyle from "assets/jss/material-kit-react/views/signupPage.jsx";
import image from "assets/img/banner_busymall.jpeg";

// Utils
import Utils from "components/Utils/Utils.jsx";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      showPassword: false,
      open: false,
      message: "",

      name: "",
      parent: "",
      email: "",
      password: "",
      confirm: "",

      err_name: "",
      err_email: "",
      err_password: "",
      err_confirm: "",

      error: {
        name: false,
        email: false,
        password: false,
        confirm: false,
      },
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

  redirectLogin = () => {
    this.props.history.push("/login");
  }

  handleBlur = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    let new_error = this.state.error;

    if (id === "name") {
      new_error.name = !this.validName(value);
    } else if (id === "parent") {
      this.setState({ parent: value });
    } else if (id === "email") {
      new_error.email = !this.validEmail(value);
    } else if (id === "password") {
      new_error.password = !this.validPassword(this.state.name, value);
      if (this.state.confirm) {
        new_error.confirm = !this.validConfirm(value, this.state.confirm);
      }
    } else if (id === "confirm") {
      new_error.confirm = !this.validConfirm(this.state.password, value);
    }

    this.setState({ error: new_error });
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleSignup = async () => {
    if (this.state.error.name || !this.state.name) {
      return;
    } else if (this.state.error.email || !this.state.email) {
      return;
    } else if (this.state.error.password || !this.state.password) {
      return;
    } else if (this.state.error.confirm || !this.state.confirm) {
      return;
    }

    let parentVal = "";
    if (this.state.parent !== "") {
      parentVal = this.state.parent;
      this.setState({ parent: "" });
    }

    let params = {
      name: this.state.name,
      email: this.state.email,
      parentCompany: parentVal,
      password: await this.utils.encrypt(this.state.password)
    }

    let data = await this.utils.post('/stores', params);
    console.log(data);
    if (data.status !== "Success") {
      this.setState({ message: "Something went wrong - please try again later."});
      this.setState({ open: true });
    } else {
      // TODO: include minor delay
      this.setState({ message: "Redirecting to login."});
      this.setState({ open: true });
      this.props.history.push('/login');
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  validConfirm(password, confirm) {
    let errstring = "";
    if (!confirm) {
      errstring = "This is a required field";
    } else if (password && password !== confirm) {
      errstring = "Passwords do not match"
    }
    this.setState({ err_confirm: errstring });
    return (errstring.length === 0);
  }

  validEmail(email) {
    let errstring = "";
    if (!email) {
      errstring = "This is a required field";
      this.setState({ err_email: errstring });
      return false;
    }

    const re = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
    const valid = re.test(email);

    if (!valid) {
      errstring = "The email provided is invalid";
    }
    this.setState({ err_email: errstring });
    return valid;
  }

  validName(name) {
    let errstring = "";
    if (!name) {
      errstring = "This is a required field";
    }
    this.setState({ err_name: errstring });
    return (errstring.length === 0);
  }

  validPassword(username, password) {
    let errstring = "";
    if (!password) {
      errstring = "This is a required field";
      this.setState({ err_password: errstring });
      return false;
    }

    if (username && password.toUpperCase().includes(username.toUpperCase())) {
      errstring = "Your password cannot contain your store's name";
      this.setState({ err_password: errstring });
      return false;
    }

    // Password must contain at least one character, one number, and one symbol
    const re = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])(?=.{8,512})");
    const valid = re.test(password);

    if (!valid) {
      errstring  = "Password must contain one character, one number, and one "
      errstring += "of !@#$%^&";
    }
    this.setState({ err_password: errstring });
    return valid;
  }

  render() {
    const { classes, ...rest } = this.props;
    const Icon = InfoIcon;

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
            className={classNames(classes.info)}
            aria-describedby="client-snackbar"
            message={
             <span className={classes.message}>
               <Icon className={classNames(classes.icon, classes.iconVariant)} />
               {this.state.message}
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
                  <form ref="form" onSubmit={this.handleSubmit} className={classes.form}>
                    <CardHeader color="danger" className={classes.cardHeader}>
                      <h4>Create An Account</h4>
                    </CardHeader>

                    <CardBody>
                      <FormControl fullWidth className={classes.FormControl} error={this.state.error.name}>
                        <InputLabel
                          id="label_name"
                          htmlFor={(this.state.error.name) ? "component-error" : "component-simple"}
                        >
                          Store Name
                        </InputLabel>
                        <Input
                          id="name"
                          value={this.state.name}
                          onBlur={this.handleBlur}
                          onChange={this.handleChange}
                          aria-describedby="err_name"
                        />
                        <FormHelperText id="err_name">
                          {this.state.err_name}
                        </FormHelperText>
                      </FormControl>
                      <br/>

                      <FormControl fullWidth className={classes.FormControl}>
                        <InputLabel id="label_parent">
                          Parent Company
                        </InputLabel>
                        <Input
                          id="parent"
                          value={this.state.parent}
                          onChange={this.handleChange}
                        />
                      </FormControl>
                      <br/><br/>

                      <FormControl fullWidth className={classes.FormControl} error={this.state.error.email}>
                        <InputLabel
                          id="label_email"
                          htmlFor={(this.state.error.email) ? "component-error" : "component-simple"}
                        >
                          Email
                        </InputLabel>
                        <Input
                          id="email"
                          value={this.state.email}
                          onBlur={this.handleBlur}
                          onChange={this.handleChange}
                          aria-describedby="err_email"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton>
                                <Email />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText id="err_email">
                          {this.state.err_email}
                        </FormHelperText>
                      </FormControl>
                      <br/>

                      <FormControl fullWidth className={classes.FormControl} error={this.state.error.password}>
                        <InputLabel
                          id="label_password"
                          htmlFor={this.state.error.password ? "component-error" : "component-simple"}
                        >
                          Password
                        </InputLabel>
                        <Input
                          id="password"
                          type={this.state.showPassword ? "text" : "password"}
                          value={this.state.password}
                          onBlur={this.handleBlur}
                          onChange={this.handleChange}
                          aria-describedby="err_password"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleShowPassword}
                              >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText id="err_password">
                          {this.state.err_password}
                        </FormHelperText>
                      </FormControl>
                      <br/>

                      <FormControl fullWidth className={classes.FormControl} error={this.state.error.confirm}>
                        <InputLabel
                          id="label_confirm"
                          htmlFor={this.state.error.confirm ? "component-error" : "component-simple"}
                        >
                          Confirm Password
                        </InputLabel>
                        <Input
                          id="confirm"
                          type={this.state.showPassword ? "text" : "password"}
                          value={this.state.confirm}
                          onBlur={this.handleBlur}
                          onChange={this.handleChange}
                          aria-describedby="err_confirm"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleShowPassword}
                              >
                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText id="err_confirm">
                          {this.state.err_confirm}
                        </FormHelperText>
                      </FormControl>
                      <br/>
                      <div className={classes.signup}>
                        <Button round color="danger" size="lg" onClick={this.handleSignup}>
                          Sign up
                        </Button>
                      </div>
                    </CardBody>

                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" onClick={this.redirectLogin}>
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
