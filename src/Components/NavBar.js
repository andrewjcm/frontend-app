import React from 'react';
import { NavLink } from 'react-router-dom';
import { getToken, removeUserSession, getUser } from '../Utils/Common';

class NavBar extends React.Component {

  componentDidMount() {
    const token = getToken();
    if (!token && this.props.isAuth) {
      this.props.handleAuthChange(false);
      return;
    } else if (token && !this.props.isAuth) {
      this.props.handleAuthChange(true);
    }
  }

  componentDidUpdate() {
    const token = getToken();
    if (!token && this.props.isAuth) {
      this.props.handleAuthChange(false);
      return;
    } else if (token && !this.props.isAuth) {
      this.props.handleAuthChange(true);
    }
  }

  handleLogout(e) {
    removeUserSession();
    this.props.handleAuthChange(false);
  }

  render() {
    if (this.props.isAuth) {
      const userStr = getUser();
      const userChar = userStr.charAt(0);
      const user = userChar.toUpperCase() + userStr.slice(1);

      return (
        <div className="site-container">
          <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/">Home</NavLink>
          <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/dashboard">Dashboard</NavLink>
          <NavLink className="creds" to='/login' onClick={this.handleLogout}>Logout</NavLink>
          <span className="logout"> Welcome, {user}!</span>
        </div>
      );


    }
    return (
      <div className="site-container">
        <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/">Home</NavLink>
        <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/dashboard">Dashboard</NavLink>
        <NavLink className={(navData) => navData.isActive ? "active creds" : "creds" } to='/login'>Login</NavLink>
      </div>
    );
  }
}

export default NavBar;
