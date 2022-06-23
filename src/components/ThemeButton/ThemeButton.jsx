import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { IconButton, useColorMode } from 'theme-ui'
import * as styles from './ThemeButton.module.css'

export function ThemeButton () {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  const handleChange = () =>
    setColorMode(colorMode === 'default' ? 'dark' : 'default')

  const label = 'Toggle dark mode'

  return (
    <IconButton
      aria-label={label}
      onClick={handleChange}
      sx={styles.mobileTrigger}
    >
      {isDark ? <FaMoon /> : <FaSun />}
    </IconButton>
  )
}
