import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CharacterCard({ character }) {
    const [imageError, setImageError] = useState(false);
    const name = character.name.toLowerCase().replace(/\s+/g, '_');
    const imgSrc = `/src/assets/portrait_${name}.png`;

    const elementColorMap = {
        Fire: 'bg-[#dc5151]',
        Water: 'bg-[#82abcd]',
        Wind: 'bg-[#82cd98]',
        Earth: 'bg-[#8B572A]',
        Lightning: 'bg-[#aa61b7]'
    };

    const rarityGradientMap = {
        5: 'from-[#fbbf24] to-[#f97316] bg-gradient-to-b',
        4: 'from-[#a855f7] to-[#06b6d4] bg-gradient-to-b',
    };

    return (
        <Link to={`/character/${character._id}`}>
            <div className='bg-cyan-950 w-48 rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-64 flex flex-col'>
                {/* Character Image Placeholder */}
                <div 
                    className={`relative w-full h-40 flex items-center justify-center overflow-hidden ${rarityGradientMap[character.rarity] || rarityGradientMap[4]}`}
                >
                    {!imageError ? (
                        <img
                            src={imgSrc}
                            alt={character.name}
                            className='absolute inset-0 w-full h-full object-cover z-10'
                            style={{objectPosition: 'center 30%'}}
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
                        <span className={`${elementColorMap[character.element]} || 'bg-blue-700'} px-2 py-1 rounded`}>{character.element}</span>
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
