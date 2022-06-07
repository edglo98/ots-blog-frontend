import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Flex, NavLink, IconButton, Heading, Divider } from 'theme-ui'
import hashCode from '../../utils/hashCode'
import buildResponsiveVariant from '../../utils/buildResponsiveVariant'

const styles = {
  divider: {
    mt: 3
  }
}

const NavigationList = ({ navKey, wrapperProps, items, variant, ...props }) =>
  items
    ? (
      <Flex style={{ gap: 30, margin: '0px 12px', justifyContent: 'flex-end', flexDirection: variant === 'vertical' ? 'column' : 'row' }}>
        {items.map((menuItem, index) => (
          <NavigationItem key={`${navKey}-${index}`} {...menuItem} {...props} />
        ))}
      </Flex>
      )
    : null

const NavigationDivider = ({ index }) =>
  index !== 0 && <Divider sx={styles.divider} />

const NavigationItem = ({
  name,
  slug,
  url,
  Icon,
  color,
  variant,
  iconOnly
}) => {
  let linkProps = {
    sx: { variant: iconOnly ? 'icon' : variant }
  }

  // External link
  if (url) {
    linkProps = {
      ...linkProps,
      as: 'a',
      href: url,
      // target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
  // Internal link
  if (slug) {
    linkProps = {
      ...linkProps,
      as: Link,
      to: slug
    }
  }

  return iconOnly
    ? (
      <IconButton {...linkProps} title={name}>
        {Icon && <Icon color={color} />}
      </IconButton>
      )
    : (
      <NavLink {...linkProps}>
        {Icon && <Icon color={color} />}
        {name}
      </NavLink>
      )
}

const Navigation = ({
  items,
  variant,
  headingProps,
  wrapperStyle,
  ...props
}) => {
  if (!items || !items.length) return null

  const wrapperVariant = buildResponsiveVariant('lists.links', variant)
  const linkVariant = buildResponsiveVariant('links', variant)

  const navKey = `${hashCode(
    items.map(node => node.title || node.name).join()
  )}-nav`

  const wrapperProps = {
    sx: { variant: wrapperVariant, ...wrapperStyle },
    key: navKey
  }

  const hasGroupedItems = Array.isArray(items[0].items)

  return hasGroupedItems
    ? (
        items.map((node, i) => (
          <Fragment key={`nav-menu-${i}`}>
            <NavigationDivider index={i} />
            <Heading {...headingProps}>{node.title}</Heading>
            <NavigationList
              variant='vertical'
              navKey={navKey}
              wrapperProps={wrapperProps}
              items={node.items}
              {...props}
            />
          </Fragment>
        ))
      )
    : (
      <NavigationList
        navKey={navKey}
        variant='horizontal'
        wrapperProps={wrapperProps}
        items={items}
        {...props}
      />
      )
}

export default Navigation

Navigation.defaultProps = {
  variant: 'horizontal'
}

const itemsShape = PropTypes.shape({
  name: PropTypes.string,
  slug: PropTypes.string,
  color: PropTypes.string,
  Icon: PropTypes.element
})

const variantShape = PropTypes.oneOf(['horizontal', 'vertical'])

Navigation.propTypes = {
  variant: PropTypes.oneOfType([PropTypes.arrayOf(variantShape), variantShape]),
  iconOnly: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  headingProps: PropTypes.object,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        items: itemsShape
      })
    ),
    PropTypes.arrayOf(itemsShape)
  ])
}
