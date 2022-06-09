import React from 'react'
import * as styles from './ContentResolver.module.css'

export function ContentResolver ({ html }) {
  return (
    <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
