import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// page imports
import Index from './pages/Index';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Albums from './pages/Albums';
import Users from './pages/Users';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Navbar />        
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/UserProfile/:id" element={<UserProfile />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/Albums" element={<Albums />} />
            <Route path="/Users" element={<Users />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;