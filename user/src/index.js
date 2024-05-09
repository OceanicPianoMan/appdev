import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/mainIndex.css';
import App from './App';
import { TestContextProvider } from './context/TestContext'; 
import { UserContextProvider } from './context/UserContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <TestContextProvider>
    <UserContextProvider>
      <div className='overlay-container'>
        <div className="container">
          <App />
        </div>
      </div>
    </UserContextProvider>
    </TestContextProvider>
  </React.StrictMode>
);

