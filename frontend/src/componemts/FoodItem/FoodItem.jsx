import React from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'

const FoodItem = ({id, name, price, description, image}) => {
  return (
    <div className='food-item'>
        <div class="food-item-img-container">
            <img src={image} alt="" class="food-item-image" />
        </div>
        
        <div class="food-item-info">
            <div class="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>

            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem