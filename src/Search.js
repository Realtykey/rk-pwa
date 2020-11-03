import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

import { SortBy } from 'react-instantsearch-dom';


const searchClient = algoliasearch('IW55L7EK8V', 'e305d8ad0b21a89b620a1e11ab90dbad');

export default function Search() {
    return (
        <InstantSearch searchClient={searchClient} indexName="dev_PROPERTIES">

            <SearchBox />
            <Hits />

        </InstantSearch>
    );
}
