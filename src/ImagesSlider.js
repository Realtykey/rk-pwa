import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Box from '@material-ui/core/Box'
import '@material/react-button/dist/button.css'

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

const useStyles = makeStyles((theme) => ({
  slider: {
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    height: '100%'
  },
  root: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    height: '400px'
  },
  sliderButton: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    maxWidth: '10%'
  },
  img: {
    height: '100%',
    maxWidth: 'auto',
    display: 'block',
    overflow: 'auto',
    width: '100%'
  }
}))

export default function ImagesSlider (props) {
  const { photos } = props

  const classes = useStyles()

  return (
    <CarouselProvider
      touchEnabled={true}
      dragEnabled={false}
      hasMasterSpinner
      totalSlides={3}
      naturalSlideWidth={100}
      naturalSlideHeight={125}
    >
      <div className={classes.root}>
        <Box display={{ xs: 'none', md: 'block', sm: 'block' }}>
          <div className={classes.sliderButton}>
            <ButtonBack className="foo-button mdc-button">
              <ArrowBackIosIcon />
            </ButtonBack>
          </div>
        </Box>

        <Slider className={classes.slider}>
          {photos.map((photo, index) => {
            return (
              <Slide key={index} index={index}>
                <Image className={classes.img} src={photo}></Image>
              </Slide>
            )
          })}
        </Slider>
        <Box display={{ xs: 'none', md: 'block', sm: 'block' }}>
          <div className={classes.sliderButton}>
            <ButtonNext className="foo-button mdc-button">
              <ArrowForwardIosIcon />
            </ButtonNext>
          </div>
        </Box>
      </div>
    </CarouselProvider>
  )
}

ImagesSlider.defaultProps = {
  photos: []
}

ImagesSlider.propTypes = {
  photos: PropTypes.array
}
