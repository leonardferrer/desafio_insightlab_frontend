import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%', // Definir a largura máxima do modal
        maxHeight: '90%', // Definir a altura máxima do modal
        overflow: 'auto', // Adicionar scroll caso o conteúdo seja muito grande
    }
};

const CustomModal = ({ isOpen, message, closeModal }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
        >
            <div style={{ textAlign: 'center' }}>
                <h2>{message}</h2>
                <button
                    onClick={closeModal}
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginTop: '20px',
                    }}
                >
                    Fechar
                </button>
            </div>
        </Modal>
    );
};

export default CustomModal;

/*
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%',
        maxHeight: '90%',
        overflow: 'auto',
    }
};

const CustomModal = ({ isOpen, message, closeModal }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
        >
            <div style={{ textAlign: 'center' }}>
                <h2>{message}</h2>
                <button onClick={closeModal}>Fechar</button>
            </div>
        </Modal>
    );
};

export default CustomModal;

*/
