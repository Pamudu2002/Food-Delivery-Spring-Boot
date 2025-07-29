import React, {useState} from 'react'
import FoodDisplay from '../components/FoodDisplay'
import ExploreMenu from '../components/ExploreMenu'

function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')



  

  return (
    <div>
      <ExploreMenu searchTerm={searchTerm} setSearchTerm={setSearchTerm} category={category} setCategory={setCategory} />
      <FoodDisplay searchTerm={searchTerm} category={category} />
    </div>
  )
}

export default ExplorePage