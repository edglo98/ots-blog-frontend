import React from 'react'
import { Heading } from 'theme-ui'
import Navigation from '../Navigation'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import attachSocialIcons from '../../utils/attachSocialIcons'

const styles = {
  social: {
    mb: [3, 0]
  },
  navHeader: {
    display: ['none', 'block']
  }
}

export const FooterSocial = () => {
  const { social } = useSiteMetadata()

  return (
    <>
      <Heading variant='h4' as='p' sx={styles.navHeader}>
        Social Media
      </Heading>
      <Navigation
        items={attachSocialIcons(social)}
        variant={['horizontal', 'vertical']}
        wrapperStyle={styles.social}
      />
    </>
  )
}
