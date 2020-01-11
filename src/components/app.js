"use strict";

import React from "react";
import { Router } from "@reach/router";

import Header from "./header.js";
import Home from "./home.js";
import BookList from "./entities/BookList";
import AuthorList from "./entities/AuthorList";
import bookStore from "../stores/bookStore";
import authorStore from "../stores/authorStore";
import * as factory from "../factories/lmsFactory";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookState: factory.getBookStateObject(),
      authorState: factory.getAuthorStateObject()
    };
  }

  _onBookChange() {
    this.setState({ bookState: bookStore.getAllBooks() });
  }

  _onAuthorChange() {
    this.setState({ authorState: authorStore.getAllAuthors() });
  }

  componentDidMount() {
    bookStore.addChangeListener(this._onBookChange.bind(this));
    authorStore.addChangeListener(this._onAuthorChange.bind(this));
  }

  componentWillUnmount() {
    authorStore.removeChangeListener(this._onAuthorChange.bind(this));
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          <Home path="/" />
          <BookList path="/books" bookState={this.state.bookState} />
          <AuthorList path="/authors" authorState={this.state.authorState} />
        </Router>
      </div>
    );
  }
}
