import React from 'react'
import { Text, useThemeUI, get } from 'theme-ui'
import rv from '../../utils/buildResponsiveVariant'

const styles = {
  excerpt: {
    flex: 'auto',
    mb: 3
  }
}

const CardBodyExcerpt = ({ variant, excerpt, omitExcerpt }) => {
  const context = useThemeUI()

  const responsiveVariant = rv(variant, 'excerpt')

  const visibility = responsiveVariant.reduce(
    (mobileVisibility, variant) =>
      !(mobileVisibility === false &&
      get(context.theme, variant, {}).display === 'none'),
    false
  )

  return !omitExcerpt && visibility
    ? (
      <Text
        variant='small'
        sx={{
          ...styles.excerpt,
          variant: responsiveVariant
        }}
      >
        {excerpt}
      </Text>
      )
    : null
}

export default CardBodyExcerpt
