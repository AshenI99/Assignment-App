import Spinner from 'react-bootstrap/Spinner';

import "./loader.css";

const Loader = () => {

    return (
        <div className='full-screen-loader page-center-content'>
            <Spinner animation="border" size="xl" variant="light">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader;