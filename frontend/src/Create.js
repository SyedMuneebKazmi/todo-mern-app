import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

// Use environment variable or default to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:50010';

const Create = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        inStock: true
    });
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const createProduct = (e) => {
        e.preventDefault();
        // Ensure price is a number
        const productData = {
            ...formData,
            price: parseFloat(formData.price)
        };

        axios.post(`${API_URL}/api/products`, productData)
            .then(result => {
                console.log(result.data);
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    imageUrl: '',
                    category: '',
                    inStock: true
                });
                setShowForm(false);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="product-creator">
            <h1>E-Commerce Shop</h1>
            
            {!showForm ? (
                <button 
                    className="show-form-btn"
                    onClick={() => setShowForm(true)}
                >
                    Add New Product
                </button>
            ) : (
                <form className="product-form" onSubmit={createProduct}>
                    <h2>Add New Product</h2>
                    
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Product name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Product description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            step="0.01"
                            min="0"
                            placeholder="Product price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            id="imageUrl"
                            type="text"
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input
                            id="category"
                            type="text"
                            name="category"
                            placeholder="Product category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group checkbox-group">
                        <label htmlFor="inStock">
                            <input
                                id="inStock"
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleChange}
                            />
                            In Stock
                        </label>
                    </div>
                    
                    <div className="form-buttons">
                        <button type="submit">Add Product</button>
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Create;
