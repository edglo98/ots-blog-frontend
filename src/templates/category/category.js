import React from 'react'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { Grid } from '../../components/Grid/Grid'
import { Hero } from '../../components/Hero/Hero'
import { LayoutBlog } from '../../layouts/LayoutBlog'
import { SectionDivider } from '../../components/SectionDivider/SectionDivider'
import { Link } from 'theme-ui'
import * as styles from './category.module.css'

export default function Category (props) {
  const { data, pageContext } = props
  const categoryPosts = data.allStrapiPost.nodes.map(post => ({
    ...post,
    description: post.seo_description,
    image: process.env.STRAPI_API_URL + post.miniature.url,
    content: JSON.parse(post.content.data.content)
  }))

  console.log('pageContext', pageContext)

  return (
    <LayoutBlog>
      <Hero
        pb={4}
      >
        <SectionDivider size='2.5rem' title={pageContext.category} />
        <Grid>
          {categoryPosts.map(post => (
            <ArticleCard type='vertical' key={post.id} post={post} />
          ))}
        </Grid>

        <section style={{ marginTop: '4rem' }}>
          <div className={styles.pagination}>
            {
              pageContext.previousPagePath && (
                <Link
                  sx={{
                    color: 'omegaDark',
                    '&.active': {
                      color: 'omegaDark'
                    },
                    '&:visited': {
                      color: 'omegaDark'
                    },
                    '&:hover': {
                      color: 'omegaDark'
                    }
                  }}
                  className={styles.before}
                  to={pageContext.previousPagePath}
                  as={GatsbyLink}
                >
                  <h4>
                    Anterior
                  </h4>
                </Link>
              )
            }
            <p>
              Página <span>{pageContext.humanPageNumber}</span> de <span>{pageContext.numberOfPages}</span>
            </p>
            {
              pageContext.nextPagePath && (
                <Link
                  sx={{
                    color: 'omegaDark',
                    '&.active': {
                      color: 'omegaDark'
                    },
                    '&:visited': {
                      color: 'omegaDark'
                    },
                    '&:hover': {
                      color: 'omegaDark'
                    }
                  }}
                  className={styles.after}
                  to={pageContext.nextPagePath}
                  as={GatsbyLink}
                >
                  <h4>
                    Siguiente
                  </h4>
                </Link>
              )
            }
          </div>
        </section>

      </Hero>
    </LayoutBlog>
  )
}

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!, $code: String!) {
    allStrapiPost(
      skip: $skip
      limit: $limit
      filter: {
        category: {
          code: { eq: $code}
        }
      }
    ) {
      nodes {
        id
        title
        seo_title
        seo_description
        publish
        publication_date
        premium
        updatedAt
        slug
        admin_users {
          firstname
          lastname
        }
        category {
          id
          color
          name
          code
        }
        tags {
          id
          color
          name
          code
        }
        content {
          data {
            content
          }
        }
        miniature {
          url
          size
          name
        }
      }
    }
  }
`
