import { useState, useEffect } from "react"
import styled from 'styled-components'
import Image from './Image'
import Slideshow from './Slideshow';
import { useTransition, animated } from "@react-spring/web"
import '../index.css'

function Gallery({imageUrls, darkMode}) {
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [startImage, setStartImage] = useState(1)
  const [animateSlideshow, setAnimateSlideshow] = useState(true)

  function openSlideshow(imageIdx) {
    setStartImage(imageIdx)
    setShowSlideshow(true)
  }

  function closeSlideshow() {
    setShowSlideshow(false)
  }

  const images = imageUrls.map((imageUrl, index) => { 
    return <Image openSlideshow={openSlideshow} imageIdx={index} imageUrl={imageUrl}/>
  }
  )

  const transition = useTransition(showSlideshow, {
    from: { 
      opacity: 0,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
    }
  })
  
  return (
    <div>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
          {images}
      </div>
      {
        transition((style, item) => {
          return (
            item &&
            <animated.div style={style} className="slideshow">
              <Slideshow imageUrls={imageUrls} handleClose={closeSlideshow} startIndex={startImage} darkMode={darkMode}/>
            </animated.div>        
          )
        })
      }
    </div>
  );
}

export default Gallery;
