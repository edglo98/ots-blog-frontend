import React from 'react'
import { Link as GLink } from 'gatsby'
import { Link, useThemeUI, get } from 'theme-ui'
import AvatarSimple from '../AvatarSimple'
import rv from '../../utils/buildResponsiveVariant'

const CardFooterAuthorAvatar = ({ variant, omitAuthor, author }) => {
  const context = useThemeUI()

  if (omitAuthor) return null

  const responsiveVariant = rv(variant, 'authorPhoto')

  const visibility = responsiveVariant.reduce(
    (mobileVisibility, variant) =>
      !(mobileVisibility === false &&
      get(context.theme, variant, {}).display === 'none'),
    false
  )

  return visibility
    ? (
        author && author.thumbnail
          ? (
            <Link
              as={GLink}
              to={author.slug}
              aria-label={author.name}
              sx={{ variant: responsiveVariant }}
            >
              <AvatarSimple
                avatar={author.thumbnail}
                alt={author.name}
                size='small'
              />
            </Link>
            )
          : null
      )
    : null
}
export default CardFooterAuthorAvatar
