"use strict";

exports.getBookStateObject = function() {
  return {
    bookList: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    addState: {
      pending: false,
      success: false,
      failure: false
    },
    updateState: {
      pending: false,
      success: false,
      failure: false
    },
    deleteState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  };
};

exports.getBookObject = function(title = "", authorName = "") {
  return {
    title: title,
    author: authorName
  };
};

exports.getAuthorStateObject = function() {
  return {
    authorList: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  };
};
