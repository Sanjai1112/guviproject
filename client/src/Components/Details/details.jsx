import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "./details.scss";
let count = 0;
class Details extends Component {
  state = {
    id: "",
    name: "",
    phone: "",
    dob: "",
    age: "",
    togglenameEdit: true,
    togglephoneEdit: true,
    toggleageEdit: true,
    toggledobEdit: true,
    isError: false,
    isLogout: false
  };
  componentWillMount() {
    //console.log("Details component will mount");
    if (this.props.location.state !== undefined) {
      let { id } = this.props.location.state.currentUser;
      axios.get(`https://guviproject.herokuapp.com/details/${id}`).then(res => {
        //console.log(res.data);
        if (res.data.isError) this.setState({ isError: res.data.isError });
        else {
          let { userid, name, phone, age, dob } = res.data.message;
          this.setState({ id: userid, name, phone, age, dob });
        }
      });
      // const {
      //   id,
      //   name,
      //   phone,
      //   dob,
      //   age
      // } = this.props.location.state.currentUser;
      // this.setState({ id, name, phone, dob, age });
    }
  }
  handleEdit = eName => {
    if (eName === "name") {
      this.setState({ togglenameEdit: !this.state.togglenameEdit });
      if (this.state.togglenameEdit) {
        count++;
        this.nameRef.removeAttribute("class");
        this.nameRef.setAttribute("class", "items-input_toggle");
        this.nameRef.setAttribute("style", "pointer-events:visible");
      } else {
        count--;
        this.nameRef.removeAttribute("style");
        this.nameRef.setAttribute("class", "items-input");
      }
    }
    if (eName === "phone") {
      this.setState({ togglephoneEdit: !this.state.togglephoneEdit });
      if (this.state.togglephoneEdit) {
        count++;
        this.phoneRef.removeAttribute("class");
        this.phoneRef.setAttribute("class", "items-input_toggle");
        this.phoneRef.setAttribute("style", "pointer-events:visible");
      } else {
        count--;
        this.phoneRef.removeAttribute("style");
        this.phoneRef.setAttribute("class", "items-input");
      }
    }
    if (eName === "age") {
      this.setState({ toggleageEdit: !this.state.toggleageEdit });
      if (this.state.toggleageEdit) {
        count++;
        this.ageRef.removeAttribute("class");
        this.ageRef.setAttribute("class", "items-input_toggle");
        this.ageRef.setAttribute("style", "pointer-events:visible");
      } else {
        count--;
        this.ageRef.removeAttribute("style");
        this.ageRef.setAttribute("class", "items-input");
      }
    }
    if (eName === "dob") {
      this.setState({ toggledobEdit: !this.state.toggledobEdit });
      if (this.state.toggledobEdit) {
        count++;
        this.dobRef.removeAttribute("class");
        this.dobRef.setAttribute("class", "items-input_toggle");
        this.nameRef.setAttribute("style", "pointer-events:visible");
      } else {
        count--;
        this.dobRef.removeAttribute("style");
        this.dobRef.setAttribute("class", "items-input");
      }
    }
  };
  handleChange = event => {
    this.setState({ [event.target.name]: [event.target.value] });
  };
  handleKeyDown = event => {
    if (event.key === "Enter") {
      count--;
      event.target.blur();
      this.handleSubmit();
    }
    return;
  };
  handleSubmit = event => {
    let { id, name, phone, age, dob } = this.state;
    phone = phone.toString(); //since phone becomes array after value change,reason is ot known
    name = name.toString();
    age = age.toString();
    dob = dob.toString();
    let data = { id, name, phone, age, dob };
    //console.log(id + " " + name + " " + phone + " " + age + " " + dob);
    axios
      .post(" https://guviproject.herokuapp.com/details", { data: data })
      .then(res => {
        //console.log(res.data);
        if (res.data.isError) {
          this.setState({ isError: res.data.isError });
        } else {
          let { name, phone, age, dob } = res.data;
          this.setState({ name: name, phone: phone, age: age, dob: dob });
        }
      });
  };
  render() {
    // //console.log(this.state.currentUser);
    // //console.log(count);
    if (this.props.location.state === undefined)
      return (
        <Redirect
          to={{ pathname: "/", state: { signedIn: false, currentUser: null } }}
        />
      );
    if (this.state.isLogout) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <div className="item-header">
          <div
            style={{
              transform: "translateX(-5%)",
              position: "relative",
              animation: "glow 1000ms both linear "
            }}
          >
            <h4 style={{ fontWeight: "lighter" }}>Welcome {this.state.name}</h4>
          </div>
          <div
            className="items-list"
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <span style={{ fontWeight: "normal" }}>Name</span>:{" "}
            <input
              type="text"
              name="name"
              ref={ref => {
                this.nameRef = ref;
              }}
              value={this.state.name}
              onChange={this.handleChange}
              className="items-input"
              onKeyDown={this.handleKeyDown}
              onBlur={() => {
                this.nameRef.removeAttribute("class");
                this.nameRef.removeAttribute("style");
                this.nameRef.setAttribute("class", "items-input");
                count--;
              }}
            />
            <i
              className="far fa-edit"
              style={{ cursor: "pointer" }}
              onClick={this.handleEdit.bind(this, "name")}
            />
          </div>
          <div
            className="items-list"
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <span style={{ fontWeight: "normal" }}>Phone</span>:{" "}
            <input
              type="text"
              name="phone"
              ref={ref => {
                this.phoneRef = ref;
              }}
              value={this.state.phone}
              onChange={this.handleChange}
              className="items-input"
              onKeyDown={this.handleKeyDown}
              onBlur={() => {
                this.phoneRef.removeAttribute("class");
                this.phoneRef.removeAttribute("style");
                this.phoneRef.setAttribute("class", "items-input");
                count--;
              }}
            />
            <i
              className="far fa-edit"
              style={{ cursor: "pointer" }}
              onClick={this.handleEdit.bind(this, "phone")}
            />
          </div>
          <div
            className="items-list"
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <span style={{ fontWeight: "normal" }}>Age</span>:{" "}
            <input
              type="text"
              name="age"
              ref={ref => {
                this.ageRef = ref;
              }}
              value={this.state.age}
              onChange={this.handleChange}
              className="items-input"
              onKeyDown={this.handleKeyDown}
              onBlur={() => {
                this.ageRef.removeAttribute("class");
                this.ageRef.removeAttribute("style");
                this.ageRef.setAttribute("class", "items-input");
                count--;
              }}
            />
            <i
              className="far fa-edit"
              style={{ cursor: "pointer" }}
              onClick={this.handleEdit.bind(this, "age")}
            />
          </div>
          <div
            className="items-list"
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <span style={{ fontWeight: "normal" }}>D.O.B</span>:{" "}
            <input
              type="text"
              name="dob"
              ref={ref => {
                this.dobRef = ref;
              }}
              value={this.state.dob}
              onChange={this.handleChange}
              className="items-input"
              onKeyDown={this.handleKeyDown}
              onBlur={() => {
                this.dobRef.removeAttribute("class");
                this.dobRef.removeAttribute("style");
                this.dobRef.setAttribute("class", "items-input");
                count--;
              }}
            />
            <i
              className="far fa-edit"
              style={{ cursor: "pointer" }}
              onClick={this.handleEdit.bind(this, "dob")}
            />
          </div>
          {count !== 0 ? (
            <button className="items-update" onClick={this.handleSubmit}>
              Update
            </button>
          ) : (
            ""
          )}
          <button
            className="items-update"
            onClick={() => this.setState({ isLogout: true })}
          >
            Logout
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default Details;
