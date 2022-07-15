import React from 'react'
import groupArray from 'group-array'
import {
  Highlight,
  connectStateResults
} from 'react-instantsearch-dom'
import { Heading, Box, Spinner, Link } from 'theme-ui'
import useScrollDisabler from '../../hooks/useScrollDisabler'
import { Link as GatsbyLink } from 'gatsby'
import styles from './Search.styles'
import * as classes from './search.module.css'

const Hits = ({ searchState, searchResults }) => {
  useScrollDisabler()

  if (!searchResults || !searchState.query) {
    return 'What are you looking for?'
  }

  if (searchResults.query !== searchState.query) {
    // Waiting for search request to return results from server
    return <Spinner strokeWidth={2} duration={700} sx={styles.spinner} />
  }

  if (searchResults && searchResults.nbHits < 1) {
    return `Sin resultados para: '${searchResults.query}'`
  } else {
    const hitsByCategory = groupArray(searchResults.hits, 'category.name')
    const categories = Object.keys(hitsByCategory)

    return categories.map(name => (
      <Box
        variant='lists.cards.fixed.search'
        sx={styles.hitGroup}
        key={`search-${name}`}
      >
        <Heading variant='h4'>{name}</Heading>
        {hitsByCategory[name].map(hit => {
          const node = {
            ...hit,
            key: hit.objectID,
            title: <Highlight hit={hit} tagName='mark' attribute='title' />
          }
          return (
            <Link
              key={node.key} as={GatsbyLink} to={`/${node.slug}`}
            >
              <div className={classes.link}>{node.title}</div>
            </Link>
          )
        })}
      </Box>
    ))
  }
}

const ConnectedHits = connectStateResults(Hits)

const Results = () => (
  <Box sx={styles.resultsWrapper}>
    <Box sx={styles.hitsWrapper}>
      <ConnectedHits />
    </Box>
    {/* <Box sx={styles.poweredBy}>
      <PoweredBy />
    </Box> */}
  </Box>
)

export default Results
