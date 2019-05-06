import React, { Component } from "react";
class NotFound extends Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          transform: "translate(-50%,-50%)",
          left: "50%",
          top: "50%"
        }}
      >
        <h2 style={{ fontWeight: "400" }}>404 Page Not Found</h2>
      </div>
    );
  }
}
export default NotFound;
