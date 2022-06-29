import React from 'react'
import { Box } from 'theme-ui'
import { Logo } from '../../images'

const styles = {
  logo: {
    pb: 1,
    mb: 2,
    mt: [4, 0]
  },
  copyright: {
    pt: 2,
    mb: [2, 4]
  }
}

export const FooterLogo = () => (
  <>
    <Box sx={styles.logo}>
      <Logo />
    </Box>
    {/* <Box sx={styles.copyright}>
      {new Date().getFullYear()}
    </Box> */}
  </>
)
