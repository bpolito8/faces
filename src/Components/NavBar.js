import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Popover } from 'reactstrap';

//Styling imports:
import '../index.css';
import facesLogo from './facesLogoDraftOriginal.png';
import 'font-awesome/css/font-awesome.css';

const activeStyles = {
    color: '#0069d9',
    //fontWeight: 'bold'
}

class NavBar extends React.Component {

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            user: {},
            userId: props.userId
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
        fetch(`http://facesdev.herokuapp.com/api/getUserIcon?id=${this.state.userId}`, {mode: 'cors'})
            .then((result) =>{ 
                
                return result.json();
            })
            .then((result) => 
            {
            this.setState({user: result.rows[0]})
            });
    }

    handleClick() {
        debugger;
        this.setState({ open: !this.state.open });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {

        return (
            <div className="NavBar">
                {/* <div className="mobile-only">
                    <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            <h3>Faces</h3>
                        </div>
                    </nav>
                </div>
                <div className="tablet-plus"> */}

                <div id="mySidenav" className="sidenav mobile-only">
                    <span href="javascript:void(0)" style={{ cursor: 'pointer' }} className="closebtn" onClick={this.closeNav}><i className="fa fa-times fa-xs" style={{ color: '#818181' }}></i></span>
                    <Link to={"/"} className="nav-link" href="#">Home<span className="sr-only">(current)</span></Link>
                    <NavLink to={"/Discover"} className="nav-link" href="#" activeStyle={activeStyles}>Discover</NavLink>
                    <NavLink to={"/Connect"} className="nav-link" href="#" activeStyle={activeStyles}>Discover</NavLink>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler mobile-only" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span style={{ fontSize: '30px' }} onClick={this.openNav}><i className="fa fa-bars"></i></span>
                    </button>

                    <Link to={"/"} className="navbar-brand mx-auto mobile-only" href="#"><img src={facesLogo} style={{ width: '40px', height: '40px' }} />Faces</Link>
                    <button className="navbar-toggler mobile-only" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span style={{ fontSize: '30px' }} className="glyphicon glyphicon-envelope"><i className="fa fa-camera"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink to={"/Discover"} className="nav-link" href="#" activeStyle={activeStyles}>Discover</NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to={"/Connect"} className="nav-link" href="#" activeStyle={activeStyles}>Connect</NavLink>
                            </li>
                            {/* <li className="nav-item active">
                                <a className="nav-link" href="#">Friends<span className="sr-only">(current)</span></a>
                            </li> */}
                        </ul>
                        <ul className="navbar-nav">

                            {/* <li className="nav-link" style={{ float: 'right', zIndex: '1' }}>
                            <Link to={"/signIn"} className="nav-link">Sign Out</Link>
                                {/* POPOVER STUFF 
                                <a
                                    href="#"
                                    className="button"
                                    ref="target"
                                    onClick={this.handleClick.bind(this)}>Sign Out<span className="sr-only">(current)</span></a>
                            </li> */}
                            <li className="nav-item" style={{ float: 'right', listStyle: 'none' }}>
                                <div className="row">
                                    {/* <Link to={"/myprofile"} className="nav-link"> */}
                                    <img id="popover1" onClick={this.handleClick} src={this.state.user.profilepicturesrc} alt=":)" style={{borderRadius: '50%', marginTop: '0', marginLeft: '5px', marginRight: '20px', width: '30px', height: '30px'}}/>
                                    {/* {this.state.user.username}<span className="sr-only">(current)</span> */}
                                    {/* </Link> */}
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                </nav>
                    <Popover
                    placement="bottom"
                    isOpen={this.state.open}
                    toggle={this.handleClick}
                    target="popover1"
                    style={{width: '110%'}}>
                    <div style={{padding: '10px'}}>
                        <div className="col-12">
                            <div className="row" style={{textAlign: 'center'}}>
                                <Link to="/myprofile">{this.state.user.username}</Link>
                            </div>
                        </div>
                            <div className="row">
                                <div className="col-6" >
                                   <Link to="/createpost"><i className="fa fa-plus"></i> New Post</Link>
                                </div>
                                <div className="col-6" style={{paddingLeft: 0}}>
                                    <a onClick={()=>this.props.signOut()}><i className="fa fa-sign-out"></i> Log out</a>
                                </div>
                            </div>
                        </div>
                    </Popover>
                
            </div>
        );
    }
}

export default NavBar;
