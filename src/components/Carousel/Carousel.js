import React from 'react'
import Slider from 'react-slick'
import { Image, Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import './Carousel.css'
import * as styles from './CarouselStyles.module.css'
import 'slick-carousel/slick/slick.css'
import { capitalizeFirstWord } from '../../utils/format'
import { Chip } from '../Chip/Chip'

export const Carousel = ({ itemsList }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  }

  // console.log(JSON.parse(itemsList[0].content.data.content))
  // console.log(calculateReadTime(itemsList[0]))
  // console.log(itemsList)

  return (
    <div sx={{
      width: 'full',
      height: 'full'
    }}
    >
      <Slider {...settings}>
        {
          itemsList.map((item, index) => (
            <article key={index}>
              <div style={{ display: 'flex', height: 350 }}>
                <div className={styles.information}>
                  <Chip bgColor={item.category.color} title={item.category.name} />
                  <h2>{capitalizeFirstWord(item.title)}</h2>
                  <h3>{capitalizeFirstWord(item.description)}</h3>
                </div>
                <div style={{ height: '100%' }} />
                <Link
                  as={GatsbyLink}
                  to={`/${item.slug}`}
                  style={{
                    height: '90%',
                    margin: 'auto 10px'
                  }}
                  sx={{
                    height: 'full',
                    verticalAlign: 'middle', // avoid baseline gap
                    img: {
                      bg: 'omegaLighter',
                      borderRadius: t => [
                        `${t.radii.default} 3rem 0 0`,
                        `${t.radii.default} 3rem 3rem`
                      ],
                      zIndex: '11',
                      position: 'relative',
                      height: '100%',
                      objectFit: 'cover'
                    },
                    width: ['full', 'auto'],
                    maxWidth: ['260px!important', 'none'],
                    flexBasis: '1/3',
                    position: 'relative',
                    m: 0,
                    ml: [null, 0, 5],
                    mx: 2,
                    '&::before, &::after': {
                      content: '""',
                      bg: 'omegaLight',
                      position: 'absolute',
                      borderRadius: t => `${t.radii.default} 0`
                    },
                    '::before': {
                      top: -2,
                      left: -2,
                      size: '2/3'
                    },
                    '::after': {
                      bottom: -2,
                      right: -2,
                      size: 80,
                      borderRadius: ['0', '3rem 0']
                    }
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                  />
                </Link>
              </div>
            </article>
          ))
        }
      </Slider>
    </div>
  )
}
