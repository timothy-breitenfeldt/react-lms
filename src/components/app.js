"use strict";

import React from "react";
import { Router } from "@reach/router";

import Header from "./header.js";
import Home from "./home.js";
import BookList from "./entities/BookList";
import bookStore from "../stores/bookStore";
import * as factory from "../factories/lmsFactory";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookState: factory.getBookStateObject()
    };
  }

  _onBookChange() {
    this.setState({ bookState: bookStore.getAllBooks() });
  }

  componentDidMount() {
    bookStore.addChangeListener(this._onBookChange.bind(this));
  }

  componentWillUnmount() {
    bookStore.removeChangeListener(this._onBookChange.bind(this));
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          <Home path="/" />
          <BookList path="/books" bookState={this.state.bookState} />
        </Router>
      </div>
    );
  }
}
