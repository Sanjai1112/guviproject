import React, { Component } from "react";
import PropTypes from "prop-types";
import "./login.scss";
import NormalBtn from "../Buttons/NormalBtn";
// import GmailBtn from "../Buttons/GmailBtn";
import axios from "axios";
import { Redirect } from "react-router";
class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      name: "",
      dob: "",
      age: "",
      phone: "",
      btnName: "LogIn",
      label: "Sign Up",
      isLoginRequest: false,
      isError: false,
      errorMessage: "",
      showInformation: false,
      currentUser: {},
      isLoading: false,
      loadingMessage: ""
      // isSignupRequest: false
    };
  }
  componentWillMount() {
    // console.log(this.props.location.state);
    if (this.props.location.state === undefined) {
      this.setState({ label: "Sign Up" });
      return;
    }
    if (this.props.location.state.signinRequested)
      this.setState({
        label: "LogIn",
        btnName: "Sign Up",
        isLoginRequest: true
      });
  }
  componentDidMount() {
    this.userNameRef.focus();
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleKeyDown = event => {
    if (event.key === "Enter") this.handleClick();
  };
  handleClick = () => {
    this.state.label === "Sign Up"
      ? this.phoneRef.blur()
      : this.passwordRef.blur();
    if (
      this.state.username.trim() === "" ||
      !this.state.username.endsWith("@gmail.com")
    ) {
      if (this.state.username.trim() === "") {
        this.setState({ isError: true, errorMessage: "Email is empty" });
        this.userNameRef.focus();
        console.log("Email is empty");
        return;
      }
      if (!this.state.username.endsWith("@gmail.com")) {
        this.setState({
          isError: true,
          errorMessage: "Email should end with @xyz.com"
        });
        return;
      }
      this.setState({ isError: true, errorMessage: "Email is empty" });
      this.userNameRef.focus();
      console.log("Email is empty");
    }
    if (this.state.password.trim() === "") {
      this.setState({ isError: true, errorMessage: "Password is empty" });
      this.passwordRef.focus();
      console.log("password is empty");
      return;
    } else if (this.state.label === "Sign Up") {
      if (this.state.name.trim() === "") {
        this.setState({ isError: true, errorMessage: "Name is empty" });
        this.nameRef.focus();
        console.log("Name is empty");
        return;
      } else if (this.state.dob.trim() === "") {
        this.setState({ isError: true, errorMessage: "DOB is empty" });
        this.DOBRef.focus();
        console.log("DOB is empty");
        return;
      } else if (this.state.dob.trim().length !== 0) {
        // console.log("entered");
        let enteredDate = this.state.dob.trim().split("/");
        if (enteredDate.length !== 3) {
          this.setState({
            isError: true,
            errorMessage: "DOB should be appropraite"
          });
          this.DOBRef.focus();
          return;
        }
        let dd = enteredDate[0];
        let mm = enteredDate[1];
        let yy = enteredDate[2];
        let date = new Date(yy, mm, dd);
        let diff = Date.now() - date.getTime();
        let calculate = new Date(diff);
        let currentAge = calculate.getUTCFullYear() - 1970;
        // console.log(currentAge)
        this.setState({ age: currentAge });
      } else if (this.state.age.trim() === "") {
        this.setState({ isError: true, errorMessage: "Age is empty" });
        this.ageRef.focus();
        console.log("Age is empty");
        return;
      }
      if (
        this.state.phone.trim() === "" ||
        this.state.phone.trim().length !== 10
      ) {
        // console.log(this.state.phone.trim());
        // console.log(this.state.phone.length !== 10);
        // if (!this.state.phone.trim() === "" && this.state.phone.length !== 10) {
        //   console.log("entered")
        this.setState({
          isError: true,
          errorMessage: "Phone number should be 10 digit number"
        });
        console.log("Phone number should be 10 didgit number");
        //   return;
        // }
        // console.log("called");
        // this.setState({ isError: true, errorMessage: "Phone number is empty" });
        // this.phoneRef.focus();
        // console.log("phone number is empty");
        return;
      }
    }
    if (this.state.isError)
      //To reset the isError state after user enters the things correct
      this.setState({ isError: false });
    let data;
    this.state.label === "Sign Up"
      ? (data = {
          username: this.state.username.trim(),
          password: this.state.password.trim(),
          name: this.state.name,
          dob: this.state.dob,
          age: this.state.age,
          phone: this.state.phone.trim()
        })
      : (data = {
          username: this.state.username.trim(),
          password: this.state.password.trim()
        });
    // console.log(this.state.isLoginRequest);
    // console.log(data);
    if (this.state.isLoginRequest) {
      this.setState({ isLoading: true, loadingMessage: "Logging you up" });
      axios
        .post("https://guviproject.herokuapp.com/login", { data })
        .then(res => {
          // console.log(res);
          // console.log(res.data.message);
          if (res.data.isError) {
            this.setState({
              isError: res.data.isError,
              errorMessage: res.data.message,
              isLoading: false,
              loadingMessage: ""
            });
          } else {
            // console.log(res.data.message);
            this.setState({
              showInformation: true,
              currentUser: res.data.message,
              isLoading: false,
              loadingMessage: ""
            });
          }
        });
    } else {
      // console.log("Signup requested");
      this.setState({ isLoading: true, loadingMessage: "Signing you up" });
      axios
        .post("https://guviproject.herokuapp.com/signup", {
          data
        })
        .then(res => {
          // console.log(res);
          console.log(res.data.message);
          if (res.data.isError) {
            this.setState({
              isError: res.data.isError,
              errorMessage: res.data.message,
              isLoading: false,
              loadingMessage: ""
            });
          } else {
            this.setState({
              showInformation: true,
              currentUser: res.data.message,
              isLoading: false,
              loadingMessage: ""
            });
          }
        });
    }

    this.setState({
      username: "",
      password: "",
      name: "",
      age: "",
      dob: "",
      phone: ""
    });
  };
  handleAge = () => {
    let enteredDate = this.state.dob.trim().split("/");
    if (enteredDate.length !== 3) {
      this.setState({
        isError: true,
        errorMessage: "DOB should be appropraite"
      });
      this.DOBRef.focus();
      return;
    }
    let dd = enteredDate[0];
    let mm = enteredDate[1];
    let yy = enteredDate[2];
    let date = new Date(yy, mm, dd);
    let diff = Date.now() - date.getTime();
    let calculate = new Date(diff);
    let currentAge = calculate.getUTCFullYear() - 1970;
    // console.log(currentAge)
    this.setState({ age: currentAge });
  };
  handleBtnName = () => {
    let btnName = this.state.btnName === "LogIn" ? "Sign Up" : "LogIn";
    let label = this.state.label === "Sign Up" ? "LogIn" : "Sign Up";
    let isLoginRequest = label === "LogIn" ? true : false;
    this.setState({
      btnName: btnName,
      label: label,
      isLoginRequest,
      isError: false,
      username: "",
      password: "",
      name: "",
      age: "",
      phone: "",
      bloodgroup: ""
    });
  };
  render() {
    // console.log(this.state.currentUser);
    // let signedOut;
    // console.log(this.props.location.state);
    // if (this.props.location.state === undefined) signedOut = false;
    // else {
    //   signedOut = this.props.location.state.signedOut;
    //   this.props.location.state = undefined;
    // }

    if (this.state.showInformation)
      return (
        <Redirect
          to={{
            pathname: "/details",
            state: { signedIn: true, currentUser: this.state.currentUser }
          }}
        />
      );
    let { label } = this.state;
    // console.log(this.state.isLoginRequest);
    return (
      <React.Fragment>
        {/* <div>
          {signedOut ? (
            <div className="signedout">
              <p>Signed Out Successfully</p>
            </div>
          ) : (
            ""
          )}
        </div> */}
        <div className="login">
          {this.state.isLoading ? (
            <div className="loading">
              <p>Please wait while {this.state.loadingMessage}</p>
            </div>
          ) : (
            ""
          )}
          <h4 className="text">{label}</h4>
          {this.state.isError ? (
            <div className="error-message">{this.state.errorMessage}</div>
          ) : (
            ""
          )}
          <input
            ref={ref => (this.userNameRef = ref)}
            type="email"
            placeholder="Enter your email as username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            ref={ref => (this.passwordRef = ref)}
            type="password"
            placeholder="Enter your password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            onKeyDown={label === "LogIn" ? this.handleKeyDown : null}
          />
          {label === "Sign Up" ? (
            <React.Fragment>
              <input
                type="text"
                ref={ref => (this.nameRef = ref)}
                placeholder="enter your name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <input
                type="text"
                ref={ref => (this.DOBRef = ref)}
                placeholder="enter your DOB (dd/mm/yy)"
                name="dob"
                value={this.state.dob}
                onChange={this.handleChange}
                onBlur={this.handleAge}
              />
              <input
                type="text"
                ref={ref => (this.ageRef = ref)}
                placeholder="enter your age"
                name="age"
                value={this.state.age}
                onChange={this.handleChange}
              />
              <input
                type="text"
                ref={ref => (this.phoneRef = ref)}
                placeholder="enter your phone number"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
            </React.Fragment>
          ) : (
            ""
          )}
          <button className="submit" onClick={this.handleClick}>
            Submit
          </button>
          <div className="btn-wrap">
            {/* <GmailBtn /> */}
            <NormalBtn
              onClick={this.handleBtnName}
              btnName={this.state.btnName}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Login.proptype = {
  label: PropTypes.string.isRequired
};
Login.defaultProps = {
  label: "Sign Up"
};
export default Login;
