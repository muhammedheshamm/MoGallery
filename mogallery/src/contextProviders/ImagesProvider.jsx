import React, {createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'

const ImagesContext = createContext();

export function useImages() {
  return useContext(ImagesContext)
}

export default function ImagesProvider({ children }) {
  const [images, setImages] = useState([]) //all images
  const [loadingImages, setLoadingImages] = useState(false) //loading images from the server
  const [currentImage, setCurrentImage] = useState(null) //image to display in the image window (enlarged)


  useEffect(() => {
    setLoadingImages(true);
    try{
      const getImages = async () => {
        const result = await axios.get('http://localhost:4000/images');
        setImages(result.data);
        setLoadingImages(false);
      };
      getImages();
    }catch(e){
      console.log(e)
      setLoadingImages(false);
    }
  }, []);

  return (
    <ImagesContext.Provider value={{ images, setImages, loadingImages, currentImage, setCurrentImage }}>
      {children}
    </ImagesContext.Provider>
  )
}