import { useStaticQuery, graphql } from 'gatsby'

const useBlogCategories = () => {
  const res = useStaticQuery(categoriesQuery)
  return res.allStrapiCategory.nodes
}

const categoriesQuery = graphql`
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
`
export default useBlogCategories
