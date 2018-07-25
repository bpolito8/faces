//React library imports:
import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

//Styling imports:
import '../index.css';

//component imports
import Carousel from './Carousel';
import UserName from './UserName';
import SideCard from './SideCard';
import SideCardFocus from './SideCardFocus';

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

class Feed extends React.Component {
    constructor(props) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.mapFeed = this.mapFeed.bind(this);

        this.state = {
            userId: this.props.userId,
            title: props.title,
            list: props.list,
            modalIsOpen: false,
        };
        //debugger;
    }

    componentWillReceiveProps(nextProps){
        debugger;
        if(nextProps.list!==this.props.list){
          //Perform some operation
          this.setState({list: nextProps.list });
        }
      }

    openModal(item) {
        debugger;
        //console.log(item);
        this.setState({ modalIsOpen: true, activeItem: item });

    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    mapFeed() {
        debugger;
        if(this.state.list){
            return this.state.list.map((item, i) => 
            {
                return <SideCard openModal={() => this.openModal(item)} key={i} post={item} userId={this.state.userId} ></SideCard>
            });
        }
    }

    mapModal() {
        return (
            <div>
            <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={this.closeModal} >
            <i className="fa fa-times fa-lg"></i>
        </div>
        <SideCardFocus userId={this.state.userId} post={this.state.activeItem} nomodal={true}></SideCardFocus></div>);
    }
    render() {
        return (
            <div className="Feed">
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        {this.mapModal()}
                    </Modal>
                </div>
                {/* <Carousel></Carousel> */}
                {this.mapFeed()}
            </div>

        );
    }
}

export default Feed;
