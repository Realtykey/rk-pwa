import React from 'react';

import { connectCurrentRefinements } from 'react-instantsearch-dom';

const ClearRefinements = ({ items, refine }) => (
  <button className="ais-ClearRefinements" onClick={() => {
    document.getElementById("ranges-form").reset();
    console.log('custom cleaner')
    refine(items);
    }}
    disabled={!items.length}>
    limpiar filtros
  </button>
);

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);
export default CustomClearRefinements;