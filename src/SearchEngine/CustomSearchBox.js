import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomClearRefinements from './CustomClearRefinements';


const SearchBox = ({ rangeAtributes, refine }) => {
    const ref = React.createRef();
    const submit = e => {
        e.preventDefault();
        const { input } = e.target.elements;
        refine(input.value);
    }

    return (
        <>
            <form onSubmit={submit}  noValidate action="" role="search">
                <Grid container justifyContent="center">
                    <Grid xs={2} md={2} sm={2} lg={2} align="right" item>
                        <CustomClearRefinements
                            rangeAtributes={rangeAtributes}
                            translations={{ reset: 'Limpiar filtros' }}
                            clearsQuery={true}
                        />
                    </Grid>
                    
                    <Grid xs={8} md={4} sm={4} lg={4} item>
                        <input
                            ref={ref}
                            name="input"
                            placeholder="país, cuidad o descripción"
                            className="ais-SearchBox-input"
                            type="search"
                        />
                    </Grid>
                    
                    <Grid xs={2} md={2} sm={2} lg={2} align="left" item>
                        <Button classes={{root:'custom-search-button'}} variant="outlined" className="searchbox-submit-input" type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;