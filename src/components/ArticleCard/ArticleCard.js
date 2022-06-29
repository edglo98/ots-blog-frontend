import React from 'react'
import { Image, Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import * as styles from './ArticleCard.module.css'
import { calculateReadTime, formatDate } from '../../utils/format'
import { Chip } from '../Chip/Chip'

export function ArticleCard ({ post, type = 'horizontal', showCategory = true }) {
  const typeStyle = {
    horizontal: styles.mainContainer,
    vertical: `${styles.mainContainer} ${styles.containerVertical}`,
    image: `${styles.mainContainer} ${styles.containerImage}`
  }

  return (
    <Link
      as={GatsbyLink}
      to={`/${post.slug}`}
      className={styles.contentContainer}
      sx={{
        color: 'inherit',
        '&.active': {
          color: 'text'
        },
        '&:visited': {
          color: 'inherit'
        },
        '&:hover': {
          color: 'text'
        }
      }}
    >
      <article className={typeStyle[type]} key={post.id}>
        <figure>
          <Image src={post.image} />
        </figure>
        <div>
          <header>
            {showCategory && <Chip bgColor={post.category.color} title={post.category.name} fontSize='.8rem' />}
          </header>
          <h2 className={styles.truncate}>{post.title}</h2>
          {type === 'vertical' && <p className={styles.truncate}>{post.seo_description}</p>}
          <span>
            {
              post.admin_users[0] && (
                <p style={{ fontWeight: 200 }}>{`${post.admin_users[0].firstname} ${post.admin_users[0].lastname}`}</p>
              )
            }
            <p style={{ fontWeight: 200 }}>{formatDate(new Date(post.publication_date))} &bull; {calculateReadTime(post)}min</p>
          </span>
        </div>
      </article>
    </Link>
  )
}
