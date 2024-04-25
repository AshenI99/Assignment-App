import Toast from 'react-bootstrap/Toast';
import {ToastContainer} from "react-bootstrap";


const ErrorPopup = ({message}) => {

    return (
        <ToastContainer position="top-end">
            <Toast
                className="d-inline-block m-1"
                bg="danger"
            >
                <Toast.Body className="text-white">
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ErrorPopup;