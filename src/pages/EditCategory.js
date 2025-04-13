import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EditCategory.css';
import API from '../services/api';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    itemCount: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/api/categories${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = res.data.find(cat => cat._id === id);
        if (found) setFormData(found);
      } catch {
        alert('Failed to load category');
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/categories/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Category updated!');
      navigate('/dashboard');
    } catch {
      alert('Error updating category');
    }
  };

  return (
    <div className="edit-category">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label>Category Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Item Count:</label>
        <input
          type="number"
          name="itemCount"
          value={formData.itemCount}
          onChange={handleChange}
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;
