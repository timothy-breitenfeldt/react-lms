import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";

export const AuthorActions = {
  readAuthors: function() {
    Dispatcher.dispatch({
      actionType: "read_authors_started"
    });

    axios
      .get(`http://localhost:3000/authors`)
      .then(res => {
        Dispatcher.dispatch({
          actionType: "read_authors_successful",
          data: res.data
        });
      })
      .catch(error => {
        Dispatcher.dispatch({
          actionType: "read_authors_failure",
          error: error
        });
      });
  },

  addAuthor: function(authorObject) {
    Dispatcher.dispatch({
      actionType: "add_authors_started"
    });

    axios
      .post(`$_domain}/authors`, authorObject)
      .then(res => {
        Dispatcher.dispatch({
          actionType: "add_authors_successful",
          data: res.data
        });
      })
      .catch(error => {
        Dispatcher.dispatch({
          actionType: "add_authors_failure",
          error: error
        });
      });
  }
};
