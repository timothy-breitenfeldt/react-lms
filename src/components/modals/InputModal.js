"use strict";

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import AddButton from "../buttons/AddButton";

export default class InputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      dataObject: this.props.dataObject
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handelFormChange.bind(this);
    this.onFormSubmition.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onFormSubmition(event) {
    event.preventDefault();
    this.props.action(this.state.dataObject);
    this.closeModal();
  }

  handelFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <AddButton name={this.props.title} handel={this.openModal} />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel={this.props.title}
        >
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={this.closeModal}
          >
            Close
          </button>

          <h2>{this.props.title}</h2>
          <form onSubmit={this.onFormSubmition}>
            {Object.entries(this.state.dataObject).map(entry => {
              let dataName = entry[0];
              let dataValue = entry[1];
              return (
                <div className="form-group" key={dataName}>
                  <label htmlFor={dataName}>{dataName}</label>
                  <input
                    type="text"
                    id={dataName}
                    className="form-control"
                    name={dataName}
                    value={dataValue}
                    onChange={this.handelFormChange}
                    required="true"
                  />
                </div>
              );
            })}

            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}

Modal.setAppElement("#app");

InputModal.propTypes = {
  title: PropTypes.string.isRequired,
  dataObject: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired
};
