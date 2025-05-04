import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import UserSelector from './UserSelector';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <Router>
      <div className='App'>
        <nav className='navbar'>
          <ul>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/analytics">Аналитика</Link></li>
          </ul>
          <div className="user-selector-wrapper">
            <UserSelector currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </div>
        </nav>

        <div className='content'>
          <Routes>
            <Route path="/orders" element={<OrdersPage currentUser={currentUser} />} />
            <Route path="/products" element={<ProductsPage currentUser={currentUser} />} />
            <Route path="/customers" element={<CustomersPage currentUser={currentUser} />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
