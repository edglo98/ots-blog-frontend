import React from 'react'
import { Link as GLink } from 'gatsby'
import { Link, useThemeUI, get } from 'theme-ui'
import rv from '../../utils/buildResponsiveVariant'
import getImageVariant from '../../utils/getImageVariant'
import CardMediaIcon from './Card.Media.Icon'
import CardMediaImage from './Card.Media.Image'

const DEFAULT_IMAGE_VARIANT = 'vertical'

const styles = {
  link: {
    userSelect: 'none',
    textAlign: 'center',
    position: 'relative',
    display: 'block'
  }
}

const CardMedia = ({
  imageVariant,
  omitMedia,
  mediaType,
  title,
  slug,
  link,
  image: imageProp,
  ...props
}) => {
  const context = useThemeUI()

  if (omitMedia) return null

  const { variant, thumbnail, thumbnailText } = props

  const imageVar =
    imageVariant ||
    get(context.theme, rv(variant, 'imageVariant')[0]) ||
    DEFAULT_IMAGE_VARIANT

  const image = imageProp || getImageVariant(thumbnail, imageVar)

  const linkProps = link
    ? {
        as: 'a',
        href: link,
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {
        as: GLink,
        to: slug
      }

  return (
    <Link
      {...linkProps}
      css={styles.link}
      sx={{ variant: rv(variant, 'media') }}
      aria-label={title}
    >
      {mediaType === 'image' && image && (
        <CardMediaImage image={image} title={title} {...props} />
      )}
      {(mediaType === 'icon' || (!image && thumbnailText)) && (
        <CardMediaIcon {...props} />
      )}
    </Link>
  )
}

CardMedia.defaultProps = {
  mediaType: 'image'
}

export default CardMedia
