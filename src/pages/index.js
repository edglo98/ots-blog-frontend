import React, { useRef } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { LayoutBlog } from '../layouts/LayoutBlog'
import './index.module.css'
import useSiteMetadata from '../hooks/useSiteMetadata'
import useBlogCategories from '../hooks/useBlogCategories'
import { Box } from 'theme-ui'
import Categories from '../components/Categories/Categories'
import Divider from '../components/Divider/Divider'
import { Hero } from '../components/Hero/Hero'
import CardList from '../components/CardList/CardList'

export default function Home (props) {
  console.log('Props de page', props)
  const { title } = useSiteMetadata()
  const categories = useBlogCategories()
  const sliderRef = useRef()

  const postsResponse = useStaticQuery(graphql`
    query {
      allStrapiPost(
        sort: {fields: createdAt, order: DESC}, 
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
          url
          categories {
            id
            color
            title
            code
          }
          miniature {
            url
          }
          content {
            data {
              content
            }
          }
        }
      }
    }
  `)

  console.log(postsResponse)

  return (
    <LayoutBlog>
      <Hero
        pt={4}
        pb={5}
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
          <h1>
            {title}
          </h1>
          <Box sx={{ display: ['none', 'block'] }}>
            <Categories
              categories={categories}
              variant='horizontal'
            />
            <Divider />
          </Box>
          <CardList
            nodes={
              postsResponse.allStrapiPost.nodes.map(post => ({
                category: {
                  ...post.categories[0],
                  slug: post.categories[0].code,
                  name: post.categories[0].title
                },
                title: post.title,
                slug: post.url,
                link: post.url,
                excerpt: post.seo_description,
                image: process.env.STRAPI_API_URL + post.miniature.url,
                ...post
              }))
            }
            variant={['horizontal-hero']}
            limit={3}
            omitFooter
            slider
            autoPlay
            fade
            arrows={false}
            controlPosition='bottom'
            ref={sliderRef}
            loading='eager'
          />
          <Box sx={{ display: ['none', null, 'block'] }}>
            <Divider />
            <CardList
              nodes={
                postsResponse.allStrapiPost.nodes.map(post => ({
                  category: {
                    ...post.categories[0],
                    slug: post.categories[0].code,
                    name: post.categories[0].title
                  },
                  title: post.title,
                  slug: post.url,
                  link: post.url,
                  image: process.env.STRAPI_API_URL + post.miniature.url,
                  excerpt: post.seo_description,
                  ...post
                }))
              }
              variant={['horizontal-md', 'horizontal-aside']}
              limit={3}
              columns={[1, 0, 3]}
              omitCategory
              asNavFor={sliderRef}
              loading='eager'
            />
          </Box>
        </Box>
      </Hero>
    </LayoutBlog>
  )
}
