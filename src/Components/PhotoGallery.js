import React from 'react';
import Modal from 'react-modal';

import UserName from './UserName';
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

class PhotoGallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            activeItem: {},
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(item) {
        debugger;
        //console.log(item);
        this.setState({ modalIsOpen: true, activeItem: item });

    }

    closeModal() {
        this.setState({ modalIsOpen: false });
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
        //FIXME: make this load images better (if landscape, full width, if portrait full height, inherit other for both)
        var gallery = this.state.list.map((item, i) => {
            debugger;
            return <div className="col-4" key={i}>
            {/* <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={this.closeModal} >
                        <i className="fa fa-times fa-lg"></i>
                    </div>
                    <SideCardFocus userId={this.state.userId} post={item}></SideCardFocus>
                </Modal> */}
                <img src={item.imagesrc} className="card-img" onClick={() => this.openModal(item)}/>
            </div>
        });
        return <div className="PhotoGallery">
            <div className="row">
            <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        {this.mapModal()}
                    </Modal>
                {gallery}
            </div>

        </div>
    }
}

export default PhotoGallery;
