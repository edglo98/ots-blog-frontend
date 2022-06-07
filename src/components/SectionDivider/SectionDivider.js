import React from 'react'
import * as styles from './SectionDivider.module.css'

export function SectionDivider ({ title }) {
  return (
    title
      ? (
        <h2 className={styles.title}>
          {title}
        </h2>
        )
      : <div className={styles.divider} />
  )
}
