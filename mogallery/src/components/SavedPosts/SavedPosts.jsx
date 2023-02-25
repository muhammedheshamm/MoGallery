import React from 'react'
import ImagesContainer from '../MainPage/ImagesContainer/ImagesContainer'
import Footer from '../Footer/Footer'
import { useLogin } from '../../contextProviders/LoginProvider'
import { Navigate } from 'react-router-dom'
import ImageWindow from '../MainPage/ImageWindow/ImageWindow'
import { useImages } from '../../contextProviders/ImagesProvider'

export default function SavedPosts() {
  const { isLoggedIn } = useLogin()
  const { currentImage } = useImages()
  
  const savedSectionStyle = {
    minHeight: 'calc(100vh - 140px)',
    marginTop: '70px',
    marginBottom: '0'
  }

  return isLoggedIn? (
    <>
      <ImagesContainer style={savedSectionStyle} displaySaved={true} />
      <Footer />
      { currentImage && <ImageWindow /> }
    </>
  )
  : <Navigate to='/login' />
}
