import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CharacterCard({ character }) {
    const [imageError, setImageError] = useState(false);
    const name = character.name.toLowerCase().replace(/\s+/g, '_');
    const imgSrc = `/src/assets/portrait_${name}.png`;

    const elementColorMap = {
        Fire: 'bg-red-700',
        Water: 'bg-blue-700',
        Wind: 'bg-green-700',
        Earth: 'bg-amber-700',
        Lightning: 'bg-violet-700'
    };

    return (
        <Link to={`/character/${character._id}`}>
            <div className='bg-cyan-950 rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-64 flex flex-col'>
                {/* Character Image Placeholder */}
                <div className='relative w-full h-40 bg-gradient-to-b from-purple-600 to-cyan-900 flex items-center justify-center overflow-hidden'>
                    {!imageError ? (
                        <img
                            src={imgSrc}
                            alt={character.name}
                            className='absolute inset-0 m-auto h-36 object-contain z-10'
                            width={450}
                            height={450}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className='text-4xl text-white/80'>✦</div>
                    )}
                </div>
                
                {/* Character Info */}
                <div className='p-4 flex flex-col gap-2 flex-grow'>
                    <h3 className='font-bold text-lg truncate'>{character.name}</h3>
                    
                    <div className='flex gap-2 text-sm'>
                        <span className={`${elementColorMap[character.element] || 'bg-blue-700'} px-2 py-1 rounded`}>{character.element}</span>
                        <span className='bg-yellow-700 px-2 py-1 rounded'>
                            ★ {character.rarity}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CharacterCard
