"use strict";

import React from "react";
import PropTypes from "prop-types";

import { AuthorActions } from "../../actions/authorActions";

export default class AuthorList extends React.Component {
  constructor(props) {
    super(props);
  }

  createAuthorRow(author) {
    return (
      <tr key={author.authorId}>
        <td> {author.authorId} </td>
        <td> {author.name}</td>
      </tr>
    );
  }

  componentDidMount() {
    AuthorActions.readAuthors();
  }

  render() {
    let content = "";

    if (this.props.authorState.readState.pending) {
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (this.props.authorState.readState.success) {
      content = (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.authorState.authorList.map(this.createAuthorRow)}
          </tbody>
        </table>
      );
    }

    if (this.props.authorState.readState.failure) {
      content = (
        <div className="alert alert-danger" role="alert">
          Error while loading authors!
        </div>
      );
    }

    return (
      <section>
        <h1>Authors</h1>
        {content}
      </section>
    );
  }
}

AuthorList.propTypes = {
  authorState: PropTypes.object.isRequired
};
