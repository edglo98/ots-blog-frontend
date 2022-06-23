import React from 'react'
import * as styles from './Button.module.css'

export function Button (props) {
  const styleType = {
    text: styles.text,
    contained: styles.contained
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      style={props.style}
      className={`
        ${styles.button} 
        ${styleType[props.styleType || 'contained']} 
        ${props.buttonClassName}
        ${props.className}
      `}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  )
}
