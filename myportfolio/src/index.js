import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home  from './Components/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Router>
      <App />
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes> 
    </Router>
);

reportWebVitals();
