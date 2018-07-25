import React from 'react';
import 'bootstrap';

import { Link, withRouter } from 'react-router-dom';


class SignIn extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.navigateHome = this.navigateHome.bind(this);
  }

  navigateHome(){
    this.props.signIn();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="SignIn" style={{textAlign: 'center'}}>
        <div className="row" style={{paddingTop: '66px'}}>
          <div className="col-3">
          </div>
          <div className="col-6">
            <div className="row">
              <label>Username</label>
              <input className="form-control" name="username" onChange={this.handleInputChange}/>
            </div>
            <div className="row">
              <label>Password:</label>
              <input className="form-control" type="password" name="password" onChange={this.handleInputChange}/>
            </div>
            <div className="row">
              <button className="btn btn-primary" onClick={() => this.props.signIn(this.state.username, this.state.password)}>Sign In</button>
              <div className="float-right"><button className="btn btn-primary" onClick={() => this.props.history.push('/createAccount')}>Create Account</button></div>
            </div>
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default withRouter(SignIn);
