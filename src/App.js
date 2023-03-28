import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
   <>
   <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
        
         
        </Routes>
      </BrowserRouter>
   
   </>
    </div>
  );
}

export default App;
