import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar'
import About from './components/About';
import NoteState from './context/NoteState';
import Alerts from './components/Alerts';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [alert, setAlert] = useState(null)
  function showAlert(msg, type) {
    setAlert({
      msg: msg,
      type: type
    });

    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar /> 
        <Alerts alert={alert}/>
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route path="/signup" element={<SignUp showAlert={showAlert}/>}/>
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
