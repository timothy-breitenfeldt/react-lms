"use strict";

import React from "react";
import PropTypes from "prop-types";

export default function AddButton(props) {
  return (
    <button className="btn btn-primary btn-lg" onClick={props.handel}>
      {props.name}
    </button>
  );
}

AddButton.propTypes = {
  name: PropTypes.string.isRequired,
  handel: PropTypes.func.isRequired
};
