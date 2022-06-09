import { useStaticQuery, graphql } from 'gatsby'

const useBlogCategories = () => {
  const res = useStaticQuery(categoriesQuery)
  return res.allStrapiCategory.nodes
}

const categoriesQuery = graphql`
  query {
    allStrapiCategory (
      limit: 6
    ) {
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
