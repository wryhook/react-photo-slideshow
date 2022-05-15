# React Photo Slideshow

Fast and responsive slideshow and gallery components for React

## Features

* Easy setup
* Mobile swipe gestures
* Beautiful animations
* Light and dark mode support
* More coming soon...

## Installation

```
yarn add react-photo-slideshow
```

or 

```
npm install react-photo-slideshow
```

## Usage

### Example with gallery

```jsx
import Gallery from 'react-photo-slideshow'

const imageUrls = [
  "https://images.unsplash.com/photo-1617869884925-f8f0a51b2374?ixlib=rb 1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  "https://images.unsplash.com/photo-1542902093-d55926049754?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
]

<Gallery imageUrls={imageUrls} darkMode={true} />
```

### Example with slideshow only

```jsx
import Slideshow from 'react-photo-slideshow'

const imageUrls = [
  "https://images.unsplash.com/photo-1617869884925-f8f0a51b2374?ixlib=rb 1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  "https://images.unsplash.com/photo-1542902093-d55926049754?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
]

const [showSlideshow, setShowSlideshow] = useState(false)

function closeSlideshow() {
  setShowSlideshow(false)
}

{
  showSlideShow &&
  <Slideshow imageUrls={imageUrls} handleClose={closeSlideshow} startIndex={1} darkMode={true} /> 
}
```

In this example, you would also need a method to open the slideshow, for example, by clicking a button that sets `showSlideshow` to true.

## Props

### Gallery component

| Prop        |   Type  | Default Value | Description                                                       |
|-------------|:-------:|---------------|-------------------------------------------------------------------|
| `imageUrls` | array   | undefined     | An array of strings containing the urls of images to be displayed |
| `darkMode`  | boolean | true          | Sets whether the slideshow is in dark mode or light mode          |
