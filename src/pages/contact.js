import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa'
import { Box } from 'theme-ui'
import { Button } from '../components/Button/Button'
import { Hero } from '../components/Hero/Hero'
import { Listbox } from '../components/Listbox/Listbox'
import { Modal } from '../components/Modal/Modal'
import { TextInput } from '../components/TextInput/TextInput'
import { LayoutBlog } from '../layouts/LayoutBlog'
import * as styles from './contact.module.css'

const userPerfile = [
  { label: 'Empresario/Colaborador', id: 1 },
  { label: 'Investigador/Docente', id: 2 },
  { label: 'Alumno', id: 3 },
  { label: 'Funcionario Público', id: 4 },
  { label: 'Otro', id: 5 }
]
const userSector = [
  { label: 'Académico', id: 1 },
  { label: 'Comercio', id: 2 },
  { label: 'Gobierno', id: 3 },
  { label: 'Industrial', id: 4 },
  { label: 'Investigación', id: 5 },
  { label: 'Servicios', id: 6 },
  { label: 'Otros', id: 7 }
]
const userBusinessType = [
  { label: 'Aeroespacial', id: 1 },
  { label: 'Alimentos', id: 2 },
  { label: 'Automotriz', id: 3 },
  { label: 'Biotecnología', id: 4 },
  { label: 'Construcción', id: 5 },
  { label: 'Electrónico', id: 6 },
  { label: 'Energía', id: 7 },
  { label: 'Farmaceútica', id: 8 },
  { label: 'Salud', id: 9 },
  { label: 'TICs', id: 10 },
  { label: 'Otros', id: 11 }
]

export default function contact () {
  const [isMailSend, setIsMailSend] = useState(false)

  return (
    <LayoutBlog>
      <Modal isOpen={isMailSend} onClose={() => setIsMailSend(false)}>
        <h3 style={{ marginTop: 0 }}>Hemos recibido tu solicitud y en breve un especialista de pondrá en contacto con usted.</h3>
        <div style={{ textAlign: 'right' }}>
          <Button title='¡Hecho!' onClick={() => setIsMailSend(false)} />
        </div>
      </Modal>
      <Hero
        pb={4}
        sx={{
          maxWidth: '820px',
          margin: '0 auto'
        }}
      >
        <h1 style={{ textAlign: 'center', fontWeight: 550 }}>Contacta con nosotros</h1>
        <Box
          className={styles.content}
          sx={{
            backgroundColor: 'contentBg',
            margin: '0 auto',
            marginBottom: '2rem'
          }}
        >
          <div>
            <h3 style={{ margin: 0, marginLeft: '.5rem' }}>Información de contacto</h3>
            <p style={{ margin: 0, marginLeft: '.5rem' }}>En OT^S trabajamos para construir puestes de información para ti.</p>
          </div>
          <div>
            <span style={{ marginLeft: '.3rem' }}>
              Nombre
            </span>
            <span>
              <TextInput
                placeholder='Nombred de completo'
                icon={<FaUser />}
                value=''
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
                value=''
              />
            </span>
          </div>
          <div>
            <span style={{ marginLeft: '.3rem' }}>
              Teléfono
            </span>
            <span>
              <TextInput
                placeholder='Teléfono'
                icon={<FaPhone />}
                value=''
              />
            </span>
          </div>
          <div>
            <span style={{ marginLeft: '.3rem' }}>
              Perfil
            </span>
            <span>
              <Listbox
                options={userPerfile}
                onChange={(value) => console.log(value)}
              />
            </span>
          </div>
          <div>
            <span style={{ marginLeft: '.3rem' }}>
              Sector
            </span>
            <span>
              <Listbox
                options={userSector}
                onChange={(value) => console.log(value)}
              />
            </span>
          </div>
          <div>
            <span style={{ marginLeft: '.3rem' }}>
              Giro
            </span>
            <span>
              <Listbox
                options={userBusinessType}
                onChange={(value) => console.log(value)}
              />
            </span>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ margin: 0, marginLeft: '.5rem' }}>Por favor describir brevemente el interés de contactar a OT^S</h3>
          </div>
          <div>
            <span style={{ marginLeft: '.3rem' }}>
              Necesidad
            </span>
            <span>
              <TextInput
                textarea
                rows='5'
                placeholder='Necesidad'
                value=''
              />
            </span>
          </div>
          <div>
            <span style={{ marginLeft: '.3rem' }}>
              Requerimiento
            </span>
            <span>
              <TextInput
                textarea
                rows='5'
                placeholder='Requerimientos'
                value=''
              />
            </span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={() => setIsMailSend(true)} title='Enviar' style={{ minWidth: '190px' }} />
          </div>
        </Box>
      </Hero>
    </LayoutBlog>
  )
}
