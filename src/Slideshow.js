import { useState } from "react"
import { useTransition, animated } from "@react-spring/web"
import styled from "styled-components"
import { useSwipeable } from "react-swipeable"
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md"
import { IconContext } from "react-icons"

export default function Slideshow(props) {
  let shouldRenderButtons = window.innerWidth > 600
  
  const [currentImage, setCurrentImage] = useState(1)
  const [goingForward, setGoingForward] = useState(true)

  // take imageUrl array prop and convert to image components
  const images = props.imageUrls.map(imageUrl => 
    <img src={imageUrl} style={styles.image} />
  )

  // image transitions using the react-spring library
  const transition = useTransition(currentImage, {
    from: { 
      opacity: 0, 
      transform: goingForward ? 'scale(0.9)' : 'scale(1.1)',
      //x: goingForward ? 200 : -200, 
    },
    enter: {
      opacity: 1, 
      transform: 'scale(1)',
      x: 0, 
    },
  })

  // swipe gesture detection using react-swipeable library
  const swipeConfig = {
    delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
    preventDefaultTouchmoveEvent: true,  // call e.preventDefault *See Details*
    trackTouch: true,                     // track touch input
    trackMouse: false,                    // track mouse input
    rotationAngle: 0,                     // set a rotation angle
  }
  const handlers = useSwipeable({
    onSwipedLeft: () => showNextImage(),
    onSwipedRight: () => showPrevImage(),
    ...swipeConfig
  })
  
  // helper function used in OnClick() for navigating to previous image
  function showNextImage() {
    setGoingForward(true)
    return (
      setCurrentImage(prevCard => {
        return prevCard === images.length - 1 ? 0 : prevCard + 1
      })
    )
  }

  // helper function used in OnClick() for navigating to previous image
  function showPrevImage() {
    setGoingForward(false)
    return (
      setCurrentImage(prevCard => {
        return prevCard === 0 ? images.length - 1 : prevCard - 1
      })
    )
  }

  let leftArrow = <MdArrowBackIos />
  let rightArrow = <MdArrowForwardIos />
  
  // *** styled components ***
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

  const Button = styled.div`
    height: 4rem;
    width: 4rem;
    cursor: pointer;
    color: white;
    &:hover {
      opacity: 0.8;
    } 
  `

  const ImageContainer = styled.div`
    display: flex;
    flex: 7;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
  `
  // *** styled components ***

  return (
    <Body>
      {
        shouldRenderButtons &&
        <LeftSide>
          <Button onClick={showPrevImage} >
            <IconContext.Provider value={{size: '4rem'}}>
              {leftArrow}
            </IconContext.Provider>
          </Button>
        </LeftSide>
      }
      <ImageContainer {...handlers}>
        <div style={{maxHeight:'100%'} }>
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
      {
        shouldRenderButtons && 
        <RightSide>
        <Button onClick={showNextImage}>
          <IconContext.Provider value={{size: '4rem'}}>
            {rightArrow}
          </IconContext.Provider>
        </Button>
      </RightSide>
      }
    </Body>
  )
}


const styles = {
	image: {
    maxWidth: '100%', 
    maxHeight:'80vh', 
    userSelect: 'none',
    zIndex: 1000,
  },
  icon: {
    height: 80,
    width: 80,
  }
}	