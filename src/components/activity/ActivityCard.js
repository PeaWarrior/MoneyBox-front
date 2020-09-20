import React from 'react';

export default function ActivityCard ({ id, category, price, shares, date }) {
    
    return (
        <div className="box" >
            <div>
                {category}
            </div>
            <div>
                {price}
            </div>
            <div>
                {shares}
            </div>
            <div>
                {date}
            </div>
        </div>
    )
}