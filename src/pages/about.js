import React from 'react'
import { Box } from 'theme-ui'
import { Hero } from '../components/Hero/Hero'
import { LayoutBlog } from '../layouts/LayoutBlog'
import * as styles from './about.module.css'

export default function about () {
  return (
    <LayoutBlog>
      <Hero
        pb={4}
        sx={{
          maxWidth: '820px',
          margin: '0 auto'
        }}
      >
        <h1 id='quienes-somos' style={{ textAlign: 'center', fontWeight: 550 }}>Quiénes somos</h1>
        <Box
          className={styles.content}
          sx={{
            backgroundColor: 'contentBg',
            margin: '0 auto',
            marginBottom: '2rem'
          }}
        >
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </Box>
        <h1 id='enfoque' style={{ textAlign: 'center', fontWeight: 550 }}>Enfoque</h1>
        <Box
          className={styles.content}
          sx={{
            backgroundColor: 'contentBg',
            margin: '0 auto',
            marginBottom: '2rem'
          }}
        >
          <p>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
        </Box>
        <h1 id='equipo' style={{ textAlign: 'center', fontWeight: 550 }}>Equipo</h1>
        <Box
          className={styles.content}
          sx={{
            backgroundColor: 'contentBg',
            margin: '0 auto',
            marginBottom: '2rem'
          }}
        >
          <p>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
          </p>
        </Box>
      </Hero>
    </LayoutBlog>
  )
}
