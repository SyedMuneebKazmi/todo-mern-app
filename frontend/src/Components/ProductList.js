import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    if (products.length === 0) {
        return <div className="no-products">No products found</div>;
    }

    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductList; 