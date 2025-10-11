import React, { useState } from 'react'
import "./Home.css"
import { Header } from '../../componemts/Header/Header';
import ExploreMenu from '../../componemts/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../componemts/FoodDisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
        <Header />
        <ExploreMenu category= {category} setCategory={setCategory} />
        <FoodDisplay category= {category}/>
    </div>
  );
}

export default Home