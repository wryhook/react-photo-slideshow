import { useState, useEffect } from "react"
import Image from './Image'
import Slideshow from './Slideshow';

function Gallery({imageUrls, darkMode}) {
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [startImage, setStartImage] = useState(1)

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
  
  return (
    <div>
      {
        !showSlideshow &&
        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
          {images}
        </div>
      }
      {
        showSlideshow &&
        <Slideshow imageUrls={imageUrls} handleClose={closeSlideshow} startIndex={startImage} darkMode={darkMode}/>
      }
    </div>
  );
}

export default Gallery;
