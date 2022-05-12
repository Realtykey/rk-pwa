import React from 'react';
import Button from '@material-ui/core/Button';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClearRefinements = ({ items, refine }) => {
  const clear = () => {
    refine(items);
  }
  
  return (
  <Button classes={{root:'custom-search-button'}} variant="contained" onClick={clear}
    disabled={!items.length}>
    <FontAwesomeIcon icon={faUndo} />
  </Button>
  )
};

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);
export default CustomClearRefinements;