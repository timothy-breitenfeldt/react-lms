"use strict";

import React from "react";
import PropTypes from "prop-types";

export default function UpdateButton(props) {
  return (
    <button className="btn btn-warning btn-sm" onClick={props.handel}>
      {props.name}
    </button>
  );
}

AddButton.propTypes = {
  name: PropTypes.string.isRequired,
  handel: PropTypes.func.isRequired
};
