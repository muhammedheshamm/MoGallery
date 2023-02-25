import Header from './components/Header/Header';
import About from './components/About/About';
import Login from './components/Entry/Login';
import SignUp from './components/Entry/SignUp';
import MainPage from './components/MainPage/MainPage';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SavedPosts from './components/SavedPosts/SavedPosts';


export default function App() {
  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/"
          element={ 
            <>
              <MainPage openSaved = {false} />
              <Footer />
            </>
            } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <SignUp /> } />
        {/* <Route path="/about" 
          element={
            <>
            <About />
            <Footer />
            </>
            } /> */}
        <Route path='/saved' element={ <SavedPosts />} />
      </Routes>
    </div>     
  )
}