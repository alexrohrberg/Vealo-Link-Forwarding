import React from 'react';
import { Redirect } from 'react-router'
import './App.css';
import logo2x from './images/logo2x.png';
import plusIconX from './images/plusIconX.png';
import bubbleX from './images/bubbleX.png';
import Axios from 'axios';
import passport from 'passport';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { wait } from '@testing-library/react';


class NavBar extends React.Component {
  render() {
    return (
      <div className="nav">
        <a href="/home"><img id = "navlogo" src={logo2x} alt="logo"></img></a>
        <a id ="Profile" href="/profile"> Profile </a>
        <a id ="Login" href="/register"> Register </a>
      </div>
    );
  }
}
//<a id ="Profile" href="/profile"> Profile </a>
//<button id ="Profile" onClick={()=> profile()}> Profile </button>

class UserPod extends React.Component {
  render(){
    //TODO fix p1 and p2 tags and update styling for featured users
    return (
        <div id="user">
          <img id="plusIcon" src={plusIconX} alt="plus icon"></img>
          <img id="userImage" src={bubbleX} alt="user"></img>
          <p2 id="userName">Grace Feras</p2>
          <p1 id="job">Content Creator</p1>
        </div>
    );
  }
}

class Home extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        <div id="homediv">
          <h1 className="title">Welcome to Vealo!</h1>
          <p1 id="intro">We provide an easy way for influencers to connect their audience across platforms. 
            Easily link your followers to other profiles, websites, or apps!</p1>
          <h2 className="subtitle">Featured Users</h2>
          <ul id="pods">
            <li><UserPod /></li>
            <li><UserPod /></li>
            <li><UserPod /></li>
            <li><UserPod /></li>
            <li><UserPod /></li>
            <li><UserPod /></li>
          </ul> 
        </div>
      </div>
    )
  }
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegister : true,
      prompt: 'Create An Account',
      message: 'Already a User?',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      data: '',
    };
  }
  
  register = () => {
    Axios({
      method: "POST",
      data: {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => console.log(res));
  };

  login = () => {
    Axios({
      method: "POST",
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => console.log(res));
  };

  getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {(
      this.setState({data: res.data}));
      console.log(res.data);
    });
  };

  logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/logout",
    }).then((res) => {(
      this.setState({data: res.data}));
      console.log(res.data);
    });
  };


  toggleText(){
    if (this.state.showRegister){
      this.setState({prompt: 'Create An Account'});
      this.setState({message: 'Already a User?'});
    } else {
      this.setState({prompt: 'Login'});
      this.setState({message: 'Not a User?'});
    }
  }

  toggleState(){
    this.setState({showRegister : !this.state.showRegister},this.toggleText);
  }

  handleSubmit(){
    if(this.state.showRegister){
      this.register();
      this.toggleState();
    } else {
      this.login();
    }
  }

  render(){
    document.body.style.backgroundColor = "white";
    return (
      <div>
        <NavBar />
        <div id="login">
          <h1 className="blackSubtitle">{this.state.prompt}</h1>
          <form>
            <div id="loginfields">
              <div style={{ display: (this.state.showRegister ? 'block' : 'none') }}>
                <input onChange={(e) => this.setState({email: e.target.value})} placeholder="Email"></input>
              </div>
              <input onChange={(e) => this.setState({username: e.target.value})} placeholder="Username"></input>
              <input onChange={(e) => this.setState({password: e.target.value})} placeholder="Password"></input>
              <div style={{ display: (this.state.showRegister ? 'block' : 'none') }}>
                <input onChange={(e) => this.setState({confirmPassword: e.target.value})} placeholder="Confirm Password"></input>
              </div>
            </div>
            <div id="loginsubmit">
              <button type="button" onClick={() => this.handleSubmit()}>Submit</button>
            </div>
          </form>
          <a onClick={() => this.toggleState()} id="alreadyUser">{this.state.message}</a>
        </div>
        <div>
        <button onClick={()=> this.getUser()}>Get User</button>
          {this.state.data ? <h1>Welcome back {this.state.data.username}</h1> : null}
        <button onClick={()=> this.logout()}>Logout</button>
        </div>
      </div>
    );
  }
}

class Login extends React.Component {
  render(){
    document.body.style.backgroundColor = "white";
    return (
      <div>
        <NavBar />
        <div id="login">
          <h1 className="blackSubtitle">Login</h1>
          <form>
            <div id="loginfields">
              <input type="text" id="username" placeholder="Username"></input>
              <input type="text" id="pass" placeholder="Password"></input>
            </div>
            <div id="loginsubmit">
              <input type="submit" id="submit"></input>
            </div>
          </form>
          <a href="/register" id="notUser">Not a User?</a>
        </div>
      </div>
    );
  }
}

class Profile extends React.Component {
  render(){
    return (
      <div>
        <NavBar />    
        <div id="profilePage">
          <p>Hello World</p>
        </div>
      </div>
    );
  }
}

class PageNotFound extends React.Component {
  render(){
    return (
      <div id="errorPage">
        <h1>404 page not found</h1>
        <p>We are sorry but the page you are looking for does not exist.</p>
      </div>
    );
  }
}

class App extends React.Component {
  
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path={["/", "/home"]}>
            <Home />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    )
  }
}


export default App;
