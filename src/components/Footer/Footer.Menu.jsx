import React from 'react'
import { Box } from 'theme-ui'
import Navigation from '../Navigation'
import useSiteMetadata from '../../hooks/useSiteMetadata'

const styles = {
  navHeader: {
    display: ['none', 'block']
  }
}

export const FooterMenu = () => {
  const { footerMenu } = useSiteMetadata()

  return (
    <>
      {footerMenu.map(menu => (
        <Box key={`footer-menu-${menu.title}`}>
          <Navigation
            variant={['horizontal', 'vertical']}
            headingProps={{ variant: 'h4', as: 'p', sx: styles.navHeader }}
            items={[menu]}
          />
        </Box>
      ))}
    </>
  )
}
