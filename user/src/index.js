import React from 'react';
import ReactDOM from 'react-dom';
import './styles/mainIndex.css';
import App from './App';
import { UserContextProvider } from './context/UserContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <UserContextProvider>
        <div className='overlay-container'>
          <div className="container">
            <App />
          </div>
        </div>
      </UserContextProvider>
  </React.StrictMode>
);
