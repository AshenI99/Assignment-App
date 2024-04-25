import {useState} from "react";
import {Button} from "react-bootstrap";

import "./searchbar.css";

const Searchbar = ({onSearchHandle}) => {

    const [searchValue, setSearchValue] = useState("IBM");

    // Input change handling
    const onChangeHandler = (e) => {
        setSearchValue(e.target.value)
    }

    // Search click handling
    const onSearchClick =()=> {
        onSearchHandle(searchValue);
    }

    return (
        <div className="searchbar-container">
            <input
                type="text"
                id="search"
                name="search"
                className="form-control"
                onChange={onChangeHandler}
                value={searchValue}
                placeholder="Enter stock name"
            />

            <Button className="btn-primary ms-3" onClick={onSearchClick}>Search</Button>
        </div>
    )
}

export default Searchbar;