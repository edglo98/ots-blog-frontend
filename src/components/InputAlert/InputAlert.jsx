import React from 'react'
import * as styles from './InputAlert.module.css'

export function InputAlert ({ children }) {
  return (
    <span className={styles.alert}>
      {children}
    </span>
  )
}
