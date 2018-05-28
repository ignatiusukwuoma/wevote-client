import React, { Component } from 'react';

import Modal from './Modal';

/**
 * Controls what shows up on modal
 */
class ModalController extends Component{
    constructor(props, context){
        super(props, context);
    }

    render() {
        return (
            <Modal>
                <div className="modal">
                </div>
            </Modal>
        );
    }
}

export default ModalController;
