import React from 'react'
import { Box } from 'theme-ui'
import { FaArchive } from 'react-icons/fa'
import { IconButton } from '../IconButton/IconButton'

const styles = {
  horizontal: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: 'auto',
    scrollBehavior: 'smooth',
    m: -2,
    a: {
      flex: 1,
      minWidth: ['1/3', 'auto'],
      m: 2
    }
  }
}

const Categories = ({ variant, categories }) => {
  return (
    <Box sx={styles[variant]}>
      {categories &&
        categories.map(({ code, color, id, name, icon = null }) => {
          const buttonProps = {
            key: id,
            code,
            to: '/category/' + code,
            color,
            title: name,
            // iconPath: icon,
            variant,
            Icon: !icon && FaArchive
          }

          return <IconButton key={id} {...buttonProps} />
        })}
    </Box>
  )
}

export default Categories

Categories.defaultProps = {
  variant: 'vertical'
}
