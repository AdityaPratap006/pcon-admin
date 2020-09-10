import React from 'react';
import Modal from '../Modal';
import CustomButton from '../CustomButton';

const ErrorModal = props => {
    return (
        <Modal
            onCancel={props.onClear}
            header={props.success ? "Successful!" : "An Error Occurred!"}
            show={!!props.error}
            footerContent={
                <CustomButton onClick={props.onClear}>OK</CustomButton>
            }
        >
            <p style={{
                color: props.success ? '#1aa260' : 'red'
            }}>{props.error}</p>
        </Modal>
    );
}

export default ErrorModal;