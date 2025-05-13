import React, { useEffect, useState } from 'react';
import ProductList from './Components/ProductList';
import './App.css';
import axios from 'axios';

// Use environment variable or default to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:50010';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        axios.get(`${API_URL}/api/products`)
            .then(result => {
                setProducts(result.data);
                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(result.data.map(product => product.category))];
                setCategories(uniqueCategories);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    const filteredProducts = selectedCategory === 'All' 
        ? products 
        : products.filter(product => product.category === selectedCategory);

    return (
        <main className="e-commerce-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Our Shop</h1>
                    <p>Discover amazing products at great prices</p>
                </div>
            </section>

            <section className="category-filter">
                <h2>Categories</h2>
                <div className="category-buttons">
                    {categories.map(category => (
                        <button 
                            key={category} 
                            className={selectedCategory === category ? 'active' : ''}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {loading ? (
                <div className="loading">Loading products...</div>
            ) : (
                <ProductList products={filteredProducts} />
            )}
        </main>
    );
};

export default Home;
