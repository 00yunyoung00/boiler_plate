import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';

import LandingPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NavBar"
import Footer from "./components/views/Footer/Footer"
import PostListContainer from './components/views/Board/PostListContainer';
import PostContainer from './components/views/Board/PostContainer'
import Editor from './components/views/Board/Editor';

//routing처리
function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
    <Router>
      <NavBar />
      <div style={{ paddingTop:'69px', minHeight:'calc(100vh-80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
          <Route exact path="/board" component={Auth(PostListContainer, null)}/>
          <Route exact path="/post/new" component={Editor}/>
          <Route exact path="/post/:id" component={PostContainer}/>
        </Switch>
      </div>
      <Footer />
    </Router>
    </Suspense>
  );
}

export default App;
