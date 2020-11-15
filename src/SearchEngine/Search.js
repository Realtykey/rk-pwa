import React from 'react';
import algoliasearch from 'algoliasearch/lite';

import './search.css';
import InfiniteHits from './InfiniteHits';
import { v4 as uuidv4 } from 'uuid';

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

export default function Search({indexName,hitComponent,refinementAttributes}) {
    return (
        <InstantSearch searchClient={searchClient} indexName={indexName}>
            <Configure hitsPerPage={2}/>
            <div style={{display:'flex',justifyContent:'center'}}>
            <SearchBox 
                showLoadingIndicator={true}
                showReset={false}
                showSubmit={true}
                autofocus={true}
                searchAsYouType={false}
                translations={{
                    submitTitle: 'Buscar',
                    resetTitle: 'Quitar filtros',
                    placeholder: 'país, cuidad o descripción',
                }}
                templates={{
                    reset: 'reset',
                }}
            />
            <ClearRefinements
            translations={{reset:'Limpiar filtros'}}
            clearsQuery={true}
            />
            </div>
            <div className="refinements">
                {refinementAttributes.map(
                    attribute => <RefinementList key={uuidv4()}  attribute={attribute} />
                )}
            </div>

            <InfiniteHits hitComponent={hitComponent} minHitsPerPage={16} />

        </InstantSearch>
    );
}
