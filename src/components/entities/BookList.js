"use strict";

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import { BookActions } from "../../actions/bookActions";
import { getBookAuthorObject } from "../../factories/lmsFactory";
import AddButton from "../buttons/AddButton";
import UpdateButton from "../buttons/UpdateButton";
import DeleteButton from "../buttons/DeleteButton";

Modal.setAppElement("#app");

export default class BookList extends React.Component {
  constructor(props) {
    super(props);
    const bookAuthor = getBookAuthorObject();
    Object.assign(bookAuthor, { isModalOpen: false });
    this.state = bookAuthor;
    this.formMode = "";

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onDeleteBook = this.onDeleteBook.bind(this);
    this.setupModalForUpdate = this.setupModalForUpdate.bind(this);
    this.setupModalForAdd = this.setupModalForAdd.bind(this);
    this.onModalFormSubmition = this.onModalFormSubmition.bind(this);
    this.handelFormChange = this.handelFormChange.bind(this);
  }

  addBook(bookAuthorObject) {
    BookActions.addBook(bookAuthorObject);
  }

  updateBook(bookAuthorObject) {
    BookActions.updateBook(bookAuthorObject);
  }

  deleteBook(bookId) {
    BookActions.deleteBook(bookId);
  }

  onAddBook() {
    const bookAuthor = getBookAuthorObject();
    //Copy the properties for the bookAuthor object from this.state to a new object
    for (let k of Object.keys(bookAuthor)) bookAuthor[k] = this.state[k];
    this.addBook(bookAuthor);
  }

  onUpdateBook() {
    const bookAuthor = getBookAuthorObject();
    //Copy the properties for the bookAuthor object from this.state to a new object
    for (let k of Object.keys(bookAuthor)) bookAuthor[k] = this.state[k];
    this.updateBook(bookAuthor);
  }

  onDeleteBook(event) {
    //Get the value of the first collumn by stepping up to the parentNode of the button target to td, then to tr, then step down to the first element which is the cell with the ID.
    const bookId = event.target.parentNode.parentNode.firstChild.innerHTML;
    this.deleteBook(bookId);
  }

  setupModalForAdd() {
    this.formMode = "ADD";
    this.setState(getBookAuthorObject());
    this.openModal();
  }

  setupModalForUpdate(event) {
    this.formMode = "UPDATE";
    const bookId = event.target.parentNode.parentNode.firstChild.innerHTML;
    const index = this.props.bookState.bookList.findIndex(
      b => b.bookId == bookId
    );
    const bookAuthor = this.props.bookState.bookList[index];
    //document.getElementsByName("title")[0].value = bookAuthor.title;
    //document.getElementsByName("author")[0].value = bookAuthor.author;
    this.setState(bookAuthor);
    this.openModal();
  }

  onModalFormSubmition(event) {
    event.preventDefault();
    if (this.formMode === "UPDATE") {
      this.onUpdateBook();
    } else if (this.formMode === "ADD") {
      this.onAddBook();
    }
    this.formMode = "";
    this.closeModal();
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  handelFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  createBookRow(book) {
    return (
      <tr key={book.bookId}>
        <td> {book.bookId} </td>
        <td> {book.title} </td>
        <td> {book.author} </td>
        <td>
          <UpdateButton name="Update" handel={this.setupModalForUpdate} />
          <DeleteButton name="Delete" handel={this.onDeleteBook} />
        </td>
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
      const modalTitle = this.formMode == "UPDATE" ? "Update Book" : "Add Book";
      content = (
        <div>
          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.closeModal}
            contentLabel={modalTitle}
          >
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={this.closeModal}
            >
              Close
            </button>

            <h2>{modalTitle}</h2>
            <form onSubmit={this.onModalFormSubmition}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.handelFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  className="form-control"
                  name="author"
                  value={this.state.author}
                  onChange={this.handelFormChange}
                  required
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
          </Modal>

          <AddButton name="Add Book" handel={this.setupModalForAdd} />

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
