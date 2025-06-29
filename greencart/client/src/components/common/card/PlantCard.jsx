import React from 'react'
import "../card.css"
const PlantCard = ({data, addToCart}) => {
    
    return (
        <div className="card-container">
            {data.map((d, index) => (
                <div className="card" key={index}>
                    <img className='card-image' src={d.imageURL} alt={d.name} />
                    <div className="card-content">
                        <p className='card-name'>{d.name}</p>
                        <p className='card-category'>{d.category}</p>
                        <p className='card-price'>{d.price}</p>
                        <button className='card-button' onClick={()=>{addToCart(d)}}>Add to cart</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PlantCard
