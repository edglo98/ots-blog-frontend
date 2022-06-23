import React from 'react'
import { Flex, Box } from 'theme-ui'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { Helmet } from 'react-helmet'
import { Login } from '../components/Login/Login'

export const LayoutBlog = ({ children, pageContext, location }) => (
  // <pageContextProvider.Provider value={{ pageContext, location }}>
  <Flex variant='layout.layout'>
    <Helmet>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
      <link href='https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap' rel='stylesheet' />
    </Helmet>
    <Login />
    <Header />
    <Box variant='layout.body'>{children}</Box>
    <Footer />
  </Flex>
  //  </pageContextProvider.Provider>
)
