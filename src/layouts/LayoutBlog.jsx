import React from 'react'
import { Flex, Box } from 'theme-ui'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'

export const LayoutBlog = ({ children, pageContext, location }) => (
  // <pageContextProvider.Provider value={{ pageContext, location }}>
  <Flex variant='layout.layout'>
    <Header />
    <Box variant='layout.body'>{children}</Box>
    <Footer />
  </Flex>
  //  </pageContextProvider.Provider>
)
