import React from 'react'

function Card({ item }) {
    return (
        <div>
            <a href={`/${item.link}`} className='flex flex-row w-full h-24 justify-start items-center bg-cyan-950'>
                <img src={`./${item.image}`} className='w-1/3'/>
                <div className='w-2/3'>
                    {item.title}
                </div>
            </a>
        </div>
    )
}

export default Card
