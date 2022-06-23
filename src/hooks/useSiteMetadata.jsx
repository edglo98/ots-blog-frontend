import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const res = useStaticQuery(siteMetadataQuery)
  return res.site.siteMetadata
}

const siteMetadataQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
        footerMenu {
          title
          items {
            name
            slug
          }
        }
        social {
          name
          url
        }
      }
    }
  }
`
export default useSiteMetadata
