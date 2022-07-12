import React from 'react'
import './index.module.css'
import { ArticleCard } from '../components/ArticleCard/ArticleCard'
import { Box } from 'theme-ui'
import { Carousel } from '../components/Carousel/Carousel'
import { graphql, useStaticQuery } from 'gatsby'
import { Grid } from '../components/Grid/Grid'
import { Hero } from '../components/Hero/Hero'
import { LayoutBlog } from '../layouts/LayoutBlog'
import { SectionDivider } from '../components/SectionDivider/SectionDivider'
import Categories from '../components/Categories/Categories'
import Divider from '../components/Divider/Divider'
import useBlogCategories from '../hooks/useBlogCategories'
import useSiteMetadata from '../hooks/useSiteMetadata'

export default function Home (props) {
  const { title } = useSiteMetadata()
  const categories = useBlogCategories()

  const postsResponse = useStaticQuery(graphql`
    query {
      lastPostsSorts: allStrapiPost(
        sort: {fields: publication_date, order: DESC},
        limit: 3
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

      randomPosts: allStrapiPost(
        sort: {fields: updatedAt, order: DESC},
        limit: 6
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

      ecologiaPosts: allStrapiPost(
        limit: 6,
        sort: {fields: updatedAt, order: DESC},
        filter: {
          category: {
            code: { eq: "ecologia"}
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

      techPosts: allStrapiPost(
        limit: 6,
        sort: {fields: updatedAt, order: DESC},
        filter: {
          category: {
            code: { eq: "tecnologia"}
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
  `)

  const last3 = postsResponse.lastPostsSorts.nodes.map(post => ({
    ...post,
    description: post.seo_description,
    image: process.env.STRAPI_API_URL + post.miniature.url,
    content: JSON.parse(post.content.data.content)
  }))

  const randomPosts = postsResponse.randomPosts.nodes.map(post => ({
    ...post,
    description: post.seo_description,
    image: process.env.STRAPI_API_URL + post.miniature.url,
    content: JSON.parse(post.content.data.content)
  }))

  const ecologiaPosts = postsResponse.ecologiaPosts.nodes.map(post => ({
    ...post,
    description: post.seo_description,
    image: process.env.STRAPI_API_URL + post.miniature.url,
    content: JSON.parse(post.content.data.content)
  }))

  const techPosts = postsResponse.techPosts.nodes.map(post => ({
    ...post,
    description: post.seo_description,
    image: process.env.STRAPI_API_URL + post.miniature.url,
    content: JSON.parse(post.content.data.content)
  }))

  return (
    <LayoutBlog>
      <Hero
        pb={4}
        sx={{
          background: t =>
            `linear-gradient(
              0deg,
              ${t.colors.omegaLighter},
              ${t.colors.background}
            )`
        }}
      >
        <Divider space={3} />
        <Box sx={{ position: 'relative', zIndex: 3 }}>
          <h1 style={{ textAlign: 'center', fontSize: 40 }}>
            {title}
          </h1>
          <Box sx={{ display: ['none', 'block'] }}>
            <Categories
              categories={categories}
              variant='horizontal'
            />
            <Divider />
          </Box>
          <Carousel
            itemsList={last3}
          />
          <Box sx={{ display: ['none', null, 'block'] }}>
            <Divider />
            <div style={{ display: 'flex', margin: '-0.5rem', gap: 15 }}>
              {
                last3.map(post => (
                  <ArticleCard key={post.id} post={post} />
                ))
              }
            </div>
          </Box>
        </Box>
      </Hero>

      <Hero
        pt={2}
        pb={3}
      >
        <SectionDivider title='Últimos articulos' />
        <Box style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }} sx={{ flexDirection: ['column', null, 'row'] }}>
          <Box sx={{ flexDirection: ['row', null, 'column'], flexWrap: 'wrap' }} style={{ flex: '1 1', display: 'flex', gap: 15 }}>
            {randomPosts.slice(0, 2).map(post => (
              <ArticleCard type='image' key={post.id} post={post} />
            ))}
          </Box>
          <Box style={{ flex: '1 1' }} sx={{ display: ['none', null, 'block'] }}>
            {randomPosts.slice(2, 3).map(post => (
              <ArticleCard type='vertical' key={post.id} post={post} />
            ))}
          </Box>
          <Box style={{ flex: '1 1' }} sx={{ display: ['block', null, 'none'] }}>
            {randomPosts.slice(2, 3).map(post => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </Box>
          <div style={{ flex: '1 1', display: 'flex', flexDirection: 'column', gap: 15 }}>
            {randomPosts.slice(3, 6).map(post => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </Box>
      </Hero>
      <Hero
        pt={2}
        pb={3}
      >
        <SectionDivider title='Tecnología' />
        <Grid>
          {techPosts.map(post => (
            <ArticleCard type='vertical' key={post.id} post={post} />
          ))}
        </Grid>
      </Hero>
      <Hero pt={2}>
        <SectionDivider title='Ecología' />
        <Grid>
          {ecologiaPosts.map(post => (
            <ArticleCard type='vertical' key={post.id} post={post} />
          ))}
        </Grid>
      </Hero>
    </LayoutBlog>
  )
}
