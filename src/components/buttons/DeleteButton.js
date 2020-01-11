"use strict";

import React from "react";
import PropTypes from "prop-types";

export default function DeleteButton(props) {
  return (
    <button className="btn btn-danger btn-sm" onClick={props.handel}>
      {props.name}
    </button>
  );
}

DeleteButton.propTypes = {
  name: PropTypes.string.isRequired,
  handel: PropTypes.func.isRequired
};
