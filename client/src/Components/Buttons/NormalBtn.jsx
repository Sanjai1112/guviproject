import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
let NormalBtn = props => {
  let { btnName, onClick } = props;
  return (
    <button className="btn btn-normal" onClick={onClick}>
      {btnName}
    </button>
  );
};
NormalBtn.proptype = {
  btnName: PropTypes.string.isRequired
};
NormalBtn.defaultProps = {
  btnName: "LogIn"
};
export default NormalBtn;
