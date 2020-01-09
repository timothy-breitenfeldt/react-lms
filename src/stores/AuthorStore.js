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

  resetAddState() {
    this.store.authorState.addState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetUpdateState() {
    this.store.authorState.updateState = {
      pending: false,
      success: false,
      failure: false
    };
  }

  resetDeleteState() {
    this.store.authorState.deleteState = {
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
      authorStore.emitChange();
      break;
    case "read_authors_started":
      authorStore.resetReadState();
      authorStore.store.authorState.readState.pending = true;
      authorStore.emitChange();
      break;
    case "add_authors_successful":
      authorStore.resetReadState();
      authorStore.store.authorState.authorList = action.data;
      authorStore.store.authorState.addState.success = true;
      authorStore.emitChange();
      break;
    case "add_authors_failure":
      authorStore.resetReadState();
      authorStore.store.authorState.addState.failure = true;
      authorStore.emitChange();
      break;
    case "add_authors_started":
      authorStore.resetReadState();
      authorStore.store.authorState.addState.pending = true;
      authorStore.emitChange();
      break;
  }
});

export default authorStore;
