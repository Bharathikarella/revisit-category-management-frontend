import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddCategory.css';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [categoryType, setCategoryType] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('itemCount', itemCount);
    formData.append('categoryType', categoryType);
    formData.append('imageUrl', imageUrl);
  
    try {
      await axios.post('https://revisit-category-management-backend-xcpj.onrender.com/api/categories', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Category added!');
      navigate('/dashboard');
    } catch (err) {
      alert('Upload failed');
    }
  };



  
  return (
    <div className="add-category">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <label>Category Name:</label>
        <input
          type="text"
          value={name}
          required
          onChange={e => setName(e.target.value)}
        />

        <label>Item Count:</label>
        <input
          type="number"
          value={itemCount}
          required
          onChange={e => setItemCount(e.target.value)}
        />
        <label>Category Type:</label>
<input
  type="text"
  value={categoryType}
  onChange={(e) => setCategoryType(e.target.value)}
  required
/>

        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
