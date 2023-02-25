import React, {createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'

const CategoriesContext = createContext();

export function useCategories() {
  return useContext(CategoriesContext)
}

export default function LoginProvider({children}) {
  const [categories, setCategories] = useState([]) 


  useEffect(() => {
    try{
      const getCategories = async () => {
        const result = await axios.get('http://localhost:4000/categories');
        setCategories(result.data.categories);
      };
      getCategories();
    } catch(e){
      console.log(e)
    }
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  )
}
