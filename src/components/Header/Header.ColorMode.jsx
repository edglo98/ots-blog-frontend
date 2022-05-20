import React from 'react'
import { Box, IconButton, useColorMode } from 'theme-ui'
import Switch from 'rc-switch'
import 'rc-switch/assets/index.css'
import { FaMoon, FaSun } from 'react-icons/fa'

const styles = {
  desktop: {
    display: ['none', null, 'block']
  },
  // Mobile
  mobileTrigger: {
    display: ['block', null, 'none']
  }
}

export const HeaderColorMode = () => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  const handleChange = () =>
    setColorMode(colorMode === 'default' ? 'dark' : 'default')

  const label = 'Toggle dark mode'

  return (
    <Box>
      <IconButton
        aria-label={label}
        onClick={handleChange}
        sx={styles.mobileTrigger}
      >
        {isDark ? <FaMoon /> : <FaSun />}
      </IconButton>
      <Box sx={styles.desktop}>
        <Switch
          aria-label={label}
          onChange={handleChange}
          onClick={handleChange}
          checked={isDark}
          style={styles.switch}
          checkedChildren={<FaMoon />}
          unCheckedChildren={<FaSun />}
        />
      </Box>
    </Box>
  )
}
