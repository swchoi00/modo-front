import React from 'react';
import ReactModal from 'react-modal';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css';

const Modal = ({ isOpen, content, onRequestClose }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
        >
            <div style={{ display : 'flex', justifyContent : 'flex-end'}}>
                <button className='closeModalBtn' onClick={onRequestClose}><FontAwesomeIcon icon={faXmark} size='2x' color='#eee'></FontAwesomeIcon></button>
            </div>
            <div>{content}</div>
        </ReactModal>
    );
};

export default Modal;