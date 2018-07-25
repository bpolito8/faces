//React Library Imports:
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, IndexRoute, Redirect, Switch, withRouter} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

//Styling Imports:
import './index.css';
import 'bootstrap';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Screen Imports:
import SignIn from './Screens/SignIn';
import Home from './Screens/Home';
import Feeds from './Screens/Feeds';
import SingleFeed from './Screens/SingleFeed';
import Profile from './Screens/Profile';
import MyProfile from './Screens/MyProfile';
import CreatePost from './Screens/CreatePost';
import apitest from './Screens/apitest';
import Discover from './Screens/Discover';
import CreateAccount from './Screens/CreateAccount';

import NavBar from './Components/NavBar';
import NavBarNoAuth from './Components/NavBarNoAuth';
import Footer from './Components/Footer';

class App extends React.Component {
  constructor(){
    super();
    this.signIn = this.signIn.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      signedIn: false
    };
  }

  //set state.signedin = false --constructor
  //check for local userid, if there is one sign in --componentWillMount
  //user signs in, set local userId
  
  //scrolls to the top on route change/render
  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  //save signed in user's id to local memory
  saveToLocal(){
      const local = this.state.userId;
      localStorage.setItem("userId", local);
      const localtoken = this.state.token;
      localStorage.setItem("token", localtoken);
  }

  componentWillMount(){
    this.getLocalUserId();
  }

  getLocalUserId(){
    console.log("trying to get local userid");
    if(localStorage.getItem('userId') && localStorage.getItem('token')){
      console.log("got " + localStorage.getItem('userId') + " as local userId");
      var localUserId = localStorage.getItem('userId');
      var localToken = localStorage.getItem('token');
      if(localUserId > 0){
        this.setState(
          {
            userId: localUserId,
            signedIn: true,
            token: localStorage.getItem('token')
            //redirectPath: '/'
          },
          () => {
            //this.props.history.push('/');
            this.forceUpdate();
          }
        );
      }
      // console.log("userId set to "+ this.state.userId);
      // this.setState({signedIn: true});
      // console.log("signedId set to "+ this.state.signedIn);
    }
    else console.log("failed to get local userid");
    //debugger;
    
  }

  signIn(username, password){
    fetch(`http://localhost:5000/noauth/signin`, {
      headers:{
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then((result) => { 
                    //TODO: add handling for incorrect password/username
                    debugger;
                    if(result.status == 404){
                      alert('Something went wrong.  Please retype both and try again.');
                    }
                    else {
                      return result.json();
                    }

                })
    .then((result) => {
      if(result){
        if(result.userId){
          console.log("signed in as userid = " + result.userId);
        console.log('got token: ' + result.token);
        this.setState(
          {
            token: result.token,
            userId: result.userId,
            signedIn: true,
            //redirectPath: '/'
          },
          () => {
            this.props.history.push('/');
            this.saveToLocal();
            this.forceUpdate();
          }
        );
        }
      }
    });
  }

  createAccount(data){
    fetch(`http://localhost:5000/noauth/createaccount`, {
      headers:{
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((result) => { 
              debugger;
              return result.json();
                })
    .then((result) => {
     this.setState({signedIn: true, userId: result.userId, token: result.token},
    () => this.props.history.push('/'));
    });
  }

  signOut(){
    this.setState({signedIn: false, userId: null, token: null},
    () =>  {
      this.saveToLocal();
      console.log('setting signedIn to false, and userId to null');
      this.props.history.push('/signin');});
   
  }

  // getRedirect(){
  //   debugger;
  //   // if(this.props.location.pathname == '/'){
  //   //   return;
  //   // }
  //   if(this.state.signedIn && this.state.userId){
  //     console.log("redirecting home");
  //     this.setState({redirectPath: "/"});
  //   }
  //   else{
  //     console.log("staying on signin page");
  //     this.setState({redirectPath: "/signin"});
  //   }
  // }

  render() {
    console.log(this.props.location.pathname);
    const LoginContainer = () => (
      <div>
        <NavBarNoAuth></NavBarNoAuth>
        <div className="container-fluid">
        <Route exact path="/" render={() => <Redirect to="/signIn" />} />
        <Route path="/signin" render={() => <SignIn signIn={this.signIn}/>} />
        </div>
        <Footer></Footer>
      </div>
    );

    const CreateAccountContainer = () => (
      <div>
        <NavBarNoAuth></NavBarNoAuth>
        <div className="container-fluid">
        <Route exact path="/" render={() => <Redirect to="/createAccount" />} />
        <Route exact path="/createAccount" render={() => <CreateAccount createAccount={this.createAccount}/>} />
        </div>
        <Footer></Footer>
      </div>
    );

    const DefaultContainer = () => (
      <div>
          <NavBar userId={this.state.userId} signOut={this.signOut}></NavBar>
          <Switch>
          <div className="container-fluid">
          <Route exact path="/apitest" component={apitest}></Route> 
          <Route exact path="/" render={()=><Home token={this.state.token} userId={this.state.userId}/>}></Route> 
          {/* <Route exact path="/signin" render={()=><SignIn signin={this.signIn} signedin={this.state.signedIn}/>}></Route> */}
          <Route exact path="/feeds" render={()=><Feeds userId={this.state.userId}/>}></Route>
          <Route exact path="/discover" render={()=><Discover userId={this.state.userId}/>}></Route>
          <Route exact path="/feeds/:id" render={props =><SingleFeed {...props} userId={this.state.userId}/>}></Route>
          <Route exact path="/profile/:id" render={props =><Profile {...props} userId={this.state.userId}/>}></Route>
          <Route exact path="/myprofile" render={()=><MyProfile id={this.state.userId} />}></Route>
          <Route exact path="/createpost" render={()=><CreatePost userId={this.state.userId}/>}></Route>
          </div>
          </Switch>
          <Footer></Footer>
        </div>
    );
      return (
        <div className="App">
        <Switch>
          <Route exact path="/(signIn)" component={LoginContainer}/>
          <Route exact path="/(createAccount)" component={CreateAccountContainer}/>
          <Route render={() => this.state.signedIn ? <DefaultContainer/> : <Redirect to="/signin" />} />
        </Switch>
        

        </div>
      );


    // }
    // else{
    //   console.log('not signed in');
    //   return (
    //   <div>
    //     <Route exact path="/signin" render={()=><SignIn signin={this.signIn}/>}></Route>
    //     <Redirect to="/signin"></Redirect>            
    //   </div>);
    // }


    
  }
}

export default withRouter(App);
