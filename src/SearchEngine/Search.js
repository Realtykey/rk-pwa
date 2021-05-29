import React from 'react'
import PropTypes from 'prop-types'
import algoliasearch from 'algoliasearch/lite'

import Grid from '@material-ui/core/Grid'
import './search.css'
import InfiniteHits from './InfiniteHits'
import RangeInput from './CustomRangeInput'
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
  'e305d8ad0b21a89b620a1e11ab90dbad'
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
      <form
        onSubmit={(e) => e.preventDefault()}
        id="ranges-form"
        className="refinements"
      >
        <Grid container justify="center">
          {/* eslint-disable-next-line react/prop-types */}
          {rangeAtributes.map((attribute) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={uuidv4()}>
              <RangeInput
                name={attribute.name}
                label={attribute.label}
                attribute={attribute.name}
                min={1}
                precision={0}
              />
            </Grid>
          ))}
        </Grid>
      </form>
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
