//React library imports:
import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route, Link, withRouter } from 'react-router-dom';

//Styling imports:
import '../index.css';

/*
Name: NewsSidebar
Author: @bpolito
Description:
Params: list of objects with values: path, name, desc
*/
class NewsSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            trending: []
        };
        //this.props = this.props.bind(this);
    }

    componentDidMount() {
        return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=07b0b37fe4864692b34ff4ce6baedd0e')
            .then((result) =>{ return result.json(); })
            .then((result) =>{
                console.log(result.articles);
                this.setState({trending: result.articles});
            });
    }

    mapNews() {

            return this.state.trending.map(function (item, i) {
                console.log('test');
                return(
                    <Link to={item.url} target="_blank">
                    
                <div className="card" key={i} style={{marginBottom: '10px', paddingBottom: '5px'}}>

                    <div className="row">
                        <div className="col-md-4">
                            <img className="card-img" src={item.urlToImage} alt="Image could not be loaded :(" style={{border: '1px solid #000', margin: '5px'}}/>
                        </div>
                        <div className="col-md-8">
                            
                                <div className="card-block" >
                                    <h4 className="card-title" style={{fontSize: "14pt"}}>{item.title}</h4>
                                    {/*<hr/>
                                     <p className="card-text">{item.description}</p>
                                    <a href={item.url} className="btn btn-primary">Read More</a> */}
                                </div>
                            
                        </div>

                    </div>
                </div>
                </Link>)
            });

    }

    render() {
        //onClick={this.props.history.push(item.path)}
        return (
            <div className="NewsSidebar">
                <div className="card" style={{ width: '100%' }}>
                    <div className="card-body">
                        <h5 className="card-title">Trending</h5>
                        {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a> */}
                        {this.mapNews()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(NewsSidebar);
