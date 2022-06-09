const { paginate } = require('gatsby-awesome-pagination')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const categories = await graphql(`
    query {
      allStrapiCategory {
        nodes {
          name
          color
          code
          id
        }
      }
    }
  `)

  await Promise.all(
    categories.data.allStrapiCategory.nodes.map(async cat => {
      const categoryPostsRes = await graphql(`
        query {
          categoryPosts: allStrapiPost(
            sort: {fields: publication_date, order: DESC},
            filter: {
              category: {
                code: { eq: "${cat.code}"}
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
      const categoryPosts = categoryPostsRes.data.categoryPosts.nodes.map(post => {
        post.content = JSON.parse(post.content.data.content)
        return post
      })

      paginate({
        createPage: (props) => createPage({
          ...props,
          context: {
            code: cat.code,
            category: cat.name,
            ...props.context
          }
        }), // The Gatsby `createPage` function
        items: categoryPosts, // An array of objects
        itemsPerPage: 6, // How many items you want per page
        pathPrefix: `/category/${cat.code}`, // Creates pages like `/blog`, `/blog/2`, etc
        component: require.resolve('./src/templates/category/category.js') // Just like `createPage()`
      })
    })
  )

  const posts = await graphql(`
    query {
      allStrapiPost(
        sort: {fields: publication_date, order: DESC},
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

  await Promise.all(
    posts.data.allStrapiPost.nodes.map(async (post, i) => {
      post.content = JSON.parse(post.content.data.content)
      const nextPost = posts.data.allStrapiPost.nodes[i + 1] || posts.data.allStrapiPost.nodes[posts.data.allStrapiPost.nodes.length - 1]
      const prevPost = posts.data.allStrapiPost.nodes[i - 1] || posts.data.allStrapiPost.nodes[0]

      const releatedPostRes = await graphql(`
      query {
        releatedPosts: allStrapiPost(
          limit: 6,
          sort: {fields: updatedAt, order: DESC},
          filter: {
            tags: {
              elemMatch:{
                code: {eq: "${post.category.code}"}
              }
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

      const releatedPosts = releatedPostRes.data.releatedPosts.nodes.map(post => {
        post.content = JSON.parse(post.content.data.content)
        return post
      })

      createPage({
        path: '/' + post.slug,
        component: require.resolve('./src/templates/posts/posts.js'),
        context: {
          post,
          nextPost,
          prevPost,
          releatedPosts
        }
      })
    })
  )
}
