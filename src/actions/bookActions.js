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

  addBook: function(bookObject) {
    Dispatcher.dispatch({
      actionType: "add_books_started"
    });
    axios
      .post(`http://localhost:3000/bookauthors`, bookObject)
      .then(res => {
        Dispatcher.dispatch({
          actionType: "add_books_successful",
          data: res.data
        });
      })
      .catch(error => {
        console.log(error);
        Dispatcher.dispatch({
          actionType: "add_books_failure",
          error: error
        });
      });
  }
};
