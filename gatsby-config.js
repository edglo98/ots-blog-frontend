const path = require('path')
const edjsHTML = require('editorjs-html')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: ['post', 'category']
}

const siteMetadata = {
  title: 'Observatorio Tecnológico y Sistemas de Información',
  description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
  author: 'OTS',
  siteUrl: 'https://ots.mx/',
  headerMenu: [
    {
      name: 'Home',
      slug: '/'
    },
    {
      name: 'Our Team',
      slug: '/authors'
    },
    {
      name: 'Contact',
      slug: '/contact'
    }
  ],
  footerMenu: [
    {
      title: 'Quick Links',
      items: [
        {
          name: 'Advertise with us',
          slug: '/contact'
        },
        {
          name: 'About Us',
          slug: '/about'
        },
        {
          name: 'Contact Us',
          slug: '/contact'
        }
      ]
    },
    {
      title: 'Legal Stuff',
      items: [
        {
          name: 'Privacy Notice',
          slug: '/'
        },
        {
          name: 'Cookie Policy',
          slug: '/'
        },
        {
          name: 'Terms Of Use',
          slug: '/'
        }
      ]
    }
  ],
  social: [
    {
      name: 'Github',
      url: 'https://github.com/gatsbyjs'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/gatsbyjs'
    },
    {
      name: 'Instagram',
      url: 'https://github.com/gatsbyjs'
    }
  ]
}

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

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images')
      }
    },
    {
      resolve: 'gatsby-source-strapi',
      options: strapiConfig
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/ // See below to configure properly
        }
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allStrapiPost } }) => {
              return allStrapiPost.nodes.map(node => {
                const content = JSON.parse(node.content.data.content)
                const html = edjsParser.parse(content)

                return Object.assign({}, node, {
                  description: node.seo_description,
                  date: node.publication_date,
                  url: site.siteMetadata.siteUrl + node.slug,
                  guid: site.siteMetadata.siteUrl + node.slug,
                  custom_elements: [{ 'content:encoded': html }]
                })
              })
            },
            query: `
              {
                allStrapiPost {
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
            `,
            output: '/rss.xml',
            title: `${siteMetadata.title} Feed`
          }
        ]
      }
    }
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     // This will impact how browsers show your PWA/website
    //     // https://css-tricks.com/meta-theme-color-and-trickery/
    //     // theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
