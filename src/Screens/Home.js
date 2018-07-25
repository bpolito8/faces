import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import NavBar from '../Components/NavBar';
import Feed from '../Components/Feed';
import Footer from '../Components/Footer';
import NewsSidebar from '../Components/NewsSidebar';
import PhotoGallery from '../Components/PhotoGallery';
import UserName from '../Components/UserName';
import FeedInList from '../Components/FeedInList';

import '../index.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        //console.log(this.props.match.params);
        this.state = {
            userId: this.props.userId,
            token: this.props.token
        };
        this.setGallery = this.setGallery.bind(this);
        this.setPosts = this.setPosts.bind(this);
        this.getContent = this.getContent.bind(this);
        this.mapSuggested = this.mapSuggested.bind(this);
    }

    componentWillMount() {
        fetch(`http://localhost:5000/api/getuserbyid?id=${this.state.userId}`, {
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
                this.setState({ user: result.rows[0] });
            });
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
                this.setState({ suggested: result });
            });
        fetch(`http://localhost:5000/api/getUserHomeFeed`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: this.state.userId, token: this.state.token })
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                debugger;
                console.log(response);
                this.setState({ list: response.rows });
            });
    }

    mapSuggested() {
        if(this.state.suggested){
            return this.state.suggested.map((item, i) => {
                return <FeedInList feed={item} userId={this.state.userId}></FeedInList>
    
            });
        }
        

    }

    setGallery() {
        console.log('gallery set');
        this.setState({ show: 2 });
    }

    setPosts() {
        console.log('posts set');
        this.setState({ show: 1 });
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
        if (this.state.user) {
            return (
                <div className="Home" >
                    <div className="jumbotron" style={{ marginBottom: '10px' }}>
                        <h1 className="display-4">Welcome, {this.state.user.firstname}!</h1>
                        <p className="lead">
                            This is the home page, where your main feed is.  Here you can scroll through posts from every user or feed that you follow.
                            </p>
                        {/* <hr className="my-4" /> */}
                        {/* <p>Scroll through your feed to see interesting pictures of your family and friends.</p> */}


                    </div>
                    <div className="row" style={{ marginTop: '5px' }}>
                        <div className="col-md-3" style={{paddingRight: 0}}>
                            <div className="card" style={{ width: '100%' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Suggested</h5>
                                    
                                    {this.mapSuggested()}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-mobile-12 col-12">

                            <Feed userId={this.state.userId} list={this.state.list}></Feed>
                        </div>

                    </div>
                </div>
            );
        }
        else return <div>Loading...</div>
    }
}

export default Home;
