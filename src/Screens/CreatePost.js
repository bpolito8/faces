import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import UserName from '../Components/UserName';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
//var Typeahead = require('react-bootstrap-typeahead').Typeahead; // CommonJS

class CreatePost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      imagesrc: "",
      url: "",
      title: "",
      description: "",
      feedOptions: [],
      typeOptions: [
        {
          Id: 1,
          Label: "Image (address)"
        },
        {
          Id: 2,
          Label: "Image (file)"
        },
        {
          Id: 3,
          Label: "Text"
        }
      ],
      typeid: null,
      feedid: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getContentField = this.getContentField.bind(this);
    this.getFields = this.getFields.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFileInput(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(FileReader){
      var fileReader = new FileReader();
      fileReader.onload = function(){
        this.setState({
          [name]: fileReader.result
        });
      }.bind(this);
      fileReader.readAsDataURL(target.files[0])
    }
  }

  componentWillMount(){
    fetch(`http://facesdev.herokuapp.com/api/getFeedsForDropdown`, {mode: 'cors'})
          .then((result) => {return result.json()})
          .then((result) => this.setState({feedOptions: result.rows}));
  }

  handleSubmit(){
    debugger;
    var data = this.state;
    var temp = fetch(`http://facesdev.herokuapp.com/api/createpost`, {
      headers:{
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {return response.json()})
    .then((response) => {
      console.log(response);
    });
  }

  getContentField()
  {
    debugger;
    if(this.state.typeid){
      if(this.state.typeid == 1){
        return <input style={{marginTop: '5px'}} onChange={this.handleInputChange} name="imagesrc" className="form-control" placeholder="Image address"/>
      }
      else if (this.state.typeid == 2){
        return <input style={{marginTop: '5px'}} onChange={this.handleFileInput} name="imagesrc" type="file" className="form-control" placeholder="Image file"/>
      }
      else if (this.state.typeid == 3){
        return;
      }
    }
    else return;
  }
  // getImg(){
  //   console.log(this.state.src);
  //   // if(this.state.src != ""){
  //   //   return
  //   //   (<img className="card-img" src={this.state.src}/>);
  //   // }
  //   // else{
  //     return
  //     (<input type="file" className="btn-default"/>);
        
  //   //}
  // }



  getFields(){
    debugger;
    if(this.state.typeid){
      return (<div><input style={{marginTop: '5px'}} onChange={this.handleInputChange} name="title" className="form-control" placeholder="Title"/>
            <textarea style={{marginTop: '5px'}} onChange={this.handleInputChange} name="description" className="form-control" placeholder="Description"/>
            <input style={{marginTop: '5px', marginBottom: '5px'}} onChange={this.handleInputChange} name="url" className="form-control" placeholder="URL"/>
            <Typeahead
                    labelKey='title'
                        onChange={(selected) => {
                          debugger;
                          this.setState({feedid: selected[0].id})
                        }}
                        options={this.state.feedOptions}
                      />
    </div>);
    }
  }

  render() {
    return (
      <div className="CreatePost">
        <form onSubmit={this.handleSubmit}>
        <h3>Create Post</h3>
        <div className="row">
        <div className="col-2"></div>
          <div className="col-8">
          
          <Typeahead
                    labelKey='Label'
                        onChange={(selected) => {
                          debugger;
                          if(selected[0]){
                            this.setState({typeid: selected[0].Id})
                          }
                        }}
                        options={this.state.typeOptions}
                      />
          {this.getContentField()}
          {this.getFields()}
            
            <input className="btn btn-primary float-left" onClick={() => this.props.createAccount(this.state)} type="submit"/>
          </div>
                    
                    <hr style={{ marginTop: '10px', marginBottom: '10px' }} />
                  </div>
        <input type="submit" value="Submit" className="btn btn-primary"/>

        </form>
      </div>
    );
  }
}

export default CreatePost;
