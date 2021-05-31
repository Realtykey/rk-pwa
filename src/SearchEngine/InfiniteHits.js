import React, { useEffect } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import PropTypes from 'prop-types'

function InfiniteHits (props) {
  const { hasMore, refine, hits, hitComponent } = props
  const HitComponent = hitComponent
  let sentinel = null

  const onSentinelIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasMore) {
        refine()
      }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onSentinelIntersection)

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [hasMore])

  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {hits.map((hit) => {
          return (
            <li key={hit.objectID} className="ais-InfiniteHits-item">
              <HitComponent hit={hit} />
            </li>
          )
        })}
        <li
          className="ais-InfiniteHits-sentinel"
          ref={(c) => {
            sentinel = c
          }}
        />
      </ul>
    </div>
  )
}

InfiniteHits.propTypes = {
  hitComponent: PropTypes.elementType,
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired
}

export default connectInfiniteHits(InfiniteHits)
