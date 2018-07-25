import React from 'react';
import {withRouter} from 'react-router-dom';

class UserName extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userId: props.userId,
        }
        this.navigateToProfile = this.navigateToProfile.bind(this);
    }

   componentWillMount(){
        fetch(`http://localhost:5000/api/getUserIcon?id=${this.state.userId}`, {mode: 'cors'})
            .then((result) =>{ 
                
                return result.json();
            })
            .then((result) => 
            {
            this.setState({user: result.rows[0]})
            });
    }

    navigateToProfile(){
        console.log('navigated to '+ this.state.userId);
        this.props.history.push("/Profile/" + this.state.userId);
    }
  render() {
      if(this.state.user){
        return (
      <div className="UserName">
        <button className="btn btn-default" style={{padding: '2px 2px 2px 5px', fontSize: 'smaller'}} onClick={this.navigateToProfile}>
                <p style={{margin: '0'}}>
                    <img src={this.state.user.profilepicturesrc} alt=":)" style={{borderRadius: '50%', width: '22px', height: '22px'}}/>
                    {" " + this.state.user.username + " "}
                </p>
            
        </button>
    </div>
    );
      }
      else {
          return <p>Username Loading...</p>;
      }
    
  }
}

export default withRouter(UserName);
