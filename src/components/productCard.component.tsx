
// productCard.component.tsx
import React from 'react'
import IProductCard from '../interfaces/productCard.interface'

const ProductCard: React.FC<IProductCard> = ({ image, name, price, onClick}) => {
    //const imagePath = `../src/assets/img/${image}`; // Asegúrate de que 'image' contenga solo el nombre del archivo
    // console.log(`imagePath: ${imagePath}`)
    return (
        <div className = 'product-card' onClick={onClick}>
            <img src={image} alt={name} className="product-image"/>
            <div className='product-details'>
                <h3 className='product-name'>{name}</h3>
                <p className='product-price'>${price}.00</p>
            </div>
        </div>
    )
}

export default ProductCard