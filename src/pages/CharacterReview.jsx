import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/env';
import { getCharacterPortraitUrl } from '../utils/characterPortrait';

function CharacterReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imageError, setImageError] = useState(false);

    const getCharacterImage = () => {
        if (!character) return '';
        return getCharacterPortraitUrl(character.name);
    };
    
    const elementIconColorMap = {
        Fire: 'dc5151',
        Water: '#82abcd',
        Wind: '#6EAD80',
        Earth: '#8B572A',
        Lightning: '#aa61b7'
    };

    const elementCardColorMap = {
        Fire: { bg: 'bg-[#dc5151]', gradient: 'from-[#5a1f1f]', border: 'border-[#a84545]', text: 'text-[#ff9999]' },
        Water: { bg: 'bg-[#82abcd]', gradient: 'from-[#1a3a52]', border: 'border-[#4a7a9e]', text: 'text-[#6eb3e8]' },
        Wind: { bg: 'bg-[#6EAD80]', gradient: 'from-[#29665C]', border: 'border-[#458a5f]', text: 'text-[#7fd9a1]' },
        Earth: { bg: 'bg-[#8B572A]', gradient: 'from-[#4a3420]', border: 'border-[#9a6b3f]', text: 'text-[#d4a574]' },
        Lightning: { bg: 'bg-[#aa61b7]', gradient: 'from-[#3a1a4a]', border: 'border-[#8a5a9a]', text: 'text-[#d4a1ff]' }
    };

    const rarityGradientMap = {
        5: 'from-[#fbbf24] to-[#f97316] bg-gradient-to-b',
        4: 'from-[#a855f7] to-[#06b6d4] bg-gradient-to-b',
    };
    
    useEffect(() => {
        const loadCharacter = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/characters/${id}`);

                if (!response.data.success) {
                    throw new Error(response.data.message || 'Failed to fetch character');
                }

                setCharacter(response.data.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch character');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadCharacter();
        }
    }, [id]);

    if (loading) {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <div className='flex-grow flex items-center justify-center'>
                    <div>Loading character...</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <div className='flex-grow flex flex-col items-center justify-center gap-4'>
                    <div className='text-red-400'>Error: {error}</div>
                    <button 
                        onClick={() => navigate('/characters')}
                        className='bg-cyan-700 hover:bg-cyan-600 px-6 py-2 rounded'
                    >
                        Back to Characters
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    if (!character) {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <div className='flex-grow flex flex-col items-center justify-center gap-4'>
                    <div>Character not found</div>
                    <button 
                        onClick={() => navigate('/characters')}
                        className='bg-cyan-700 hover:bg-cyan-600 px-6 py-2 rounded'
                    >
                        Back to Characters
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            
            {/* Contents */}
            <div className='flex flex-col w-full px-10 py-8'>
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/characters')}
                    className='text-cyan-400 hover:text-cyan-300 mb-6 flex items-center gap-2'
                >
                    ← Back to Characters
                </button>

                {/* Character Header */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-6'>
                    {/* Character Image/Visual */}
                    <div className='flex items-center justify-center'>
                        <div 
                            className={`relative rounded-lg w-full h-80 flex items-center justify-center overflow-hidden ${rarityGradientMap[character.rarity] || rarityGradientMap[4]}`}
                        >
                            {!imageError ? (
                                <img
                                    src={getCharacterImage()}
                                    alt={character.name}
                                    className='absolute w-fit h-fit object-cover z-10'
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className='text-6xl text-white/80 z-10'>✦</div>
                            )}
                        </div>
                    </div>

                    {/* Character Info */}
                    <div className='md:col-span-2 flex flex-col gap-6'>
                        {/* Name and Stats */}
                        <div>
                            <h1 className='text-4xl font-bold mb-4'>{character.name}</h1>
                            
                            <div className='flex gap-3 mb-6 flex-wrap'>
                            <div 
                                className={`px-4 py-2 rounded-lg ${elementCardColorMap[character.element].bg}`}
                            >
                                <div className='text-xs opacity-75'>Element</div>
                                <div className='font-bold text-lg'>{character.element}</div>
                            </div>
                            <div 
                                className={`px-4 py-2 rounded-lg bg-gradient-to-r from-5% to-95% to-[#1a3a52] ${elementCardColorMap[character.element]?.bg || 'bg-[#1a3a52]'}`}
                            >
                                <div className='text-xs opacity-75'>Rarity</div>
                                <div className='font-bold text-lg'>{'★ '.repeat(character.rarity)}</div>
                            </div>
                            </div>
                        </div>

                        {/* Character Description from Forum */}
                        {character.page && (
                            <div className='p-6'>
                                <h2 className='text-xl font-bold mb-4 flex flex-row gap-x-2'>
                                    <i
                                        className="fa-solid fa-square pt-1"
                                        style={{color: elementIconColorMap[character.element] || '#1d4ed8'}}
                                    ></i>
                                    INTRODUCTION
                                </h2>
                                <hr className='py-2'/>
                                <p className='text-gray-300 leading-relaxed'>
                                    {character.page.introduction}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className='mb-6'>
                    <div className='text-xl font-bold py-2 flex flex-row gap-x-2'>
                        <i 
                            className="fa-solid fa-square pt-1"
                            style={{color: elementIconColorMap[character.element] || '#1d4ed8'}}
                        ></i>
                        SKILLS
                    </div>
                    <hr className='py-3'/>
                    {character.skills && character.skills.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {character.skills.map((skill, index) => (
                                <div key={index} className='grid grid-rows-4 grid-cols-1'>
                                    <div className='row-span-1 min-h-16 grid grid-cols-3 grid-rows-1 gap-x-3 bg-[#1A2435] border-l-2 border-r-2 border-t-2 border-[#263246]'>
                                        <div className={`p-4 flex flex-col justify-center items-center col-span-1 ${elementCardColorMap[character.element].bg}`}>
                                            {skill.skill_type}
                                        </div>
                                        <h3
                                            className={`flex flex-col justify-center items-start text-lg font-bold ${elementCardColorMap[character.element]?.text || 'text-[#6eb3e8]'} col-span-2`}
                                        >
                                            <label>{skill.skill_name}</label>
                                            <label className='font-normal text-base text-gray-300'>{skill.skill_target}</label>
                                        </h3>
                                    </div>
                                    <div className={`row-span-4 bg-gradient-to-b bg-[#1A2435] p-4 border rounded rounded-t-none transition hover:opacity-80 ${elementCardColorMap[character.element]?.gradient || 'bg-[#1a3a52]'} ${elementCardColorMap[character.element]?.border || 'border-[#4a7a9e]'}`}>
                                        <p className='text-gray-300'>{skill.skill_detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-gray-400'>No skills available</div>
                    )}
                </div>
                <div className='mb-6'>
                    <div className='text-2xl font-bold py-2 flex flex-row gap-x-2'>
                        <i 
                            className="fa-solid fa-square pt-1" 
                            style={{color: elementIconColorMap[character.element] || '#1d4ed8'}}
                        ></i>
                        REVIEW ({character.page?.author?.username || 'Unknown'})
                    </div>
                    <hr className='py-3'/>
                    {character.page && (
                        <div 
                            className= "bg-[#1A2435] p-6 border-2 border-[#263246]"
                        >
                            <p className='text-gray-300 leading-relaxed whitespace-pre-wrap'>
                                {character.page.content}
                            </p>
                            <div className='text-xs text-gray-500 mt-4'>
                                Last updated: {new Date(character.page.updatedAt).toLocaleDateString()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer/>
        </div>
    );
}

export default CharacterReview;
