import Dispatcher from "../dispatcher/appDispatcher";
import { EventEmitter } from "events";

import { getBookStateObject } from "../factories/lmsFactory";

const CHANGE_EVENT = "change";

class BookStoreClass extends EventEmitter {
  constructor(props) {
    super(props);
    this.store = {
      bookState: getBookStateObject()
    };
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAllBooks() {
    return this.store.bookState;
  }

  resetReadState() {
    this.store.bookState.readState = {
      pending: false,
      success: false,
      failure: false
    };
  }
}

const bookStore = new BookStoreClass();

Dispatcher.register(action => {
  switch (action.actionType) {
    case "read_books_successful": {
      bookStore.resetReadState();
      bookStore.store.bookState.bookList = action.data;
      bookStore.store.bookState.readState.success = true;
      bookStore.emitChange();
      break;
    }
    case "read_books_failure": {
      bookStore.resetReadState();
      bookStore.store.bookState.readState.failure = true;
      bookStore.store.bookState.error = action.error;
      bookStore.emitChange();
      break;
    }
    case "read_books_started": {
      bookStore.resetReadState();
      bookStore.store.bookState.readState.pending = true;
      bookStore.emitChange();
      break;
    }
    case "add_books_successful": {
      bookStore.resetReadState();
      bookStore.store.bookState.bookList.push(action.data);
      bookStore.store.bookState.readState.success = true;
      bookStore.emitChange();
      break;
    }
    case "add_books_failure": {
      bookStore.resetReadState();
      bookStore.store.bookState.readState.failure = true;
      bookStore.store.bookState.error = action.error;
      bookStore.emitChange();
      break;
    }
    case "add_books_started": {
      bookStore.resetReadState();
      bookStore.store.bookState.readState.pending = true;
      bookStore.emitChange();
      break;
    }
    case "update_books_successful": {
      bookStore.resetReadState();
      const bookAuthor = action.data;
      const bookList = bookStore.store.bookState.bookList;
      const index = bookList.findIndex(b => b.bookId == bookAuthor.bookId);
      Object.assign(bookList[index], bookAuthor);
      bookStore.store.bookState.readState.success = true;
      bookStore.emitChange();
      break;
    }
    case "update_books_failure": {
      bookStore.resetReadState();
      bookStore.store.bookState.readState.failure = true;
      bookStore.store.bookState.error = action.error;
      bookStore.emitChange();
      break;
    }
    case "update_books_started": {
      bookStore.resetReadState();
      bookStore.store.bookState.readState.pending = true;
      bookStore.emitChange();
      break;
    }
    case "delete_books_successful": {
      bookStore.resetReadState();
      //Return book that excludes the deleted book  book from bookList.
      const bookId = action.data;
      const bookList = bookStore.store.bookState.bookList;
      bookList.splice(
        bookList.findIndex(b => b.bookId === bookId),
        1
      );
      bookStore.store.bookState.readState.success = true;
      bookStore.emitChange();
      break;
    }
    case "delete_books_failure": {
      bookStore.resetReadState();
      bookStore.store.bookState.readState.failure = true;
      bookStore.store.bookState.error = action.error;
      bookStore.emitChange();
      break;
    }
    case "delete_books_started": {
      bookStore.resetReadState();
      bookStore.store.bookState.readState.pending = true;
      bookStore.emitChange();
      break;
    }
  }
});

export default bookStore;
