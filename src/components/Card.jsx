import React from 'react'
import { Link } from 'react-router-dom'

function Card({ item }) {
    return (
        <Link
            to={`/${item.link}`}
            className='flex flex-row w-full h-24 justify-start items-center bg-[#182131] rounded-lg overflow-hidden hover:bg-[#1C8683] duration-200 transition-colors'
        >
            <img
                src={item.image}
                alt={item.title}
                className='w-1/3 h-full object-cover'
            />
            <div className='w-2/3 px-4 font-semibold'>
                {item.title}
            </div>
        </Link>
    )
}

export default Card
