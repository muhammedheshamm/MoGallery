import React from 'react'
import './Filter.css'
import { useCategories } from '../../../contextProviders/CategoriesProvider'

export default function Filter(props) {

  const {currentFilter, setCurrentFilter } = props
  const { categories } = useCategories()

  function handleClick(e) {
    setCurrentFilter(e.target.innerText.toLowerCase())
    localStorage.setItem('currentFilter', e.target.innerText.toLowerCase())

  }

  const catArr = categories.map((cat , index)=>{
    return(
      <React.Fragment key={index}>
        <hr />
        <span className={currentFilter===cat.toLowerCase()? 'filter-item filter-active' : 'filter-item'}
        onClick={handleClick}>{cat}</span>
      </React.Fragment>
    )
  })

  return (
    <div className='filter'>
      <span className={currentFilter==='all'? 'filter-item filter-active' : 'filter-item'}
      onClick={handleClick}>All</span>
      {catArr}
    </div>
  )
}
