import React from 'react'
import * as styles from './Grid.module.css'

export function Grid (props) {
  return (
    <section className={styles.grid}>
      {props.children}
    </section>
  )
}
