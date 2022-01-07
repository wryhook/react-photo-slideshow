import { useState } from "react"
import { useTransition, animated } from "@react-spring/web"
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md"
import { IconContext } from "react-icons"

export default function Slideshow() {
  const images = [
    <img style={image} src="https://images.unsplash.com/photo-1617869884925-f8f0a51b2374?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" />,
    <img style={image} src="https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"/>,
    <img style={image} src="https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"/>,
  ]
  const [currentCard, setCurrentCard] = useState(1)
  const [goingForward, setGoingForward] = useState(true)

  const transition = useTransition(currentCard, {
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
  
  function showNextCard() {
    setGoingForward(true)
    return (
      setCurrentCard(prevCard => {
        return prevCard === images.length - 1 ? 0 : prevCard + 1
      })
    )
  }

  function showPrevCard() {
    setGoingForward(false)
    return (

      setCurrentCard(prevCard => {
        return prevCard === 0 ? images.length - 1 : prevCard - 1
      })
    )
  }

  return (
    <div style={body}>
      <div style={leftSide}>
        <div onClick={showPrevCard} style={{cursor: 'pointer'}}>
          <IconContext.Provider value={{ color: '#d4d4d4', size: '4rem',}}>
            <div>
              <MdArrowBackIos />
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <div style={container}>
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
      </div>
      <div style={rightSide}>
        <div onClick={showNextCard} style={{cursor: 'pointer'}}>
          <IconContext.Provider value={{ color: '#d4d4d4', size: '4rem'}}>
            <div>
              <MdArrowForwardIos />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}

const body = {
  background: 'black',
  display: 'flex',
  height: '100vh',
  width: '100vw',
  userSlect: 'none',
}

const leftSide = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  zIndex: 100,
}

const rightSide = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  zIndex: 100,
}

const container = {
  display: 'flex',
  flex: 7,
  alignItems: 'center',
  justifyContent: 'center',
}

const image = {
  maxWidth: '100%', 
  maxHeight:'80vh', 
  userSelect: 'none',
}