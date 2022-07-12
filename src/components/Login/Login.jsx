import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft, FaEnvelope, FaLock, FaUser } from 'react-icons/fa'
import { Alert, Close } from 'theme-ui'
import { useAuthContext } from '../../hooks/useAuth'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { TextInput } from '../TextInput/TextInput'
import * as styles from './Login.module.css'

export function Login () {
  const { isLoading, error, loginModal, actions } = useAuthContext()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [registerModal, setRegisterModal] = useState(false)

  const onSubmit = data => {
    actions.loginUser(data.email, data.password)
      .then(() => {
        actions.closeLoginModal()
      })
  }

  const openRegister = () => {
    actions.closeLoginModal()
    setRegisterModal(true)
  }

  const closeRegister = () => {
    setRegisterModal(false)
    actions.openLoginModal()
  }

  const closeModal = () => {
    actions.closeLoginModal()
  }

  return (
    <>
      <Register isOpen={registerModal} onBack={closeRegister} onClose={() => setRegisterModal(false)} />
      <Modal onClose={closeModal} isOpen={loginModal} title='Iniciar sesión'>
        {
          error && (
            <Alert mb={2}>
              Usuario o contraseña incorrectos
              <Close style={{ cursor: 'pointer' }} ml='auto' mr={-2} onClick={() => actions.cleanError()} />
            </Alert>
          )
        }
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextInput
            placeholder='Correo electrónico'
            icon={<FaEnvelope />}
            register={register('email', { required: true })}
            error={errors.email && 'This field is required'}
          />
          <TextInput
            placeholder='Contraseña'
            password
            icon={<FaLock />}
            register={register('password', { required: true })}
            error={errors.password && 'This field is required'}
          />
          <Button
            title='Iniciart sesión'
            style={{ fontSize: '1.2rem' }}
            disabled={isLoading}
          />
        </form>
        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={openRegister}
            title='Resgistrate aquí'
            styleType='text'
            style={{ fontSize: '.9rem' }}
            disabled={isLoading}
          />
        </div>
      </Modal>
    </>
  )
}

const Register = ({ isOpen, onClose, onBack }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm()
  const { isLoading, actions, error } = useAuthContext()

  const onSubmit = data => {
    if (data.password !== data.password2) {
      setError('password2', { type: 'manual', message: 'Las contraseñas no coinciden' })
      setError('password', { type: 'manual', message: 'Las contraseñas no coinciden' })
      return
    }
    const { password2, ...registerData } = data
    actions.registerUser(registerData)
      .then(() => {
        onClose()
      })
  }

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      title={
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title={
              <h1 style={{ margin: 0, lineHeight: 0 }}><FaArrowLeft /></h1>
            }
            onClick={onBack}
            styleType='text'
            className={styles.closeButton}
          />
          Crear cuenta
        </div>
      }
    >
      {
        error && (
          <Alert mb={2}>
            El correo o usuario ya existe
            <Close style={{ cursor: 'pointer' }} ml='auto' mr={-2} onClick={() => actions.cleanError()} />
          </Alert>
        )
      }
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextInput
          placeholder='Nombre de usuario'
          icon={<FaUser />}
          register={register('username', { required: true })}
          error={errors.username && 'This field is required'}
        />
        <TextInput
          placeholder='Correo electrónico'
          icon={<FaEnvelope />}
          register={register('email', { required: true })}
          error={errors.email && 'This field is required'}
        />
        <TextInput
          placeholder='Contraseña'
          password
          icon={<FaLock />}
          register={register('password', { required: true })}
          error={errors.password && (errors.password.message || 'This field is required')}
        />
        <TextInput
          placeholder='Contraseña'
          password
          icon={<FaLock />}
          register={register('password2', { required: true })}
          error={errors.password2 && (errors.password2.message || 'This field is required')}
        />
        <Button
          type='submit'
          title='Crear cuenta'
          disabled={isLoading}
        />
      </form>
    </Modal>
  )
}
