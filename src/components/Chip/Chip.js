import React from 'react'
import { getContrastColor } from '../../utils/colors'
import * as styles from './Chip.module.css'

export function Chip ({ title, bgColor, fontSize }) {
  return (
    <span className={styles.chip} style={{ backgroundColor: bgColor, color: getContrastColor(bgColor), fontSize: fontSize || '1rem' }}>{title}</span>
  )
}
