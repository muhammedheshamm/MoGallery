import './ImageWindow.css'
import { HiUserCircle } from 'react-icons/hi'
import { BsHeart } from 'react-icons/bs'
import { BiBookmark } from 'react-icons/bi'
import axios from 'axios'
import { RxCross2 } from 'react-icons/rx'
import { useState } from 'react'
import ConfirmDeleting from './ConfirmDeleting/ConfirmDeleting'
import LikersList from './LikersList/LikersList'
import { useLogin } from '../../../contextProviders/LoginProvider'
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '../../../contextProviders/UserProvider';
import { useImages } from '../../../contextProviders/ImagesProvider';


export default function ImageWindow() {
  const [openConfirmDeleting , setOpenConfirmDeleting] = useState(false)  
  const [openLikersList, setOpenLikersList] = useState(false)
  const { isLoggedIn, isAdmin } = useLogin()
  const { user, setUser } = useUser()
  const { setImages, currentImage, setCurrentImage } = useImages()


  const error = (msg) => {
    toast.error(msg , {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const close = (e) => {
    if(e.target.classList.contains('image-window'))
      setCurrentImage(null)
  }

  const calculateTime = (time) => {
    const previousDate = new Date(time);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - previousDate.getTime();
    const diffInHours = diffInMs / 1000;
    if (diffInHours < 60) {
      return `${Math.floor(diffInHours)} seconds ago`;
    } else if (diffInHours < 60 * 60) {
      return `${Math.floor(diffInHours / 60)} minutes ago`;
    } else if (diffInHours < 60 * 60 * 24) {
      return `${Math.floor(diffInHours / (60 * 60))} hours ago`;
    } else {
      return previousDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
    }
  }

  const deletePhoto = () => {
    axios.delete(`http://localhost:4000/delete/${currentImage._id}`,
    {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
    })
    .then(res => {
      if(res.data.success){
        setImages((prev) => {
          return prev.filter(image => image._id !== currentImage._id)
        })
        setCurrentImage(null)
      }
      else{
        console.log(res.data.message)
        alert(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const likePost = (e) => {
    if(!isLoggedIn){
      error('You need to login to like a post')
      return
    }
    axios.put(`http://localhost:4000/like/${currentImage._id}`, {},
    {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
    })
    .then( res => {
      if(!res.data.success){
        console.log(res.data.message)
      }
      setImages((prev) => {
        return prev.map(image => {
          if(image._id === currentImage._id){
            return {
              ...image,  likes: res.data.disliked? image.likes - 1 : image.likes + 1,
              likers: res.data.disliked? image.likers.filter(liker => liker !== user.username) : [user.username, ...image.likers]
            }
          }
          return image
        })
      })
      setCurrentImage((prev) => {
        return {
          ...prev, likes: res.data.disliked? prev.likes - 1 : prev.likes + 1,
          likers: res.data.disliked? prev.likers.filter(liker => liker !== user.username) : [user.username, ...prev.likers]
        }
      })

      e.target.style.color= res.data.disliked? 'white' : '#f85149'

      setUser((prev) => {
        return {...prev, likedPosts: res.data.disliked? prev.likedPosts.filter(id => id !== currentImage._id) : [...prev.likedPosts, currentImage._id]}
      })

    }).catch(err => {
      console.log(err.message)
    })
  }

  const savePost = (e) => {
    if(!isLoggedIn){
      error('You need to login to save a post')
      return
    }
    axios.put(`http://localhost:4000/save/${currentImage._id}`, {},
    {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
    })
    .then(res => {
      if(!res.data.success){
        return
      }
      setImages((prev) => {
        return prev.map(image => {
          if(image._id === currentImage._id){
            return {
              ...image,  saves: res.data.unsaved? image.saves - 1 : image.saves + 1,
              savers: res.data.unsaved? image.savers.filter(saver => saver !== user.username) : [user.username, ...image.savers]
            }
          }
          return image
        })
      })
      setCurrentImage((prev) => {
        return {...prev, saves: res.data.unsaved? prev.saves - 1 : prev.saves + 1 }
      })

      e.target.style.color= res.data.unsaved? 'white' : '#f85149'

      setUser((prev) => {
        return {...prev, savedPosts: res.data.unsaved? prev.savedPosts.filter(id => id !== currentImage._id) : [currentImage._id, ...prev.savedPosts]}

      })

    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className='image-window' onClick={close}>
        {openConfirmDeleting &&
          <ConfirmDeleting
            setOpenConfirmDeleting={setOpenConfirmDeleting}
            deletePhoto={deletePhoto} />}
        {openLikersList && 
          <LikersList
            setOpenLikersList={setOpenLikersList}
            likers = {currentImage.likers}/>}

        <div className='image-window__container'>
        <button onClick={ () => setCurrentImage(null) } className='window-close-btn'>
          <RxCross2 className='window-cross-icon' />
        </button>
        <div className="image-wraper">
          <img src={currentImage.src} alt={currentImage.title} />
        </div>
        <div className="half">
          <div className="upper">
            <span className='user'> <HiUserCircle className='user-icon' /> { currentImage.author } </span>
            <div className='info' >
              <p>{currentImage.description}</p>
            </div>
          </div>
          <div className='lower'>
            <div className="my-icons">
              <BsHeart className='icon' onClick={likePost} style={{color: user? user.likedPosts.includes(currentImage._id)? '#f85149' : 'white' : ''}} />
              <BiBookmark className='icon' onClick={savePost} style={{color: user? user.savedPosts.includes(currentImage._id)? '#f85149' : 'white' : ''}} />
            </div>
            <div className="likes">
              <span
                onClick={ () => isLoggedIn? setOpenLikersList(true): error('you need to login first to see likes') }>
                  Liked by {currentImage.likes}
              </span>
            </div>
            { isAdmin && <div className="actions">
              <button onClick={ () => setOpenConfirmDeleting(true) }>Delete this post</button>
            </div> }
            <span className='created-at'>{calculateTime(currentImage.createdAt)}</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
