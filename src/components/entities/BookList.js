"use strict";

import React from "react";
import PropTypes from "prop-types";

import { BookActions } from "../../actions/bookActions";
import { getBookAuthorObject } from "../../factories/lmsFactory";
import InputModal from "../modals/InputModal";

export default class BookList extends React.Component {
  constructor(props) {
    super(props);
    document.write(JSON.stringify(props));
  }

  createBookRow(book) {
    return (
      <tr key={book.book_id}>
        <td> {book.book_id} </td>
        <td> {book.title} </td>
        <td> {book.author} </td>
      </tr>
    );
  }

  addBook(bookObject) {
    BookActions.addBook(bookObject);
  }

  componentDidMount() {
    alert("before read");
    BookActions.readBooks();
    alert("after read");
  }

  render() {
    let content = "";

    if (
      this.props.bookState.readState.pending ||
      this.props.bookState.adState.pending
    ) {
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (
      this.props.bookState.readState.success ||
      this.props.bookState.adState.success
    ) {
      content = (
        <div>
          <InputModal
            title="Add New Book"
            dataObject={getBookAuthorObject()}
            action={this.addBook}
          />
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {this.props.bookState.bookList.map(this.createBookRow)}
            </tbody>
          </table>
        </div>
      );
    }

    if (
      this.props.bookState.readState.failure ||
      this.props.bookState.adState.failure
    ) {
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
