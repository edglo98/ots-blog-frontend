import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { InputAlert } from '../InputAlert/InputAlert'
import * as styles from './TextInput.module.css'

export function TextInput (props) {
  const { password, error, icon, placeholder, value, onChange, disabled, register, textarea, ...rest } = props
  const [showPass, setShowPass] = useState(false)

  const toggleShowPass = () => {
    setShowPass(!showPass)
  }

  const InputTypeRender = textarea ? 'textarea' : 'input'

  return (
    <div>
      <label className={styles.inputContainer}>
        {
          icon && (
            <span className={styles.icon}>
              {icon}
            </span>
          )
        }
        <InputTypeRender
          type={(password && !showPass) ? 'password' : 'text'}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete='off'
          {...register}
          {...rest}
        />
        {
          (password && !disabled) && (
            <button className={styles.buttonPass} type='button' onClick={toggleShowPass}>
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </button>
          )
        }
        <span className={`${styles.highlighting} ${error ? styles.error : null}`} />
      </label>
      {
        error && (
          <InputAlert>{error}</InputAlert>
        )
      }
    </div>
  )
}
