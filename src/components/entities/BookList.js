"use strict";

import React from "react";
import PropTypes from "prop-types";

import { BookActions } from "../../actions/bookActions";
import { getBookAuthorObject } from "../../factories/lmsFactory";
import InputModal from "../modals/InputModal";
//import UpdateButton from "../buttons/UpdateButton";
//import DeleteButton from "../buttons/DeleteButton";

export default class BookList extends React.Component {
  constructor(props) {
    super(props);
  }

  createBookRow(book) {
    return (
      <tr key={book.bookId}>
        <td> {book.bookId} </td>
        <td> {book.title} </td>
        <td> {book.author} </td>
        {/*
        <td>
          <UpdateButton name="Update" handel={} />
          <DeleteButton name="Delete" handel={} />
        </td>
        */}
      </tr>
    );
  }

  addBook(bookAuthorObject) {
    BookActions.addBook(bookAuthorObject);
  }

  updateBook(bookAuthorObject) {
    //Get the value of the first collumn by stepping up to the parentNode of the button target to td, then to tr, then step down to the first element which is the cell with the ID.
    //const bookId = event.target.parentNode.parentNode.firstChild.innerHTML;
    //const bookAuthor = this.state.bookState.bookList.filter(b -> b.bookId == bookId)[0];
    BookActions.updateBook(bookAuthorObject);
  }

  deleteBook(bookId) {
    BookActions.deleteBook(bookId);
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
