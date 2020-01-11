"use strict";

export function getBookStateObject() {
  return {
    bookList: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  };
}

export function getAuthorStateObject() {
  return {
    authorList: [],
    readState: {
      pending: false,
      success: false,
      failure: false
    },
    error: ""
  };
}

export function getBookAuthorObject(
  bookId = 0,
  title = "",
  authorId = 0,
  authorName = ""
) {
  return {
    bookId: bookId,
    title: title,
    authorId: authorId,
    author: authorName
  };
}

export function getBookObject(bookId = 0, title = "", authorId = 0) {
  return {
    bookId: bookId,
    title: title,
    authorId: authorId
  };
}

export function getAuthorObject(authorId = 0, name = "") {
  return {
    authorId: authorId,
    name: name
  };
}
