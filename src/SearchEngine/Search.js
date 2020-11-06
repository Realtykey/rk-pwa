import React from 'react';
import algoliasearch from 'algoliasearch/lite';

import PropertyCard from '../Property/PropertyCard/PropertyCard';
import './search.css';
import InfiniteHits from './InfiniteHits';

import {
    InstantSearch,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure,
    SortBy
  } from 'react-instantsearch-dom';


const searchClient = algoliasearch('IW55L7EK8V', 'e305d8ad0b21a89b620a1e11ab90dbad');

export default function Search({indexName}) {
    return (
        <InstantSearch searchClient={searchClient} indexName={indexName}>
            <Configure hitsPerPage={2}/>
            
            <SearchBox 
                autofocus={true}
                searchAsYouType={false}
            />
            <InfiniteHits minHitsPerPage={16} />

        </InstantSearch>
    );
}
