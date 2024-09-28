
// productCard.component.tsx
import React from 'react'
import ProductCardProps from '../interfaces/productCard.interface'

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price}) => {
    return (
        <div className = 'product-card'>
            <img src={image} alt={name} className="product-image"/>
            <div className='product-details'>
                <h3 className='product-name'>{name}</h3>
                <p className='product-price'>{price}</p>
            </div>
        </div>
    )
}

export default ProductCard