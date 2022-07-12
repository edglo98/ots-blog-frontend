import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa'
import { Box } from 'theme-ui'
import { Button } from '../components/Button/Button'
import { Hero } from '../components/Hero/Hero'
import { Listbox } from '../components/Listbox/Listbox'
import { Modal } from '../components/Modal/Modal'
import { TextInput } from '../components/TextInput/TextInput'
import { LayoutBlog } from '../layouts/LayoutBlog'
import { sendEmail } from '../services/auth'
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
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    defaultValues: {
      perfile_type: userPerfile[0].label,
      sector_type: userSector[0].label,
      business_type: userBusinessType[0].label
    }
  })
  const [isMailSend, setIsMailSend] = useState(false)

  const onSubmit = data => {
    sendEmail(data).then(() => {
      setIsMailSend(true)
      reset()
    })
  }

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
        <h1 style={{ textAlign: 'center', fontWeight: 550 }}>Contáctanos</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder='Nombre de completo'
                  icon={<FaUser />}
                  register={register('name', {
                    required: {
                      value: true,
                      message: 'Este campo es requerido'
                    }
                  })}
                  error={errors.name?.message}
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
                  register={register('email', { 
                    required: {
                      value: true,
                      message: 'Este campo es requerido'
                    },
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Correo no valido',
                    }
                  })}
                  error={errors.email?.message}
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
                  register={register('phone', { 
                    required: {
                      value: true,
                      message: 'Este campo es requerido'
                    },
                    pattern: {
                      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                      message: 'Teléfono no valido',
                    }
                   })}
                   error={errors.phone?.message}
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
                  onChange={(value) => setValue('perfile_type', value.label)}
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
                  onChange={(value) => setValue('sector_type', value.label)}
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
                  onChange={(value) => setValue('business_type', value.label)}
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
                  register={register('need', { 
                    required: {
                      value: true,
                      message: 'Este campo es requerido'
                    }
                   })}
                   error={errors.need?.message}
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
                  register={register('request', { 
                    required: {
                      value: true,
                      message: 'Este campo es requerido'
                    }
                   })}
                  error={errors.request?.message}
                />
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button title='Enviar' style={{ minWidth: '190px' }} />
            </div>
          </Box>
        </form>
      </Hero>
    </LayoutBlog>
  )
}
