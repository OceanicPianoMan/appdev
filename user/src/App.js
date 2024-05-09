import { BrowserRouter, Routes, Route } from 'react-router-dom';

// page imports
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Navbar />        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
