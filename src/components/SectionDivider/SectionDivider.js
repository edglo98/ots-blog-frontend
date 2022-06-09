import React from 'react'
import * as styles from './SectionDivider.module.css'

export function SectionDivider ({ title, size }) {
  return (
    title
      ? (
        <h2 style={{ fontSize: size }} className={styles.title}>
          {title}
        </h2>
        )
      : <div className={styles.divider} />
  )
}
