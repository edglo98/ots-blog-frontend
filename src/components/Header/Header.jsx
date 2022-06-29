import React from 'react'
import { Container, Box, Flex, Link } from 'theme-ui'
import Search from '../Search'
import { DrawerMenu } from '../DrawerMenu/DrawerMenu'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import { Link as GatsbyLink } from 'gatsby'
import { Logo } from '../../images'

const styles = {
  wrapper: {
    position: 'relative',
    bg: 'headerBg'
  },
  container: {
    position: 'relative',
    zIndex: 10
  },
  header: {
    alignItems: 'center',
    height: ['6rem', '7rem'], // prevent layout shift
    py: [3, 4]
  }
}

export const Header = ({ children }) => {
  return (
    <Box sx={styles.wrapper}>
      <Container variant='compact' sx={styles.container}>
        <Flex sx={styles.header}>
          <Link as={GatsbyLink} style={{ cursor: 'pointer' }} to='/'>
            <Logo />
          </Link>
          <Flex sx={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end', gap: '.5rem' }}>
            <Box sx={{ flex: ['initial', 'initial', 1], padding: ['0', '0', '0px 3rem'] }}>
              <div style={{
                maxWidth: '580px',
                width: '100%',
                margin: '0 auto'
              }}
              >
                <Search />
              </div>
            </Box>
            <ThemeButton />
            <Box>
              <DrawerMenu />
            </Box>
          </Flex>
        </Flex>
      </Container>
      {children}
    </Box>
  )
}
