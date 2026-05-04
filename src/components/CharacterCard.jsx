import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCharacterPortraitUrl } from '../utils/characterPortrait';
import fireIcon from '../assets/fire.png';
import waterIcon from '../assets/water.png';
import windIcon from '../assets/wind.png';
import earthIcon from '../assets/earth.png';
import lightningIcon from '../assets/lightning.png';

function CharacterCard({ character }) {
    const [imageError, setImageError] = useState(false);
    const imgSrc = getCharacterPortraitUrl(character.name);

    const elementIconMap = {
        Fire: fireIcon,
        Water: waterIcon,
        Wind: windIcon,
        Earth: earthIcon,
        Lightning: lightningIcon
    };

    const elementColorMap = {
        Fire: 'bg-[#dc5151]',
        Water: 'bg-[#82abcd]',
        Wind: 'bg-[#82cd98]',
        Earth: 'bg-[#8B572A]',
        Lightning: 'bg-[#aa61b7]'
    };

    const rarityGradientMap = {
        5: 'to-[#FA7817] from-[#FBBD23] bg-gradient-to-b',
        4: 'to-[#a855f7] from-[#06b6d4] bg-gradient-to-b',
    };

    return (
        <Link to={`/character/${character._id}`}>
            <div className={`w-48 rounded-lg border-4 border-[#263346] hover:border-[#00D2EF] overflow-hidden hover:shadow-lg hover:scale-105 transition-transform cursor-pointer h-64 flex flex-col ${rarityGradientMap[character.rarity] || rarityGradientMap[4]}`}>
                {/* Character Image Placeholder */}
                <div className={`relative w-full h-64 flex items-center justify-center overflow-hidden `}>
                        {elementIconMap[character.element] && (
                            <div className='pointer-events-none absolute left-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm ring-1 ring-white/15'>
                                <img
                                    src={elementIconMap[character.element]}
                                    alt={character.element}
                                    className='h-8 w-8 object-contain'
                                />
                            </div>
                        )}
                        {!imageError && imgSrc ? (
                            <img
                                src={imgSrc}
                                alt={character.name}
                                className='absolute inset-x-0 -inset-y-3 z-10 h-full w-full object-cover scale-110 mask-b-from-80%'
                                width={450}
                                height={450}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className='text-4xl text-white/80'>✦</div>
                        )}

                    {/* Character Info */}
                    <div className='pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 flex flex-col gap-2 flex-grow'>
                        <h3 className='font-bold text-lg truncate text-center text-shadow-lg text-shadow-black pt-48'>{character.name}</h3>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default CharacterCard
