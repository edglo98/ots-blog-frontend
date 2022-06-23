/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
const React = require('react')
const { AuthProvider } = require('./src/context/auth')

exports.wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      {element}
    </AuthProvider>
  )
}
