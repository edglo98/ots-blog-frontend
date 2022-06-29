
import React, { useState } from 'react'
import { Box, IconButton, Link } from 'theme-ui'
import { Button } from '../Button/Button'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useAuthContext } from '../../hooks/useAuth'
import * as styles from './DrawerMenu.module.css'

export function DrawerMenu () {
  const { user, actions } = useAuthContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleOpenLogin = () => {
    actions.openLoginModal()
    setIsDrawerOpen(false)
  }

  return (
    <>
      <IconButton
        onClick={handleToggle}
        sx={{
          transition: 'left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)',
          position: 'relative',
          zIndex: 99999
        }}
        aria-label='Menu'
      >
        {isDrawerOpen ? <FaTimes /> : <FaBars />}
      </IconButton>
      <Box
        sx={{ bg: 'contentBg' }} className={`${styles.panel} ${isDrawerOpen ? styles.openPanel : null}`}
      >
        <Box sx={{ bg: 'contentBg' }} className={styles.panelContent}>
          {
            user
              ? (
                <Link sx={{ display: 'block' }} href='/me'>
                  <Button styleType='text' title={<h2>Perfil</h2>} />
                </Link>
                )
              : (
                <Link sx={{ display: 'block' }}>
                  <Button styleType='text' title={<h2>Iniciar sesion</h2>} onClick={handleOpenLogin} />
                </Link>
                )
          }
          <Link sx={{ display: 'block' }} href='/contact'>
            <Button styleType='text' title={<h2>Contacto</h2>} />
          </Link>
          <Link sx={{ display: 'block' }} href='/about'>
            <Button styleType='text' title={<h2>Nosotros</h2>} />
          </Link>
          {
            user && (
              <Link sx={{ display: 'block' }}>
                <Button styleType='text' title={<h2>Cerrar sesión</h2>} onClick={() => actions.logout()} />
              </Link>
            )
          }
        </Box>
      </Box>
      <Box
        className={`${styles.overlay} ${isDrawerOpen ? styles.overlayOpen : null}`}
        onClick={handleToggle}
      />
    </>
  )
}
