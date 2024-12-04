import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignInPage} />
        <Route path="/register" component={RegisterPage} />
        {/* Protect the home route so only authenticated users can access it */}
         {/* Temporarily remove PrivateRoute to allow direct access to HomePage */}
         <Route path="/home" component={HomePage} />

         <Route path="/projects" component={ProjectsPage} /> {/* Add route for ProjectsPage */}
      </Switch>
    </Router>
  );
}

export default App;
