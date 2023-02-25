import React, { useState } from 'react'
import './UploadForm.css'
import axios from 'axios'
import { BsFillCameraFill } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useImages } from '../../../contextProviders/ImagesProvider'
import { useCategories } from '../../../contextProviders/CategoriesProvider'


export default function UploadForm(props) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const { setImages } = useImages()
  const { setCategories } = useCategories()
  const { setOpenUploadForm } = props

  const success = (msg) => {
    toast.success( msg , {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      className: "toast"
      });
  }

  const error = (msg) => {
    toast.error(msg , {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('image', image)
    if(!image){
      error('Please select an image')
      return
    }
    if(!title){
      error('Please enter a title')
      return
    }
    if(!category){
      error('Please select a category')
      return
    }
    setLoading(true)
    axios.post('http://localhost:4000/upload', formData,
    {
      headers: { Authorization: localStorage.getItem('user')? `Bearer ${JSON.parse(localStorage.getItem('user')).token}` : ''}
    })
      .then(res => {
        if(res.data.success){
          success(res.data.message)
          setImages((prev) => [res.data.imageToSend, ...prev])
          const category = res.data.imageToSend.category
          setCategories((prev) => prev.includes(category.toLowerCase())? [...prev] : [...prev, category.toLowerCase()])
          setImage(null)
          setTitle('')
          setDescription('')
          setCategory('')
        }
        else{
          error(res.data.message)
        }
        setLoading(false)
      })
      .catch(error => {
        error('Something went wrong')
        console.log(error)
        setLoading(false)
      })
  }

  const handleClose = (event) => {
    if(event.target.className === 'form-b'){
      setOpenUploadForm(false)
    }
  } 

  return (
    <div className='form-b' onClick={ handleClose } >
      <div className='up-form'>
      <RxCross2 className='cross-icon' onClick={ () => props.setOpenUploadForm(false) } />
      <h1>Add new post</h1>
      <p className='subtitle'>Please fill in all required fields</p>
      <form onSubmit={handleSubmit} encType='multipart/form-data' >
        <label htmlFor="file-input" className='file-label'>
          {!image && <BsFillCameraFill className='camera-icon'/>}
          { image && <p>{image.name}</p>}
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
            name="image"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            id='file-input'
          />
        </label>
        <div className='wraber'>
          <label className='required'>Title</label>
          <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          name="title"
          placeholder="Give it a title"
          autoComplete='off'
          />
        </div>

        <div className='wraber'>
          <label className='required'>Category</label>
          <select 
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className='select'
          >
            <option value='' disabled={true} >Select a category</option>
            <option value='Portraits'>Portraits</option>
            <option value='Landscapes'>Landscapes</option>
            <option value='Street'>Street</option>
          </select>
        </div>

        <div className='wraber'>
          <label>Caption</label>
          <textarea
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          name="description"
          placeholder="Add a caption (optional)"
          autoComplete='off'
        />
        </div>
        { loading &&
          <div className="load">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
        }
        <button type="submit">post</button>
      </form>
    </div>
    <ToastContainer />
    </div>
  )
}
