import React from 'react'
import { Container, Box, Flex } from 'theme-ui'
// import pageContextProvider from '@helpers/pageContextProvider'
import Search from '../Search'
import { HeaderLogo } from './Header.Logo'
import { HeaderMenu } from './Header.Menu'
import { HeaderColorMode } from './Header.ColorMode'

const styles = {
  wrapper: {
    position: 'relative',
    bg: 'headerBg'
  },
  container: {
    position: 'relative',
    zIndex: 10
  },
  logoContainer: {
    flexBasis: ['full', null, '1/3']
  },
  searchContainer: {
    flexBasis: ['auto', null, '1/3'],
    minWidth: 'auto',
    order: [3, null, 'unset'],
    mx: 3
  },
  menuContainer: {
    flexBasis: ['auto', null, '1/3'],
    minWidth: 'auto',
    order: [4, null, 'unset']
  },
  colorModeContainer: {
    minWidth: 'auto',
    order: [2, null, 'unset']
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ['6rem', '7rem'], // prevent layout shift
    py: [3, 4]
  }
}

export const Header = ({ children }) => {
  // const context = useContext(pageContextProvider)

  // const { services, mobileMenu, darkMode } = context.pageContext

  // const algolia = services && services.algolia

  return (
    <Box sx={styles.wrapper}>
      <Container variant='compact' sx={styles.container}>
        <Flex sx={styles.header}>
          <Box sx={styles.logoContainer}>
            <HeaderLogo />
          </Box>
          <Box sx={styles.searchContainer}><Search /></Box>
          <Box sx={styles.menuContainer}>
            <HeaderMenu />
            {/* mobileMenu={mobileMenu} */}
          </Box>
          <Box sx={styles.colorModeContainer}>
            <HeaderColorMode />
          </Box>
        </Flex>
      </Container>
      {children}
    </Box>
  )
}
