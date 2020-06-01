import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


import JobListingPage from './pages/JobListing';
import JobDetailPage from './pages/JobDetail';
import FormPage from './pages/Form';

import './App.css';

class App extends Component {
  

  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={JobListingPage} />
        <div className="container" />
        <Route exact path="/detail" component={JobDetailPage} />
        <Route exact path="/form" component={FormPage} />
      </div>
    </Router>
    );
  }
}

export default App;
