const edjsHTML = require('editorjs-html')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  // createPage({
  //   path: "/using-dsg",
  //   component: require.resolve("./src/templates/using-dsg.js"),
  //   context: {},
  //   defer: true,
  // })
  const posts = await graphql(`
    query AllPost {
      allStrapiPost(sort: {fields: createdAt, order: DESC}) {
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
    return `<img src="${process.env.STRAPI_API_URL + block.data.file.url}" alt="${block.data.caption}" />`
  }

  const edjsParser = edjsHTML({ raw: rawParser, checklist: checklistParser, image: imageParser })

  posts.data.allStrapiPost.nodes.forEach(post => {
    const content = JSON.parse(post.content.data.content)
    const html = edjsParser.parse(content)
    post.HtmlContent = html

    createPage({
      path: '/' + post.url,
      component: require.resolve('./src/templates/posts/posts.js'),
      context: {
        post
      }
    })
  })
}
