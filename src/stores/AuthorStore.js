import Dispatcher from "../dispatcher/appDispatcher";
import { EventEmitter } from "events";

import { getAuthorStateObject } from "../factories/lmsFactory";

const CHANGE_EVENT = "change";

class AuthorStoreClass extends EventEmitter {
  constructor(props) {
    super(props);
    this.store = {
      authorState: getAuthorStateObject()
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

  getAllAuthors() {
    return this.store.authorState;
  }

  resetReadState() {
    this.store.authorState.readState = {
      pending: false,
      success: false,
      failure: false
    };
  }
}

const authorStore = new AuthorStoreClass();

Dispatcher.register(action => {
  switch (action.actionType) {
    case "read_authors_successful":
      authorStore.resetReadState();
      authorStore.store.authorState.authorList = action.data;
      authorStore.store.authorState.readState.success = true;
      authorStore.emitChange();
      break;
    case "read_authors_failure":
      authorStore.resetReadState();
      authorStore.store.authorState.readState.failure = true;
      authorStore.store.authorState.error = action.error;
      authorStore.emitChange();
      break;
    case "read_authors_started":
      authorStore.resetReadState();
      authorStore.store.authorState.readState.pending = true;
      authorStore.emitChange();
      break;
  }
});

export default authorStore;
