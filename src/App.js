import React from 'react';
import { render } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './components/redux/sclices/filterSlice';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import Header from './components/Header';
import { Home } from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

export const searchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">

      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
