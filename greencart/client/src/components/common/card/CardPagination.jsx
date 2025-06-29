import React, { useState } from 'react'
import "../../styles/landingpage.css"
const CardPagination = ({ data, perPageCount , addToCart}) => {
    const itemPerPage = perPageCount;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data?.length / itemPerPage);
    const startIndex = (currentPage - 1) * itemPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="cardpagination-container">
            <div className="card-container">
                {currentItems.map((d, index) => (
                    <div className="card" key={index}>
                        <img className='card-image' src={d.imageURL} alt={d.name} />
                        <div className="card-content">
                            <p className='card-name'>{d.name}</p>
                            <p className='card-category'>{d.category}</p>
                            <p className='card-price'>{d.price}</p>
                            <button className='card-button' onClick={()=>{addToCart(d)}}>Add to cart</button>
                            {/* <div className="content-button">
                                <button className='card-button'>View</button>
                                <button className='card-button secondary' onClick={()=>{addToCart(d)}}>Add to cart</button>
                            </div> */}
                        </div>
                    </div>
                ))}

            </div>
            <div className="card-button-container">
                <button onClick={goToPrevPage} className='pagination-button' disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} className='pagination-button' disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    )
}

export default CardPagination
