import React from 'react';
import Modal from 'react-modal';

import UserName from './UserName';
import { Link } from 'react-router-dom';
import moment from 'moment';

import 'font-awesome/css/font-awesome.css';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-100%',
        width: '90%',
        height: 'auto',
        transform: 'translate(-50%, -50%)'
    }
};

class SideCardFocus extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.mapComments = this.mapComments.bind(this);
        this.leaveComment = this.leaveComment.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            userId: this.props.userId,
            post: props.post,
            newComment: ""
        }

        this.state.comments = [];



    }

    componentWillMount(){
        //debugger;
        fetch(`http://facesdev.herokuapp.com/api/getcommentsforpost?id=${this.state.post.id}`, {mode: 'cors'})
            .then((result) =>{ 
                return result.json();
            })
            .then((result) => this.setState({comments: result.rows}));
    }

    leaveComment() {
        //TODO: make it actually put the comment in the db
        debugger;
        this.state.comments.push({ userid: this.state.userId, text: this.state.newComment });
         var temp = fetch(`http://facesdev.herokuapp.com/api/createcomment`, {
      headers:{
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userid: this.state.userId, text: this.state.newComment, postid: this.state.post.id})
    })
    .then((response) => {return response.json()})
    .then((response) => {
      debugger;
      console.log(response);
      this.setState({ newComment: "" });
    });
        

    }

    onChange(event) {
        this.setState({ newComment: event.target.value });
    }

    mapComments() {
        return this.state.comments.map(function (item, i) {
            return <div className="row noverflow" key={i} style={{ paddingLeft: '15px' }}>

                <UserName userId={item.userid}></UserName>
                <p className="noverflow"> &nbsp; {item.text}</p>
            </div>

        });
    }
    render() {
        return (
            <div className="SideCardFocus">
                <div className="card" style={{ marginBottom: '10px', cursor: 'pointer' }}>

                    <div className="row">
                        <div className="col-md-6" style={{ paddingRight: '0' }}>
                            <img className="card-img" src={this.state.post.imagesrc} alt="Image could not be loaded :(" onClick={this.openModal} style={{ border: '1px solid #000', padding: '0' }} />
                        </div>
                        <div className="col-md-6 col-12" style={{ paddingLeft: '0' }}>
                            <div className="container-fluid" style={{ padding: '15px' }}>
                                <div className="card-block" style={{ marginTop: '10px' }}>
                                    <h4 className="card-title">{this.state.post.title}</h4>
                                    <hr style={{ marginTop: '5px', marginBottom: '5px' }} />

                                    <div className="row">
                                        <div style={{ marginLeft: '20px', color: 'black' }}>{this.state.post.likecount} <i className="fa fa-heart" style={{ color: '#ff6961' }}></i></div>
                                        <div style={{ color: 'black', marginLeft: '5px' }}>{this.state.post.commentcount}<i className="fa fa-comment" style={{ color: 'lightgray' }}></i></div>
                                    </div>
                                    <div className="row" style={{ margin: '0' }}>


                                        <UserName userId={this.state.post.userid}></UserName>


                                        <div className="lighter">
                                            &nbsp; {this.state.post.date} said:
                                    </div>
                                    </div>
                                    <p className="card-text" >
                                        {this.state.post.description}
                                    </p>
                                    <hr style={{ marginTop: '10px', marginBottom: '10px' }} />
                                     {this.mapComments()}
                                    <div className="row" style={{ paddingLeft: '15px', paddingRight: '15px' }}>


                                        {/* <UserName userId={this.state.userId}></UserName> */}
                                        <span style={{ display: 'inline', width: '100%' }}>
                                            <input className="form-control" value={this.state.newComment} onChange={this.onChange} placeholder="Leave a comment..." style={{ width: '100%' }} />
                                        <button className="btn btn-primary" onClick={this.leaveComment}>Comment</button>
                                    <button className="btn btn-default">Cancel</button> 
                                        </span>

                                    
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default SideCardFocus;