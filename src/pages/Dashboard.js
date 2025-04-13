import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
axios.get('/api/categories')

const Dashboard = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://revisit-category-management-backend-xcpj.onrender.com/api/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      alert('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="dashboard">
      <h2 className="heading">Categories</h2>
      
      <Link to="/add-category">
  <button className="add-button">+ Add Category</button>
</Link>



      <div className="category-grid">
  {categories.map(cat => (
    <div className="category-card" key={cat._id} >
    <div className="image-wrapper">
    <img src={cat.imageUrl} alt={cat.name} className="category-image" />
    <Link to={`/edit-category/${cat._id}`}>
      <button className="edit-button">Edit</button>
    </Link>
  </div>
      <div className="category-card-content">
        <h3>{cat.name}</h3>
        <p>{cat.itemCount} items</p>
      </div>
    </div>
  ))}
</div>
      
    </div>
  );
};

export default Dashboard;
