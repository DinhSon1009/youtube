import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavRouter extends Component {
  render() {
    return (
      <div>
        <NavLink
          exact
          style={{ marginRight: "20px" }}
          activeStyle={{ color: "red" }}
          to={"/"}
        >
          Trang chủ
        </NavLink>
      </div>
    );
  }
}
