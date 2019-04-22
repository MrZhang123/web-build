import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

class RouterLink extends Component {
  render() {
    return (
      <div className="silder">
        <div className="silder-children">
          <div className="logo">
            <a href="/">
              <img src="src/assets/logo.png" alt="logo" />
              <h1>Singularity</h1>
            </a>
          </div>
          <ul className="menu">
            <li className="menu-item">
              <div className="meun-item-title">
                <Link to="/">首页</Link>
              </div>
            </li>
            <li className="menu-item">
              <div className="meun-item-title">
                <Link to="/about">关于</Link>
              </div>
            </li>
            <li className="menu-item">
              <div className="meun-item-title">
                <Link to="/topics">主题列表</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RouterLink;
