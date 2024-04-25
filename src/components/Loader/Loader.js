import Spinner from 'react-bootstrap/Spinner';

import "./loader.css";

const Loader = () => {

    return (
        <div className='full-screen-loader'>
            <Spinner animation="border" size="xl">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader;