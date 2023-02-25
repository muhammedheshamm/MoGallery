import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import LoginProvider from './contextProviders/LoginProvider';
import UserProvider from './contextProviders/UserProvider';
import ImagesProvider from './contextProviders/ImagesProvider';
import CategoriesProvider from './contextProviders/CategoriesProvider';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider >
        <UserProvider>
          <ImagesProvider>
            <CategoriesProvider>
              <App />
            </CategoriesProvider>
          </ImagesProvider>
        </UserProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
