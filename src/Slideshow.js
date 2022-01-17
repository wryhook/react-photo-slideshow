import { useState } from "react"
import { useTransition, animated } from "@react-spring/web"
import styled from "styled-components"
import { useSwipeable } from "react-swipeable"
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc"
import { IconContext } from "react-icons"

export default function Slideshow(props) {
  let shouldRenderButtons = window.innerWidth > 600
  
  const [currentImage, setCurrentImage] = useState(0)
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
      setCurrentImage(prevCurrentImage => {
        return prevCurrentImage === images.length - 1 ? 0 : prevCurrentImage + 1
      })
    )
  }

  // helper function used in OnClick() for navigating to previous image
  function showPrevImage() {
    setGoingForward(false)
    return (
      setCurrentImage(prevCurrentImage => {
        return prevCurrentImage === 0 ? images.length - 1 : prevCurrentImage - 1
      })
    )
  }

  let leftArrow = <VscChevronLeft />
  let rightArrow = <VscChevronRight />
  
  // *** styled components ***
  const Body = styled.div`
    background: black;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    user-select: none;
  `
  
  const Header = styled.div`
    color: white;
    text-align: center;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  `
    
  const Carousel = styled.div`
    display: flex;
    user-select: none;
    height: 80vh;
  `

  const Side = styled.div`
    display: flex;
    flex: 1;
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
    cursor: pointer;
    color: white;
    &:hover {
      opacity: 0.8;
    } 
  `

  const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 7;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
  `

  // *** styled components ***

  return (
    <Body>
      <Header>
        {currentImage + 1} / {images.length}
      </Header>
      <Carousel>
        {
          shouldRenderButtons &&
          <LeftSide>
            <Button onClick={showPrevImage} >
              <IconContext.Provider value={{size: '6rem'}}>
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
            <IconContext.Provider value={{size: '6rem'}}>
              {rightArrow}
            </IconContext.Provider>
          </Button>
        </RightSide>
        }
      </Carousel>
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