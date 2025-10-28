import React from 'react'
import "./Add.css"
import {assets} from "../../assets/assets"

const Add = () => {
  return (
    <div className=''>
      <form className='flex-col'>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlfor="image">
            <img src={assets.upload_area} alt="" />
          </label>
          <input type="file" id="image" hidden required/>
        </div>

        <div class="add-product-name flex-col">
            <p>Product Name</p>
            <input type="text" name='name' placeholder='Type here' />
        </div>

        <div class="add-product-description flex-col">
            <p>Product Description</p>
            <textarea name="description" rows="6" placeholder='Write content here'></textarea>
        </div>

        <div class="add-category-price">
          <div class="add-categiry flex-col"> 
            <p>Product Category</p>
            <select name="categoyr">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Paste">Paste</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div class="add-price flex-col">
              <p>Product price</p>
              <input type="Number" name='price' placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add