import { useState } from "react"
import { useTransition, animated } from "@react-spring/web"
import styled from "styled-components"
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md"
import { IconContext } from "react-icons"

export default function Slideshow(props) {
  const [currentImage, setCurrentImage] = useState(1)
  const [goingForward, setGoingForward] = useState(true)

  // take imageUrl array, passed as prop, and convert to image components
  const images = props.imageUrls.map(imageUrl => 
    <img src={imageUrl} style={image} />
  )

  const transition = useTransition(currentImage, {
    from: { 
      opacity: 0, 
      //transform: goingForward ? 'scale(0.9)' : 'scale(1.1)',
      x: goingForward ? 200 : -200, 
    },
    enter: {
      opacity: 1, 
      transform: 'scale(1)',
      x: 0, 
    },
  })
  
  // helper function used in OnClick for navigating to previous image
  function showNextImage() {
    setGoingForward(true)
    return (
      setCurrentImage(prevCard => {
        return prevCard === images.length - 1 ? 0 : prevCard + 1
      })
    )
  }

  // helper function used in OnClick for navigating to previous image
  function showPrevImage() {
    setGoingForward(false)
    return (

      setCurrentImage(prevCard => {
        return prevCard === 0 ? images.length - 1 : prevCard - 1
      })
    )
  }

  // styled components
  const Body = styled.div`
    background: black;
    display: flex;
    height: 100vh;
    width: 100vw;
    user-select: none;
  `

  const Side = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    z-index: 100;
  `

  const LeftSide = styled(Side)`
    justify-content: right;
  `

  const RightSide = styled(Side)`
    justify-content: left;
  `

  const ImageContainer = styled.div`
    display: flex;
    flex: 7;
    align-items: center;
    justify-content: center;
  `

  return (
    <Body>
      <LeftSide>
        <div onClick={showPrevImage} style={{cursor: 'pointer'}}>
          <IconContext.Provider value={{ color: '#d4d4d4', size: '4rem',}}>
            <div>
              <MdArrowBackIos />
            </div>
          </IconContext.Provider>
        </div>
      </LeftSide>
      <ImageContainer>
        <div style={{maxHeight:'100%'}}>
        {
          transition((style, item) => {
            return (
              images[item] 
              &&
              <animated.div style={style}>
                <div style={{maxHeight:'100%'}}>
                  {images[item]}
                </div>
              </animated.div>
            )
          })
        }
        </div>
      </ImageContainer>
      <RightSide>
        <div onClick={showNextImage} style={{cursor: 'pointer'}}>
          <IconContext.Provider value={{ color: '#d4d4d4', size: '4rem'}}>
            <div>
              <MdArrowForwardIos />
            </div>
          </IconContext.Provider>
        </div>
      </RightSide>
    </Body>
  )
}

const image = {
  maxWidth: '100%', 
  maxHeight:'80vh', 
  userSelect: 'none',
}