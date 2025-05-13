import React from 'react';
import { BsCart, BsStar, BsStarFill } from 'react-icons/bs';

const ProductCard = ({ product }) => {
    // Format currency
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
                {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-category">{product.category}</div>
                <p className="product-description">{product.description}</p>
                <div className="product-price-row">
                    <span className="product-price">{formatPrice(product.price)}</span>
                    <button 
                        className="add-to-cart" 
                        disabled={!product.inStock}
                        title={product.inStock ? "Add to Cart" : "Out of Stock"}
                    >
                        <BsCart />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 