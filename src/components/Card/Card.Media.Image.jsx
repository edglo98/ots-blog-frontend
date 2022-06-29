import React from 'react'
import { css, Image } from 'theme-ui'
import rv from '../../utils/buildResponsiveVariant'

const CardMediaImage = ({ variant, loading, image, title }) => {
  return (
    <Image
      src={image}
      loading={loading}
      alt={title}
      css={css({
        height: 'full',
        verticalAlign: 'middle', // avoid baseline gap
        img: {
          bg: 'omegaLighter'
        },
        variant: rv(variant, 'image')
      })}
    />
  )
}

CardMediaImage.defaultProps = {
  loading: 'lazy'
}

export default CardMediaImage
