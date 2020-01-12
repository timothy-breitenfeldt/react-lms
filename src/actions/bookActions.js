import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";

export const BookActions = {
  readBooks: function() {
    Dispatcher.dispatch({
      actionType: "read_books_started"
    });

    axios
      .get(`http://localhost:3000/bookauthors`)
      .then(res => {
        Dispatcher.dispatch({
          actionType: "read_books_successful",
          data: res.data
        });
      })
      .catch(error => {
        alert(error);
        console.log(error);
        Dispatcher.dispatch({
          actionType: "read_books_failure",
          error: error
        });
      });
  },

  addBook: function(bookAuthor) {
    Dispatcher.dispatch({
      actionType: "add_books_started"
    });

    axios
      .post(`http://localhost:3000/bookauthors`, bookAuthor)
      .then(res => {
        Object.assign(bookAuthor, res.data);
        Dispatcher.dispatch({
          actionType: "add_books_successful",
          data: bookAuthor
        });
      })
      .catch(error => {
        console.log(error);
        Dispatcher.dispatch({
          actionType: "add_books_failure",
          error: error
        });
      });
  },

  updateBook: function(bookAuthor) {
    Dispatcher.dispatch({
      actionType: "update_books_started"
    });

    axios
      .put(`http://localhost:3000/bookauthors`, bookAuthor)
      .then(() => {
        Dispatcher.dispatch({
          actionType: "update_books_successful",
          data: bookAuthor
        });
      })
      .catch(error => {
        console.log(error);
        Dispatcher.dispatch({
          actionType: "update_books_failure",
          error: error
        });
      });
  },

  deleteBook: function(bookId) {
    Dispatcher.dispatch({
      actionType: "delete_books_started"
    });

    axios
      .delete(`http://localhost:3000/books/${bookId}`)
      .then(() => {
        Dispatcher.dispatch({
          actionType: "delete_books_successful",
          data: bookId
        });
      })
      .catch(error => {
        alert(error);
        console.log(error);
        Dispatcher.dispatch({
          actionType: "delete_books_failure",
          error: error
        });
      });
  }
};
