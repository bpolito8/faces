import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import NavBar from '../Components/NavBar';
import Feed from '../Components/Feed';
import Footer from '../Components/Footer';
import PhotoGallery from '../Components/PhotoGallery';
import UserName from '../Components/UserName';

import '../index.css';

class SingleFeed extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.match.params);
        this.state = {
            userId: this.props.userId,
            feedId: this.props.match.params.id,
            list: []
        };
        this.setGallery = this.setGallery.bind(this);
        this.setPosts = this.setPosts.bind(this);
        this.getContent = this.getContent.bind(this);
        console.log(this.state.list);
    }

    componentWillMount(){
        fetch(`http://facesdev.herokuapp.com/api/getfeedbyid?id=${this.state.feedId}`, {mode: 'cors'})
            .then((result) =>{ 
                return result.json();
            })
            .then((result) => this.setState({feed: result.rows[0]}));
        fetch(`http://facesdev.herokuapp.com/api/getpostsforfeed`,  {
            headers:{
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: this.state.userId, feedId: this.state.feedId})
            })
            .then((response) => {return response.json()})
            .then((response) => {
            this.setState({list: response.rows, show: 1});
            });
    }

    setGallery(){
        debugger;
        console.log('gallery set');
        this.setState({show: 2});
    }

    setPosts(){
        console.log('posts set');
        this.setState({show: 1});
    }

    getContent() {
        //debugger;
        if (this.state.show == 1) {
            return <Feed userId={this.state.userId} list={this.state.list}></Feed>;
        }
        else if (this.state.show == 2) {
            return <PhotoGallery list={this.state.list}></PhotoGallery>
        }
    }
    
    render() {
        if(this.state.feed){
        return (
            <div className="SingleFeed">
                    {/* <div className="jumbotron" style={{ backgroundImage: `url(${this.state.feed.profilebackgroundsrc})`, height: '20%' }}>
                        <div className="row">
                            <div className="col-4 col-sm-3 col-md-2">
                                <img src={this.state.feed.profilepicturesrc} alt=":)" style={{ borderRadius: '50%', width: '90%', border: "3px solid white" }} />
                            </div>
                            <div className="col-5">
                                <h1 style={{ color: 'white', textAlign: 'left' }}>{this.state.feed.title}</h1>
                                <hr style={{ backgroundColor: 'white', height: '1px' }} />
                                 <h3 style={{ color: 'white', textAlign: 'left' }}>{this.state.feed.occupation}</h3> 
                            </div>
                        </div>
                    </div> */}


                    <div className="jumbotron" style={{ backgroundImage: `url(${this.state.feed.profilebackgroundsrc})`, height: '90px', width: '100%', position: 'absolute', zIndex: -1 }}>
                       
                    </div>
                    
                    <div className="row">
                            <div className="col-2">
                            <img src={this.state.feed.profilepicturesrc} alt=":)" style={{ borderRadius: '50%', width: '90%', border: "3px solid white", margin: '10px'  }} />

                            </div>
                            <div className="col-5">
                                <h1 style={{ textAlign: 'left', marginTop: '100px' }}>{this.state.feed.title}</h1>
                                {/* <hr style={{ backgroundColor: 'white', height: '1px' }} />
                                <h3 style={{ color: 'white', textAlign: 'left' }}>{this.state.user.occupation}</h3> */}
                            </div>
                            <div className="col-5" style={{ textAlign: 'left', marginTop: '100px' }}><h2>{this.state.feed.followercount} {this.state.feed.followercount != 1 ? "Followers" : "Follower"}</h2></div>
                    </div>


                     <div className="row">
                        <div className="col-12 col-lg-3">
                            <div className="list-group" style={{cursor: 'pointer'}}>
                                <a className={this.state.show == 1 ? 'list-group-item active' : 'list-group-item'} onClick={this.setPosts}>Posts</a>
                                <a className={this.state.show == 2 ? 'list-group-item active' : 'list-group-item'} onClick={this.setGallery}>Gallery</a>
                                <a className={this.state.show == 3 ? 'list-group-item active' : 'list-group-item'}>Bio</a>
                            </div>

                        </div>
                        <div className="col-12 col-lg-9">
                            {this.getContent()}
                        </div>
                    </div>
            </div>
        );
    }
    else return <div>Loading...</div>
    }
}

export default SingleFeed;
