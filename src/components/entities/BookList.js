"use strict";

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import { BookActions } from "../../actions/bookActions";
import { getBookAuthorObject } from "../../factories/lmsFactory";
import AddButton from "../buttons/AddButton";
//import UpdateButton from "../buttons/UpdateButton";
//import DeleteButton from "../buttons/DeleteButton";

Modal.setAppElement("#app");

export default class BookList extends React.Component {
  constructor(props) {
    super(props);
    const bookAuthor = getBookAuthorObject();
    Object.assign(bookAuthor, { isModalOpen: false });
    this.state = bookAuthor;

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onAddBookFormSubmition = this.onAddBookFormSubmition.bind(this);
    this.handelFormChange = this.handelFormChange.bind(this);
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

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  onAddBookFormSubmition(event) {
    event.preventDefault();
    const bookAuthor = getBookAuthorObject();
    for (let k of Object.keys(bookAuthor)) bookAuthor[k] = this.state[k];
    this.addBook(bookAuthor);
    this.closeModal();
  }

  handelFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Book"
          >
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={this.closeModal}
            >
              Close
            </button>

            <h2>Add Book</h2>
            <form onSubmit={this.onAddBookFormSubmition}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  name="title"
                  onChange={this.handelFormChange}
                  required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  name="author"
                  onChange={this.handelFormChange}
                  required="true"
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
          </Modal>

          <AddButton name="Add Book" handel={this.openModal} />

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
