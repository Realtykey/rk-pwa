import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
    const ref = React.createRef();
    const submit = e => {
        e.preventDefault();
        const { input } = e.target.elements;
        refine(input.value);
    }

    return (
        <form onSubmit={submit} className="searchbox-wrapper" noValidate action="" role="search">
            <div className="ais-SearchBox">
                <div className="ais-SearchBox-form" >
                    <input
                        ref={ref}
                        name="input"
                        placeholder="país, cuidad o descripción"
                        className="ais-SearchBox-input"
                        type="search"
                    />
                </div>
            </div>
            <Button variant="outlined" className="searchbox-submit-input" type="submit">
                <FontAwesomeIcon icon={faSearch} />
            </Button>
        </form>
    );
}

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;