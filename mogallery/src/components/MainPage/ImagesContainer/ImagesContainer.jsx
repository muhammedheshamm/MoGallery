import React from 'react'
import './ImagesContainer.css'
import Masonry from 'react-masonry-css';
import { useUser } from '../../../contextProviders/UserProvider'
import { useImages } from '../../../contextProviders/ImagesProvider';


export default function ImagesContainer(props) {
  const { currentFilter, style, displaySaved} = props
  const { user } = useUser()
  const {images, loadingImages, setCurrentImage } = useImages()
  const savedImages = user? images.filter((img) => img.savers.includes(user.username)) : []

  const openImage = (e) => {
    const image = displaySaved? savedImages.find((img)=>img._id===e.target.id) : images.find((img)=>img._id===e.target.id)
    setCurrentImage(image)
  }
  let imgs 
  if(!displaySaved){
    imgs = images.map((img)=>{
      return (img.category.toLowerCase()===currentFilter || currentFilter==='all') && (
        <div className='image-holder' key={img._id}>
          <img src={img.src}
          alt={img.title} />
          <div className='overly' onClick={openImage} id={img._id}>
            <h3>{img.title}</h3>
          </div>
        </div>
      )
    })
  } else {
    imgs = savedImages.map((img)=>{
      return  (
        <div className='image-holder' key={img._id}>
          <img src={img.src}
          alt={img.title} />
          <div className='overly' onClick={openImage} id={img._id}>
            <h3>{img.title}</h3>
          </div>
        </div>
      )
    })
  }

  
  const myBreakPoints = {
    default: 4,
    1100: 3,
    700: 2
  }

  return (
    <div className='images-wraper'>
      { loadingImages &&
          <div className="load-images">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
      }
      { imgs.length === 0 && !loadingImages ?
          <div className='no-posts-wraper'>
          < h1 className='no-posts'>No Posts to show</h1>
          </div>
          : 
      <Masonry
        breakpointCols={myBreakPoints}
        className="images-container container"
        columnClassName="images-container-column"
        style={style}
      >
        {imgs}
      </Masonry>
      }
    </div>
  )
}
