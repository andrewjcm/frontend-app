import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Login from './Forms/Login';
import Dashboard from './Dashboard';
import Home from './Home';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import NavBar from "./Components/NavBar";
import { getToken, getRefresh, getUser, removeUserSession, setUserSession } from './Utils/Common';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.onAuthChange = this.onAuthChange.bind(this);
    this.state = {
      authLoading: true,
      isAuth: false
    }
  }

  onAuthChange(isAuth) {

    if (!isAuth) {
      const refresh = getRefresh();
      const user = getUser();
      axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: refresh,
        headers: {
          'Content-Type': 'application/json',
        }
     }
    ).then(response => {
      setUserSession(response.data.access, refresh, user);
      this.setState({ isAuth: true, authLoading: false });
      }).catch(error => {
        removeUserSession();
        this.setState({ isAuth: false, authLoading: false });
      });
    }
    else {
      this.setState({isAuth: true, authLoading: false})
    }
  }

  componentDidMount() {
    const token = getToken();
    if (!token && this.state.isAuth) {
      this.setState({ isAuth: false, authLoading: true });
      return;
    } else if (token && !this.state.isAuth) {
      this.setState({ isAuth: true, authLoading: false});
    }
  }

  componentDidUpdate() {
    const token = getToken();
    if (!token && this.state.isAuth) {
      this.setState({ isAuth: false, authLoading: true });
      return;
    } else if (token && !this.state.isAuth) {
      this.setState({ isAuth: true, authLoading: false});
    }
  }

  render() {
      if (this.state.authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>
      }

    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="header">
              <NavBar isAuth={ this.state.isAuth } handleAuthChange={this.onAuthChange}/>
            </div>
            <div className="site-container content">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<PublicRoute><Login handleAuthChange={this.onAuthChange}/></PublicRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard handleAuthChange={this.onAuthChange}/></PrivateRoute>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
        <div className="footer">
          By<a href="https://github.com/andrewjcm">andrewjcm</a><br/>
          <small>
            *Disclaimer: not all information on this site may be accurate
            Do not treat it as medical advice. This is for technology
            educational purposes only.
          </small>
        </div>
      </div>
    );
  }
}

export default App;
