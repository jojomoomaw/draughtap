import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrandList from './BrandList';
import BrandEdit from './BrandEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/brands' exact={true} element={<BrandList/>}/>
        <Route path='/brands/:id' exact={true} element={<BrandEdit/>}/>
      </Routes>
    </Router>
  )
}

export default App;
