/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
const React = require('react')
const { AuthProvider } = require('./src/context/auth')

exports.wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      {element}
    </AuthProvider>
  )
}
