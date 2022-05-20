import { useStaticQuery, graphql } from 'gatsby'

const useBlogCategories = () => {
  const res = useStaticQuery(categoriesQuery)
  return res.allStrapiCategory.edges.map(edge => edge.node)
}

const categoriesQuery = graphql`
  query {
    allStrapiCategory {
      edges {
        node {
          id
          color
          title
          code
        }
      }
    }
  }
`
export default useBlogCategories
