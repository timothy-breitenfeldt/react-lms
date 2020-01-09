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

  resetAddState() {
    this.store.bookState.addState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetUpdateState() {
    this.store.bookState.updateState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetDeleteState() {
    this.store.bookState.deleteState = {
      pending: false,
      success: false,
      failure: false
    };
  }
}

const bookStore = new BookStoreClass();

Dispatcher.register(action => {
  switch (action.actionType) {
    case "read_books_successful":
      bookStore.resetReadState();
      bookStore.store.bookState.bookList = action.data;
      bookStore.store.bookState.readState.success = true;
      bookStore.emitChange();
      break;
    case "read_books_failure":
      bookStore.resetReadState();
      bookStore.store.bookState.readState.failure = true;
      bookStore.emitChange();
      break;
    case "read_books_started":
      bookStore.resetReadState();
      bookStore.store.bookState.readState.pending = true;
      bookStore.emitChange();
      break;
    case "add_books_successful":
      bookStore.resetReadState();
      bookStore.store.bookState.bookList = action.data;
      bookStore.store.bookState.addState.success = true;
      bookStore.emitChange();
      break;
    case "add_books_failure":
      bookStore.resetReadState();
      bookStore.store.bookState.addState.failure = true;
      bookStore.emitChange();
      break;
    case "add_books_started":
      bookStore.resetReadState();
      bookStore.store.bookState.addState.pending = true;
      bookStore.emitChange();
      break;
  }
});

export default bookStore;
