import React from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import FeedInList from '../Components/FeedInList';

class Discover extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      show: 1,
      suggestedFeeds: [],
      searchResultFeeds: [],
      userId: this.props.userId
    }
    this.onChange = this.onChange.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.setSuggested = this.setSuggested.bind(this);
    this.getContent = this.getContent.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount(){
    debugger;
    fetch(`http://localhost:5000/api/getsuggested?userid=${this.state.userId}`, {
            mode: 'cors',
            // headers: {
            //     'Authorization': `${this.props.token}`,
            //     'Access-Control-Expose-Headers':'*'
            // }
        })
            .then((result) => {
                return result.json();
            })
            .then((result) => {
                this.setState({ suggestedFeeds: result });
            });
}

search(){
  var temp = fetch(`http://localhost:5000/api/searchfeedsandusers`, {
      headers:{
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: this.state.name, userId: this.state.userId})
    })
    .then((response) => {return response.json()})
    .then((response) => {
      debugger;
      this.setState({searchResultFeeds: response.rows});
    });
    
}

  onChange(e){
      this.setState({name: e.target.value});
  }

  setSearch(){
    console.log('search set');
    this.setState({show: 1});
}

setSuggested(){
    console.log('suggested set');
    this.setState({show: 2});
}

mapFeeds(feedList) {
  if(feedList.length == 0){
    return <div className="col-12" style={{textAlign: 'center'}}><i className="fa fa-info-circle" style={{color: 'darkgrey'}}></i> No feeds</div>
  }
  if(feedList){
      return feedList.map((item, i) => {
          return <div className="col-12"  key={i}>
          <FeedInList userId={this.state.userId} feed={item}></FeedInList>
          </div>
  });
  }
  else{
    return <div className="col-12" style={{textAlign: 'center'}}>No feeds</div>;
  }
}

getContent() {
    debugger;
    if (this.state.show == 1) {
        return (
        <div>
          <div className="row">
            <div className="col-12">
              <input type="text" name="name" className="form-control" onChange={this.onChange}/>
              <button className="btn btn-primary" onClick={this.search}>Search</button>
            </div>
          </div>
          <div className="row">
            {this.mapFeeds(this.state.searchResultFeeds)}
          </div>
        </div>
        );
    }
    else if (this.state.show == 2) {
        return (
        <div>
          <div className="row">
            {this.mapFeeds(this.state.suggestedFeeds)}
          </div>
        </div>
        );
    }
    else {
      return <div>Nothing here!</div>
    }
}

  render() {
    return (
      <div className="SearchFeeds">       
            <div className="jumbotron">
                <h1 className="display-4">Discover</h1>
                <p className="lead">
                    Find new users and feeds to follow.
                </p>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="list-group" style={{cursor: 'pointer'}}>
                    <a className={this.state.show == 1 ? 'list-group-item active' : 'list-group-item'} onClick={this.setSearch}>Search</a>
                    <a className={this.state.show == 2 ? 'list-group-item active' : 'list-group-item'} onClick={this.setSuggested}>Suggested</a>
                </div>
              </div>
              <div className="col-9">
                {this.getContent()}
              </div>
            </div>
            
            
      </div>
    );
  }
}

export default Discover;
