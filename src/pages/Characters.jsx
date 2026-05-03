import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CharacterCard from '../components/CharacterCard';
import { API_BASE_URL } from '../config/env';

function Characters() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadCharacters = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/characters/`);
                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.message || 'Failed to fetch characters');
                }

                setCharacters(Array.isArray(data.data) ? data.data : []);
            } catch (err) {
                setError(err.message || 'Failed to fetch characters');
            } finally {
                setLoading(false);
            }
        };

        loadCharacters();
    }, []);

    const filteredCharacters = characters.filter(char => 
        char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.element.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            
            {/* Contents */}
            <div className='flex flex-col w-full px-10 py-8'>
                {/* Title */}
                <div className='flex flex-col text-center gap-y-2 mb-8'>
                    <div className='text-3xl font-bold'>
                        Characters Database
                    </div>
                    <div>
                        Browse all available characters in Pirates: Sea Rail. Click on a character to view detailed information and reviews.
                    </div>
                </div>

                {/* Search Bar */}
                <div className='mb-6'>
                    <input
                        type="text"
                        placeholder="Search characters by name or element..."
                        className='w-full px-4 py-2 bg-cyan-900 text-white rounded border border-cyan-700 focus:outline-none focus:border-cyan-500'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Loading State */}
                {loading && (
                    <div className='text-center py-12'>
                        <div>Loading characters...</div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className='text-center py-12 text-red-400'>
                        <div>Error: {error}</div>
                    </div>
                )}

                {/* Characters Grid */}
                {!loading && !error && (
                    <div>
                        {filteredCharacters.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                {filteredCharacters.map((character) => (
                                    <CharacterCard key={character._id} character={character} />
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-12'>
                                <div>No characters found</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <Footer/>
        </div>
    );
}

export default Characters;
