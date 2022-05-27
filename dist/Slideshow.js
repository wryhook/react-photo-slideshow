import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { IoCloseOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
export default function Slideshow(props) {
  const [inDesktopView, setInMobileView] = useState(window.innerWidth > 768);
  const [currentImage, setCurrentImage] = useState(props.startIndex || 0);
  const [goingForward, setGoingForward] = useState(true); // take imageUrl array prop and convert to image components

  const images = props.imageUrls.map((imageUrl, index) => {
    return /*#__PURE__*/React.createElement("img", {
      src: imageUrl,
      style: styles.image,
      key: index
    });
  }); // image transitions using the react-spring library

  const transition = useTransition(currentImage, {
    from: {
      opacity: 0,
      transform: goingForward ? 'scale(0.9)' : 'scale(1.1)' //x: goingForward ? 200 : -200, 

    },
    enter: {
      opacity: 1,
      transform: 'scale(1)',
      x: 0
    }
  }); // swipe gesture detection using react-swipeable library

  const swipeConfig = {
    delta: 10,
    // min distance(px) before a swipe starts. *See Notes*
    preventDefaultTouchmoveEvent: true,
    // call e.preventDefault *See Details*
    trackTouch: true,
    // track touch input
    trackMouse: false,
    // track mouse input
    rotationAngle: 0 // set a rotation angle

  };
  const handlers = useSwipeable({
    onSwipedLeft: () => showNextImage(),
    onSwipedRight: () => showPrevImage(),
    ...swipeConfig
  }); // helper function used in OnClick() for navigating to previous image

  function showNextImage() {
    setGoingForward(true);
    return setCurrentImage(prevCurrentImage => {
      return prevCurrentImage === images.length - 1 ? 0 : prevCurrentImage + 1;
    });
  } // helper function used in OnClick() for navigating to previous image


  function showPrevImage() {
    setGoingForward(false);
    return setCurrentImage(prevCurrentImage => {
      return prevCurrentImage === 0 ? images.length - 1 : prevCurrentImage - 1;
    });
  }

  let leftArrow = /*#__PURE__*/React.createElement(VscChevronLeft, null);
  let rightArrow = /*#__PURE__*/React.createElement(VscChevronRight, null); // *** styled components ***

  const Body = styled.div`
    color: ${props.darkMode ? "white" : "black"};
    background: ${props.darkMode ? "black" : "white"};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
    user-select: none;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
  `;
  const Header = styled.div`
    text-align: center;
    font-size: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 15vh;
    position: relative;
    top: 0;
  `;
  const Footer = styled(Header)`
    max-width: 65ch;
    padding-left: 1rem;
    padding-right: 1rem;
  `;
  const Carousel = styled.div`
    display: flex;
    user-select: none;
    height: 70vh;
    width: ${inDesktopView ? '90vw' : '100vw'};
  `;
  const Side = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    z-index: 100;
  `;
  const LeftSide = styled(Side)`
    justify-content: left;

  `;
  const RightSide = styled(Side)`
    justify-content: right;
  `;
  const Button = styled.div`
    border: 1px solid ${props.darkMode ? 'white' : 'black'};
    border-radius: 10px;
    aspect-ratio: 1 / 1;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: ${props.darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"};
    }
  `;
  const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 7;
    align-items: center;
    justify-content: space-around;
    border-radius: 100px;
  `;
  const CloseButton = styled.div`
    padding: 5px;
    border: 1px solid ${props.darkMode ? "white" : "black"};
    border-radius: 10px;
    font-size: 1.25rem;
    display: flex;
    justify-content: center;
    z-index: 100;
    cursor: pointer;
    margin-left: 3rem;
    margin-right: 3rem;

    &:hover {
      background: ${props.darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"};
    }

    @media (max-width: 768px) {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  `;
  const HiddenCloseButton = styled(CloseButton)`
    visibility: hidden;
  `;
  const ImageIndex = styled.div`
  `;
  const FakeBox = styled.div`
    display: hidden;
  `; // *** styled components ***

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Body, null, /*#__PURE__*/React.createElement(Header, null, /*#__PURE__*/React.createElement(HiddenCloseButton, null, /*#__PURE__*/React.createElement(IconContext.Provider, {
    value: {
      size: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement(IoCloseOutline, null))), /*#__PURE__*/React.createElement(ImageIndex, null, currentImage + 1, " / ", images.length), /*#__PURE__*/React.createElement(CloseButton, {
    onClick: props.handleClose
  }, /*#__PURE__*/React.createElement(IconContext.Provider, {
    value: {
      size: '1.5rem'
    }
  }, /*#__PURE__*/React.createElement(IoCloseOutline, null)))), /*#__PURE__*/React.createElement(Carousel, null, inDesktopView && /*#__PURE__*/React.createElement(LeftSide, null, /*#__PURE__*/React.createElement(Button, {
    onClick: showPrevImage
  }, /*#__PURE__*/React.createElement(IconContext.Provider, {
    value: {
      size: '2.5rem'
    }
  }, leftArrow))), /*#__PURE__*/React.createElement(ImageContainer, handlers, /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: '100%'
    }
  }, transition((style, item) => {
    return images[item] && /*#__PURE__*/React.createElement(animated.div, {
      style: style
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: '100%'
      }
    }, images[item]));
  }))), inDesktopView && /*#__PURE__*/React.createElement(RightSide, null, /*#__PURE__*/React.createElement(Button, {
    onClick: showNextImage
  }, /*#__PURE__*/React.createElement(IconContext.Provider, {
    value: {
      size: '2.5rem'
    }
  }, rightArrow)))), /*#__PURE__*/React.createElement(Footer, null)));
}
const styles = {
  image: {
    maxHeight: '70vh',
    maxWidth: '100%',
    userSelect: 'none',
    zIndex: 1000
  },
  icon: {
    height: 80,
    width: 80
  }
};
Slideshow.defaultProps = {
  darkMode: true,
  startIndex: 1
};