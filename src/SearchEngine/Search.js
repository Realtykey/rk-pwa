import React from 'react'
import PropTypes from 'prop-types'
import algoliasearch from 'algoliasearch/lite'

import './search.css'
import InfiniteHits from './InfiniteHits'
import CustomSearchBox from './CustomSearchBox'

import { v4 as uuidv4 } from 'uuid'
import {
  MenuSelect,
  InstantSearch,
  Stats,
  Configure
} from 'react-instantsearch-dom'

const searchClient = algoliasearch(
  'IW55L7EK8V',
  '99fbc9df8fd50e08eccd3d6151c35b15'
)

export default function Search ({
  indexName,
  hitComponent,
  refinementAttributes,
  rangeAtributes
}) {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Configure hitsPerPage={2} />
      <CustomSearchBox
        rangeAtributes={rangeAtributes}
        showLoadingIndicator={true}
        showReset={false}
        showSubmit={true}
        autofocus={true}
        searchAsYouType={false}
        translations={{
          submitTitle: 'Buscar',
          resetTitle: 'Quitar filtros',
          placeholder: 'país, cuidad o descripción'
        }}
        templates={{
          reset: 'reset'
        }}
      />
      <div className="refinements">
        {/* eslint-disable-next-line react/prop-types */}
        {refinementAttributes.map((attribute) => (
          <MenuSelect
            translations={{ seeAllOption: attribute.label }}
            key={uuidv4()}
            attribute={attribute.name}
          />
        ))}
      </div>
      <Stats
        translations={{
          stats (nbHits) {
            return `${nbHits} resultado${nbHits === 1 ? '' : 's'}`
          }
        }}
      />
      <InfiniteHits hitComponent={hitComponent} minHitsPerPage={16} />
    </InstantSearch>
  )
}

Search.propTypes = {
  indexName: PropTypes.string,
  hitComponent: PropTypes.elementType,
  refinementAttributes: PropTypes.array,
  rangeAtributes: PropTypes.array
}
