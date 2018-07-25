import React from 'react';

import { Link, withRouter } from 'react-router-dom';


class CreateAccount extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      occupation: '',
      username: '',
      password: '',
      verifyPassword: '',
      websiteUrl: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.navigateHome = this.navigateHome.bind(this);
  }

  navigateHome(){
    this.props.CreateAccount();
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
      <div className="CreateAccount" style={{textAlign: 'center'}}>
        <h3>Create Account</h3>
        <div className="row">
        <div className="col-2"></div>
          <div className="col-8">
            <input style={{marginTop: '5px'}} onChange={this.handleInputChange} name="firstName" className="form-control" placeholder="First Name"/>
            <input style={{marginTop: '5px'}} onChange={this.handleInputChange} name="lastName" className="form-control" placeholder="Last Name"/>
            <input style={{marginTop: '5px'}} onChange={this.handleInputChange} name="occupation" className="form-control" placeholder="Occupation"/>
            <input style={{marginTop: '5px'}} onChange={this.handleInputChange} name="websiteUrl" className="form-control" placeholder="Website Url (optional)"/>
            <input style={{marginTop: '5px'}} onChange={this.handleInputChange} name="username" className="form-control" placeholder="Username"/>
            <input style={{marginTop: '5px'}} onChange={this.handleInputChange} name="password" className="form-control" placeholder="Password" type="password"/>
            <input style={{marginTop: '5px'}} onChange={this.handleInputChange} name="verifyPassword" className="form-control" placeholder="Confirm Password" type="password"/>
            <input className="btn btn-primary float-left" onClick={() => this.props.createAccount(this.state)} type="submit"/>
          </div>
        </div>
        
      </div>
    );
  }
}

export default withRouter(CreateAccount);
