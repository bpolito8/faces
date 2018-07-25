import React from 'react';
import Modal from 'react-modal';

import UserName from './UserName';
import SideCardFocus from './SideCardFocus';
import { Link } from 'react-router-dom';
import moment from 'moment';

import 'font-awesome/css/font-awesome.css'


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

class SideCard extends React.Component {

    //important to map all properties of post so that if some are undefined it does not throw errors
    constructor(props) {
        super(props);
        this.mapComments = this.mapComments.bind(this);
        this.getLikeButton = this.getLikeButton.bind(this);
        this.likePost = this.likePost.bind(this);
        this.unlikePost = this.unlikePost.bind(this);
        this.state = {
            userId: this.props.userId,
            post: props.post,
        }
        //map date
        this.state.post.date = moment.utc(this.state.post.date).local().format("YYYY-MM-DD HH:mm:ss");
        this.state.post.date = moment.utc(this.state.post.date).local().format("YYYY-MM-DD HH:mm:ss");
        this.state.post.date = moment(this.state.post.date).fromNow();
        // if (props.nomodal) {
        //     console.log("nomodal = true");
        //     this.state.nomodal = true;
        // }

        this.state.post.description = this.state.post.description || "";
        this.state.post.url = this.state.post.url || "";


    }

    likePost(){
        var temp = fetch(`http://facesdev.herokuapp.com/api/likepost`, {
      headers:{
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: this.state.userId, postId: this.state.post.id})
    })
    .then((response) => {return response.json()})
    .then((response) => {
      var tempPost = this.state.post;
      tempPost.hasliked = 1;
      tempPost.likecount = parseInt(tempPost.likecount) + 1;
      this.setState({post: tempPost});
    });
    }

    unlikePost(){
        var temp = fetch(`http://facesdev.herokuapp.com/api/unlikepost`, {
      headers:{
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: this.state.userId, postId: this.state.post.id})
    })
    .then((response) => {return response.json()})
    .then((response) => {
      debugger;
      var tempPost = this.state.post;
      tempPost.hasliked = 0;
      tempPost.likecount = parseInt(tempPost.likecount) - 1;
      this.setState({post: tempPost});
    });
    }

    getLikeButton(){
        if(this.state.post.hasliked > 0){
            return <button style={{backgroundColor: 'transparent', border: 'none', fontSize: '1.6em', width: '100%'}} onClick={this.unlikePost}>
            <div className="row">
                <div className="col-6">
                    {this.state.post.likecount}
                </div>
                <div className="col-6">
                    <i className="fa fa-heart fa-sm" style={{ color: '#ff6961' }}></i>
                </div>
            </div>            
            </button>;
        }
        else return <button  style={{backgroundColor: 'transparent', border: 'none', fontSize: '1.6em', width: '100%'}} onClick={this.likePost}>
            <div className="row">
                <div className="col-6">
                    {this.state.post.likecount}
                </div>
                <div className="col-6">
                    <i className="fa fa-heart fa-sm" style={{ color: 'lightgray' }}></i>
                </div>
            </div>            </button>
    }

    getLink(){
        if(this.state.post.url){
            return  (
            <p>
                <i className="fa fa-link"></i> <Link to={this.state.post.url} target="_blank">{this.state.post.url}</Link>
            </p>);
        }
    }


    mapComments() {
        var numVisible = 1;
        var visibleComments;
        if(this.state.post.comments.length > numVisible){
            visibleComments = this.state.post.comments.slice(this.state.post.comments.length - numVisible, this.state.post.comments.length);
        }
        else {
            visibleComments = this.state.post.comments;
        }
        return visibleComments.map(function(item, i) {
            return <div className="row" key={i} style={{paddingLeft: '15px', paddingRight: '15px'}}>

                     <UserName name={item.user} src="http://whysquare.co.nz/wp-content/uploads/2013/07/profile_square3-270x270.jpg"></UserName>
                   <p> &nbsp; {item.text}</p>
            </div>
           
        });
    }

    render() {
        return (
            <div className="SideCard">
                {/* <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={this.closeModal} >
                        <i className="fa fa-times fa-lg"></i>
                    </div>
                    <SideCardFocus nomodal={true} userId={this.state.userId} post={this.state.post}></SideCardFocus>
                </Modal> */}
                <div className="card" style={{ marginBottom: '10px', cursor: 'pointer' }}>
                    <div className="row">
                        <div className="col-md-6" style={{ padding: '0 5 0 5' }}>
                            <img className="card-img" src={this.state.post.imagesrc} onClick={this.props.openModal} alt="Image could not be loaded :(" style={{ border: '1px solid #000', padding: '0' }} />
                        </div>
                        <div className="col-md-6 col-12" style={{ paddingLeft: '0' }}>
                                <div className="card-block" style={{ marginTop: '10px' }}>
                                    <div className="row">
                                        <div className="col-9">
                                            <UserName userId={this.state.post.userid}></UserName>
                                        </div>
                                        <div className="col-3 lighter" style={{textAlign: 'left'}}>                                            
                                            {this.state.post.date}                                            
                                        </div>
                                    </div>
                                    <h4 className="card-title">{this.state.post.title}</h4>
                                    <hr style={{margin: '5px'}}/>
                                    <p style={{marginBottom: 0}}>
                                        {this.state.post.description}
                                    </p>
                                   {this.getLink()}
                                     <hr  style={{marginTop: '10px', marginBottom: '10px'}}/>
                                     {/* {this.mapComments()}  */}
                                    <div className="row">
                                        <div className="col-6">
                                            {this.getLikeButton()}
                                        </div>
                                        <div className="col-6">
                                            <button style={{backgroundColor: 'transparent', border: 'none', fontSize: '1.6em', width: '100%'}} onClick={this.props.openModal}>
                                                <div className="row">
                                                    <div className="col-6">
                                                        {this.state.post.commentcount}
                                                    </div>
                                                    <div className="col-6">
                                                        <i className="fa fa-comment fa-sm" style={{ color: 'lightgray' }}></i>
                                                    </div>
                                                </div>
                                            </button>
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

export default SideCard;