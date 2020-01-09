"use strict";

import React from "react";
import { Link } from "@reach/router";

export default function Header() {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <ul className="list-inline">
          <li className="list-inline-item" aria-hidden="true">
            <Link to="/" className="navbar-brand">
              <img
                width="90px"
                height="30px"
                src="images/logo.png"
                alt="Logo"
              />
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="/" replace>
              Home
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="/books" replace>
              Books
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="/authors" replace>
              Authors
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
