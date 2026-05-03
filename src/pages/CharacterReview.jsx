import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/env';

function CharacterReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imageError, setImageError] = useState(false);

    const getCharacterImage = () => {
        if (!character) return '';
        const name = character.name.toLowerCase().replace(/\s+/g, '_');
        return `/src/assets/portrait_${name}.png`;
    };

    const elementColorMap = {
        Fire: 'bg-red-700',
        Water: 'bg-blue-700',
        Wind: 'bg-green-700',
        Earth: 'bg-amber-700',
        Lightning: 'bg-violet-700'
    };

    useEffect(() => {
        const loadCharacter = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/characters/${id}`);
                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.message || 'Failed to fetch character');
                }

                setCharacter(data.data);
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
                        <div className='relative bg-gradient-to-b from-purple-600 to-cyan-900 rounded-lg w-full h-80 flex items-center justify-center overflow-hidden'>
                            {!imageError ? (
                                <img
                                    src={getCharacterImage()}
                                    alt={character.name}
                                    className='absolute inset-0 m-auto h-72 object-contain z-10'
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
                                {/* TODO: Change this bg-blue-700 to be dynamic depending on the element of the character */}
                                <div className={`${elementColorMap[character.element] || 'bg-blue-700'} px-4 py-2 rounded-lg`}>
                                    <div className='text-xs opacity-75'>Element</div>
                                    <div className='font-bold text-lg'>{character.element}</div>
                                </div>
                                <div className='bg-yellow-700 px-4 py-2 rounded-lg'>
                                    <div className='text-xs opacity-75'>Rarity</div>
                                    <div className='font-bold text-lg'>{'★ '.repeat(character.rarity)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Character Description from Forum */}
                        {character.page && (
                            <div className='p-6'>
                                <h2 className='text-xl font-bold mb-4'>🟦 INTRODUCTION</h2>
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
                    <div className='text-xl font-bold py-2'>
                    🟦 SKILLS
                    </div>
                    <hr className='py-3'/>
                    {character.skills && character.skills.length > 0 ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {character.skills.map((skill, index) => (
                                <div key={index} className='bg-cyan-950 p-4 rounded border border-cyan-700 hover:border-cyan-600 transition'>
                                    <h3 className='text-lg font-bold mb-2 text-cyan-400'>{skill.skill_name}</h3>
                                    <p className='text-gray-300'>{skill.skill_detail}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-gray-400'>No skills available</div>
                    )}
                </div>
                <div className='mb-6'>
                    <div className='text-2xl font-bold py-2'>
                    🟦 REVIEW ({character.page?.author?.username || 'Unknown'})
                    </div>
                    <hr className='py-3'/>
                    {character.page && (
                        <div className='bg-cyan-950 p-6 rounded border border-cyan-800'>
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
