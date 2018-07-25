import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";

import createHistory from 'history/createBrowserHistory'

import { createHashHistory } from 'history'

import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import FeedInList from '../Components/FeedInList';

//export const history = createHashHistory();

class Feeds extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId
        };
        this.mapFeeds = this.mapFeeds.bind(this);
        
    }

    componentWillMount(){
        // fetch(`http://localhost:5000/api/getfeedsforuser?id=${this.state.userId}`, {mode: 'cors'})
        //     .then((result) =>{ 
        //         return result.json();
        //     })
        //     .then((result) => {
        //         this.setState({feeds: result.rows});
        //         debugger;
        //     });
    }

    

    mapFeeds() {
        debugger;
        if(this.state.feeds){
            return this.state.feeds.map((item, i) => {
                return <div className="col-12 col-md-3 col-lg-3"  key={i}>
                <FeedInList userId={this.state.userId} feed={item}></FeedInList>
                </div>
            // return <div className=" col-12 col-md-4 col-lg-3" key={i}>
            //     <div className="card" style={{cursor: "pointer"}} onClick={() => this.navigateToFeed(item.id)}>
                    
            //         <img className="card-img-top" src={item.profilepicturesrc} alt="Card image cap" />
            //         <div className="card-body">
            //             <h5 className="card-title">{item.title}</h5>
            //             <hr />
            //             <p className="card-text">{item.description}</p>
                        
            //         </div>
                    
            //     </div>
            //</div>
        });
        }
        
    }
    render() {
        var feeds = this.mapFeeds();
        return (
            <div className="Feeds">
                <div className="jumbotron">
                    <h1 className="display-4 mobile-only">Get Specific!</h1>
                     <h1 className="display-4 tablet-plus">Get Specific!</h1>
                    <p className="lead">
                        This is the feeds page, where you can see posts about more specific topics.
                    </p>
                    <hr className="my-4" />
                    <p>Choose a feed to browse its posts, or post to them!</p>
                   <Link to="/discover"><button className="btn btn-primary">Browse</button></Link>

                </div>
                <div className="row">
                    {feeds}
                </div>
                
            </div>
        );
    }
}

export default withRouter(Feeds);
