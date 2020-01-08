"use strict";

import React from "react";
import PropTypes from "prop-types";
import BookActions from "../actions/bookActions";
//import { getBookObject } from "../factories/lmsFactory";

export default class BookList extends React.Component {
  createBookRow(book) {
    return (
      <tr key={book.book_id}>
        <td> {book.book_id} </td>
        <td> {book.title} </td>
        <td> {book.author} </td>
      </tr>
    );
  }

  componentDidMount() {
    BookActions.readBooks();
  }

  render() {
    let content = "";

    if (this.props.bookState.readState.pending) {
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (this.props.bookState.readState.success) {
      content = (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {this.props.bookState.bookList.map(this.createBookRow, this)}
          </tbody>
        </table>
      );
    }

    if (this.props.bookState.readState.failure) {
      content = (
        <div className="alert alert-danger" role="alert">
          Error while loading books!
        </div>
      );
    }

    return (
      <section>
        <h1>Books</h1>
        {content}
      </section>
    );
  }
}

BookList.propTypes = {
  bookState: PropTypes.object.isRequired
};
