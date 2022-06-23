import React from 'react'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard'
import { Box, Link } from 'theme-ui'
import { Chip } from '../../components/Chip/Chip'
import { ContentResolver } from '../../components/ContentResolver/ContentResolver'
import { formatDate, calculateReadTime, formatNumber } from '../../utils/format'
import { Hero } from '../../components/Hero/Hero'
import { LayoutBlog } from '../../layouts/LayoutBlog'
import { Link as GatsbyLink } from 'gatsby'
import { SectionDivider } from '../../components/SectionDivider/SectionDivider'
import * as styles from './posts.module.css'
import edjsHTML from 'editorjs-html'
import { FaClipboard } from 'react-icons/fa'
import { Popover } from '@headlessui/react'
import { useAuthContext } from '../../hooks/useAuth'
import { Button } from '../../components/Button/Button'

function rawParser (block) {
  return `<code> ${block.data.html} </code>`
}

function checklistParser (block) {
  return `<ul>
    ${block.data.items.map(item => `
    <li>
      <label>
      <input type="checkbox" disabled ${item.checked && 'checked'} > 
        ${item.text}
      </label>
    </li>
    `).join('')
  }  
  </ul>`
}

function imageParser (block) {
  return `<figure><img src="${process.env.STRAPI_API_URL + block.data.file.url}" alt="${block.data.caption}" /></figure>`
}

function headerParser (block) {
  const id = block.data.text.replace(/ /g, '-')
  const { level, text } = block.data
  return `<h${level} id="${id}"><a href="#${id}">${text}</a></h${level}>`
}

const edjsParser = edjsHTML({
  raw: rawParser,
  checklist: checklistParser,
  image: imageParser,
  header: headerParser
})

export default function Posts (props) {
  const { user } = useAuthContext()
  const { post: pagePost, prevPost, nextPost, releatedPosts } = props.pageContext
  const html = edjsParser.parse(pagePost.content)
  const writer = pagePost.admin_users[0]
  const headers = pagePost.content.blocks.filter(block => block.type === 'header').map(block => block.data.text)

  const releatedPostsWithImage = releatedPosts.filter(post => post.id !== pagePost.id).map(post => {
    return {
      description: post.seo_description,
      image: process.env.STRAPI_API_URL + post.miniature.url,
      ...post
    }
  })

  const handleCopyUrlInPath = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
  }

  const isPremiunUser = user && user.subscription.status === 'active'

  console.log(pagePost)
  return (
    <LayoutBlog>
      <Hero>
        <h1 className={styles.title}>{pagePost.title}</h1>
        <Chip bgColor={pagePost.category.color} title={pagePost.category.name} fontSize='.9rem' />
        <p className={styles.infoPost}>
          Publicado por <span style={{ fontWeight: 550 }}>{writer.firstname} {writer.lastname}</span>
          <span style={{ margin: '0px 5px' }}>
            &bull;
          </span>
          {formatDate(new Date(pagePost.publication_date))}
          <span style={{ margin: '0px 5px' }}>
            &bull;
          </span>
          <span style={{ fontWeight: 550 }}>{calculateReadTime(pagePost)} min de lectura</span>
        </p>
        <figure className={styles.imgBanner}>
          <img
            src={process.env.STRAPI_API_URL + pagePost.miniature.url}
            alt={pagePost.title}
          />
        </figure>

        <div className={styles.contentLayout}>
          <main>
            <SectionDivider title='Tabla de contenido' />
            <Box
              className={styles.tableContentContainer}
              sx={{
                backgroundColor: 'contentBg',
                mb: '1rem'
              }}
            >
              {
                headers.map((header, index) => (
                  <h2 className={styles.tableContent} key={header + index}>
                    <a href={`#${header.replace(/ /g, '-')}`}>
                      <span>{formatNumber(index + 1, { minimumIntegerDigits: 2 })}</span>{header}
                    </a>
                  </h2>
                ))
              }
            </Box>
            <Box
              className={styles.content}
              sx={{
                backgroundColor: 'contentBg'
              }}
            >

              {
              pagePost.premium
                ? isPremiunUser
                  ? <ContentResolver html={html.join('')} />
                  : <div>
                    <h2>¡Este contenido solo esta disponible para usuarios Premium!</h2>
                    <Link as={GatsbyLink} to='/me'><Button title='¡Quiero ser Premium!' /></Link>
                  </div>
                : <ContentResolver html={html.join('')} />
              }
              <SectionDivider />
              <div className={styles.tags}>
                <span style={{ fontWeight: 550, marginRight: 10 }}>Tags </span>
                {pagePost.tags.map(tag => (
                  <Chip bgColor={tag.color} title={tag.name} fontSize='.9rem' key={tag.id} />
                ))}
              </div>
              <div className={styles.tags}>
                <span style={{ fontWeight: 550, marginRight: 10 }}>Compartir </span>
                <Popover className={styles.popover} onClick={handleCopyUrlInPath}>
                  <Popover.Button>
                    <Chip bgColor='transparent' title={<FaClipboard color='black' size={24} />} fontSize='.9rem' />
                  </Popover.Button>

                  <Popover.Panel className={styles.popoverPanel}>
                    <p>¡Copiado!</p>
                  </Popover.Panel>
                </Popover>
              </div>
              <SectionDivider />
              <Box
                sx={{
                  bg: 'omegaLight',
                  color: 'omegaDark',
                  m: '-1rem',
                  mt: '1rem',
                  borderBottomLeftRadius: '.3rem',
                  borderBottomRightRadius: '.3rem',
                  p: '1rem'
                }}
              >
                <div className={styles.prevNext}>
                  {prevPost && (
                    <div className={styles.prev}>
                      <p>Anterior articulo</p>
                      <Link
                        sx={{
                          color: 'inherit',
                          '&.active': {
                            color: 'text'
                          },
                          '&:visited': {
                            color: 'inherit'
                          },
                          '&:hover': {
                            color: 'text'
                          }
                        }}
                        as={GatsbyLink}
                        to={`/${prevPost.slug}`}
                      >
                        <p>
                          {prevPost.title}
                        </p>
                      </Link>
                    </div>
                  )}
                  {nextPost && (
                    <div className={styles.next}>
                      <p>Siguiente articulo</p>
                      <Link
                        sx={{
                          color: 'inherit',
                          '&.active': {
                            color: 'text'
                          },
                          '&:visited': {
                            color: 'inherit'
                          },
                          '&:hover': {
                            color: 'text'
                          }
                        }}
                        as={GatsbyLink}
                        to={`/${nextPost.slug}`}
                      >
                        <p>
                          {nextPost.title}
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              </Box>
            </Box>
          </main>
          <section>
            <h3 style={{ textAlign: 'center', color: 'var(--theme-ui-colors-omegaDark,#718096)' }}>
              Articulos relacionados
            </h3>
            <Box>
              {releatedPostsWithImage.map(post => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </Box>
          </section>
        </div>
      </Hero>
    </LayoutBlog>
  )
}
