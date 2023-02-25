import React, { useState } from 'react'
import ImageWindow from './ImageWindow/ImageWindow'
import Intro from './Intro/Intro'
import ImagesContainer from './ImagesContainer/ImagesContainer'
import Filter from './Filter/Filter'
import UploadForm from './UploadForm/UploadForm'
import { useImages } from '../../contextProviders/ImagesProvider'


export default function MainPage () {
  const [currentFilter, setCurrentFilter] = useState(localStorage.getItem('currentFilter') || 'all')
  const [openUploadForm, setOpenUploadForm] = useState(false)
  const { currentImage } = useImages()
  
  //if there is an image to display in the image window, hide the scroll bar
  if(currentImage){
    document.querySelector('body').style.overflow='hidden'
  } else {
    document.querySelector('body').style.overflow='auto'
  }

  return (
    <div>
      <Intro setOpenUploadForm={setOpenUploadForm}  />
      
      { openUploadForm && <UploadForm 
        setOpenUploadForm={setOpenUploadForm} 
      /> }

      <Filter
        currentFilter={currentFilter} 
        setCurrentFilter={setCurrentFilter} 
      />

      <ImagesContainer
        currentFilter={currentFilter}
        displaySaved={false}
        style={{}}
      />

      { currentImage && <ImageWindow /> } 
    
    </div>
  )
}
