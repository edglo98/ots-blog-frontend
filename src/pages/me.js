import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { Button } from '../components/Button/Button'
import { createStripeCheckoutSession, createStripePortalSession } from '../services/stripe'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'
import { Hero } from '../components/Hero/Hero'
import { Chip } from '../components/Chip/Chip'
import { LayoutBlog } from '../layouts/LayoutBlog'
import { navigate } from 'gatsby'
import { TextInput } from '../components/TextInput/TextInput'
import { useAuthContext } from '../hooks/useAuth'
import * as styles from './me.module.css'

export default function Me () {
  const { isLoading, user } = useAuthContext()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      navigate('/')
    }
    if (user) {
      setUsername(user.username)
      setEmail(user.email)
      setPassword('•••••••••••')

      if (user.subscription) {
        const query = new URLSearchParams(window.location.search)

        if (query.get('success') || user.subscription.status !== 'active') {
          setIsSuccess(true)
          window.location.href = '#sub-config'
        }
      }
    }
  }, [user])

  // console.log('Me', user)

  const handleCreateCheckout = async () => {
    const response = await createStripeCheckoutSession(user.id)
    window.open(response.urlSession)
  }

  const handleCreatePortalSession = async () => {
    const response = await createStripePortalSession(user.subscription.session_id, user.subscription.id)
    window.open(response.urlSession, '_blank')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <LayoutBlog>
      {
        user && (
          <Hero
            pb={4}
            sx={{
              maxWidth: '820px',
              margin: '0 auto'
            }}
          >
            <h1 style={{ textAlign: 'center', fontWeight: 550 }}>Hola, <span style={{ fontWeight: 'bold' }}>{user.username}</span>. Bienvenido al observatorio tecnológico y sistemas de información</h1>
            <Box
              className={styles.content}
              sx={{
                backgroundColor: 'contentBg',
                margin: '0 auto',
                marginBottom: '2rem'
              }}
            >
              <div>
                <h3 style={{ margin: 0, marginLeft: '.5rem' }}>Información de usuario</h3>
                <p style={{ margin: 0, marginLeft: '.5rem' }}>Esta es la información de tu cuenta</p>
              </div>
              <div>
                <span style={{ marginLeft: '.3rem' }}>
                  Usuario
                </span>
                <span>
                  <TextInput
                    placeholder='Nombre de usuario'
                    icon={<FaUser />}
                    disabled
                    value={username}
                  />
                </span>
              </div>
              <div>
                <span style={{ marginLeft: '.3rem' }}>
                  Correo
                </span>
                <span>
                  <TextInput
                    placeholder='Correo electrónico'
                    icon={<FaEnvelope />}
                    disabled
                    value={email}
                  />
                </span>
              </div>
              <div>
                <span style={{ marginLeft: '.3rem' }}>
                  Contraseña
                </span>
                <span>
                  <TextInput
                    placeholder='Contraseña'
                    password
                    icon={<FaLock />}
                    disabled
                    value={password}
                  />
                </span>
              </div>
            </Box>
            <Box
              className={styles.content}
              sx={{
                backgroundColor: 'contentBg',
                margin: '0 auto',
                marginBottom: '2rem'
              }}
              id='sub-config'
            >
              <div>
                <h3 style={{ margin: 0, marginLeft: '.5rem' }}>Configuración de suscripción</h3>
                <p style={{ margin: 0, marginLeft: '.5rem' }}>Esta es tu configuración de suscripción a OTS</p>
                <p>Estado de tú suscripción: <Chip  title={user?.subscription?.status || '-'} bgColor={user?.subscription?.status === 'active' ? '#58AF2F' : '#A4A4A4'}/> </p>
              </div>
              <div>
                {
              user.subscription && user.subscription.status === 'active'
                ? (
                  <>
                    <Button title='Detalles de mi suscripción' onClick={handleCreatePortalSession} />
                  </>
                  )
                : (
                  <div className={styles.subInfo}>
                    {
                    isSuccess
                      ? (
                        <div style={{ textAlign: 'center' }}>
                          <h2 style={{ margin: 0, marginLeft: '.5rem' }}>¡Para confirmar da clic en el siguiente boton!</h2>
                        </div>
                        )
                      : (
                        <>
                          <div style={{ textAlign: 'center' }}>
                            <h2 style={{ margin: 0, marginLeft: '.5rem' }}>¡Aun no estas suscrito!</h2>
                            <h3 style={{ margin: 0, marginLeft: '.5rem' }}>Suscripción mensual</h3>
                            <p style={{ margin: 0, marginLeft: '.5rem' }}>$100.00 / mes</p>
                          </div>
                          <ol>
                            <li>
                              Articulos exclusivos
                            </li>
                            <li>
                              Acceso a todos los artículos
                            </li>
                          </ol>
                        </>
                        )
                  }
                    {
                    isSuccess
                      ? (
                        <>
                          <Button title='Confirmar suscripción' onClick={handleCreatePortalSession} />
                          <Button styleType='text' title='Cancelar suscripción' onClick={handleCreatePortalSession} />
                        </>
                        )
                      : (<Button title='Suscribirse' onClick={handleCreateCheckout} />)
                  }
                  </div>
                  )

            }
              </div>
            </Box>
          </Hero>
        )
      }
    </LayoutBlog>
  )
}
