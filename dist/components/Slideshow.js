"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Slideshow;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _web = require("@react-spring/web");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactSwipeable = require("react-swipeable");

var _vsc = require("react-icons/vsc");

var _reactIcons = require("react-icons");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Slideshow(props) {
  let shouldRenderButtons = window.innerWidth > 600;
  const [currentImage, setCurrentImage] = (0, _react.useState)(0);
  const [goingForward, setGoingForward] = (0, _react.useState)(true); // take imageUrl array prop and convert to image components

  const images = props.imageUrls.map(imageUrl => /*#__PURE__*/React.createElement("img", {
    src: imageUrl,
    style: styles.image
  })); // image transitions using the react-spring library

  const transition = (0, _web.useTransition)(currentImage, {
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
  const handlers = (0, _reactSwipeable.useSwipeable)(_objectSpread({
    onSwipedLeft: () => showNextImage(),
    onSwipedRight: () => showPrevImage()
  }, swipeConfig)); // helper function used in OnClick() for navigating to previous image

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

  let leftArrow = /*#__PURE__*/React.createElement(_vsc.VscChevronLeft, null);
  let rightArrow = /*#__PURE__*/React.createElement(_vsc.VscChevronRight, null); // *** styled components ***

  const Body = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    background: black;\n    display: flex;\n    flex-direction: column;\n    height: 100vh;\n    width: 100vw;\n    user-select: none;\n  "])));

  const Header = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    color: white;\n    text-align: center;\n    font-size: 1.5rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 2rem;\n  "])));

  const Carousel = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    display: flex;\n    user-select: none;\n    height: 80vh;\n  "])));

  const Side = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    display: flex;\n    flex: 1;\n    align-items: center;\n    z-index: 100;\n  "])));

  const LeftSide = (0, _styledComponents.default)(Side)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    justify-content: right;\n  "])));
  const RightSide = (0, _styledComponents.default)(Side)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    justify-content: left;\n  "])));

  const Button = _styledComponents.default.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    cursor: pointer;\n    color: white;\n    &:hover {\n      opacity: 0.8;\n    } \n  "])));

  const ImageContainer = _styledComponents.default.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    flex: 7;\n    align-items: center;\n    justify-content: center;\n    border-radius: 100px;\n  "]))); // *** styled components ***


  return /*#__PURE__*/React.createElement(Body, null, /*#__PURE__*/React.createElement(Header, null, currentImage + 1, " / ", images.length), /*#__PURE__*/React.createElement(Carousel, null, shouldRenderButtons && /*#__PURE__*/React.createElement(LeftSide, null, /*#__PURE__*/React.createElement(Button, {
    onClick: showPrevImage
  }, /*#__PURE__*/React.createElement(_reactIcons.IconContext.Provider, {
    value: {
      size: '6rem'
    }
  }, leftArrow))), /*#__PURE__*/React.createElement(ImageContainer, handlers, /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: '100%'
    }
  }, transition((style, item) => {
    return images[item] && /*#__PURE__*/React.createElement(_web.animated.div, {
      style: style
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: '100%'
      }
    }, images[item]));
  }))), shouldRenderButtons && /*#__PURE__*/React.createElement(RightSide, null, /*#__PURE__*/React.createElement(Button, {
    onClick: showNextImage
  }, /*#__PURE__*/React.createElement(_reactIcons.IconContext.Provider, {
    value: {
      size: '6rem'
    }
  }, rightArrow)))));
}

const styles = {
  image: {
    maxWidth: '100%',
    maxHeight: '80vh',
    userSelect: 'none',
    zIndex: 1000
  },
  icon: {
    height: 80,
    width: 80
  }
};