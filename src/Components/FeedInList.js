import React from 'react';

import { withRouter } from 'react-router-dom';

class FeedInList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      feed: this.props.feed
    }
    this.navigate = this.navigate.bind(this);
    this.getFollowingButton = this.getFollowingButton.bind(this);
    this.followFeed = this.followFeed.bind(this);
    this.unfollowFeed = this.unfollowFeed.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.feed !== this.props.feed) {
      //Perform some operation
      this.setState({ feed: nextProps.feed });
    }
  }

  followFeed() {
    debugger;
    fetch(`http://facesdev.herokuapp.com/api/follow`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fkId: this.state.feed.id, fkTypeId: this.state.feed.fktypeid, userId: this.state.userId })
    })
      .then((response) => { return response.json() })
      .then((response) => {
        debugger;
        var tempfeed = this.state.feed;
        tempfeed.isfollowing = 1;
        this.setState({ feed: tempfeed });
      });
  }

  unfollowFeed() {
    debugger;
    fetch(`http://facesdev.herokuapp.com/api/unfollow`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fkId: this.state.feed.id, fkTypeId: this.state.feed.fktypeid, userId: this.state.userId })
    })
      .then((response) => { return response.json() })
      .then((response) => {
        debugger;
        var tempfeed = this.state.feed;
        tempfeed.isfollowing = 0;
        this.setState({ feed: tempfeed });
      });
  }

  navigate() {
    //history.push("/Feeds/" + id)
    if (this.state.feed.fktypeid == 1) {
      this.props.history.push("/Profile/" + this.state.feed.id);
    }
    else if (this.state.feed.fktypeid == 2) {
      this.props.history.push("/Feeds/" + this.state.feed.id);
    }
    //this.props.history.push("Feeds/Indians");
  }

  getFollowingButton() {
    debugger;
    if (this.state.feed.isfollowing > 0) {
      return <button className="btn btn-danger" onClick={this.unfollowFeed}>Unfollow</button>
    }
    else {
      return <button className="btn btn-primary" onClick={this.followFeed}>Follow</button>
    }
  }

  render() {
    return (
      //   <div className="FeedInList">

      <div className="card" style={{ cursor: "pointer" }} >
        <div className="row">
          <div className="col-3" style={{paddingRight: '0'}}>
              <img className="card-img" style={{ border: '1px solid #000', padding: '0', width: '100%' }} src={this.state.feed.profilepicturesrc} alt="Card image cap" onClick={() => this.navigate()} />
            </div>
            <div className="col-9" style={{paddingLeft: '0'}}>
              <div className="card-body" style={{padding: '10px'}}>
                <h5 className="card-title">{this.state.feed.title} <div style={{float: 'right'}}>{this.getFollowingButton()}</div> </h5> 
                {/* <hr />
                <p className="card-text">{this.state.feed.description}</p>*/}
                
              </div>
            </div>
        </div>
      </div>
      //   </div>
    );
  }
}

export default withRouter(FeedInList);
