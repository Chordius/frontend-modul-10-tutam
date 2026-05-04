import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/env';
import { getCharacterPortraitUrl } from '../utils/characterPortrait';
import fireIcon from '../assets/fire.png';
import waterIcon from '../assets/water.png';
import windIcon from '../assets/wind.png';
import earthIcon from '../assets/earth.png';
import lightningIcon from '../assets/lightning.png';

const tierMeta = {
    S: { label: 'S', bg: 'bg-[#EF5350]' },
    A: { label: 'A', bg: 'bg-[#FFA967]' },
    B: { label: 'B', bg: 'bg-[#9DF89D]' },
    C: { label: 'C', bg: 'bg-[#76F8F8]' }
};

function TierList() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [elementButton, setElementButton] = useState('');
    const [starButton, setStarButton] = useState(0);

    useEffect(() => {
        const loadCharacters = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/characters/`);

                if (!response.data.success) {
                    throw new Error(response.data.message || 'Failed to fetch characters');
                }

                setCharacters(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (err) {
                setError(err.message || 'Failed to fetch characters');
            } finally {
                setLoading(false);
            }
        };

        loadCharacters();
    }, []);

    const tieredCharacters = useMemo(() => {
        const filtered = characters.filter((character) => {
            const elementCondition = elementButton == 'all' || character.element.toLowerCase().includes(elementButton.toLowerCase())
            const nameCondition = searchTerm == '' || character.name.toLowerCase().includes(searchTerm.toLowerCase())
            const starCondition = starButton == 0 || character.rarity == starButton

            return elementCondition && nameCondition && starCondition
        });

        return filtered.reduce((groups, character) => {
            const tierKey = (character.tier || 'A').toUpperCase();
            if (!groups[tierKey]) {
                groups[tierKey] = [];
            }
            groups[tierKey].push(character);
            return groups;
        }, {});
    }, [characters, searchTerm, elementButton]);

    const renderCharacterCard = (character) => {
        const portraitUrl = getCharacterPortraitUrl(character.name);

        return (
            <div
                key={character._id}
                className='group flex h-24 overflow-hidden rounded-xl border border-white/10 bg-[#2b2e39] transition-transform hover:-translate-y-0.5 hover:border-white/20'
            >
                <div className={
                    character.rarity == 5 ?
                    `relative w-28 shrink-0 overflow-hidden bg-gradient-to-b from-[#fbbf24] to-[#f97316]` : 
                    `relative w-28 shrink-0 overflow-hidden bg-gradient-to-b to-[#a855f7] from-[#06b6d4]`
                }>
                    {portraitUrl ? (
                        <img
                            src={portraitUrl}
                            alt={character.name}
                            className='absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                            style={{ objectPosition: 'center 30%' }}
                        />
                    ) : (
                        <div className='flex h-full items-center justify-center text-3xl text-white/80'>✦</div>
                    )}
                </div>
            </div>
        );
    };

    const elements = ['All', ...new Set(characters.map((character) => character.element).filter(Boolean))];

    return (
        <div className='flex min-h-screen flex-col bg-[#0b1020] text-white'>
            <Navbar />

            <main className='mx-auto w-full max-w-[1600px] flex-1 px-4 pb-10 pt-2 sm:px-6 lg:px-8'>
                <div className='flex flex-col w-full py-4  items-center justify-center'>
                    <h1 className='text-4xl font-black tracking-tight text-white sm:text-5xl'>
                        Pirates: Sea Rail Tier List
                    </h1>
                    <p className='mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base'>
                        A tier list for Pirates: Sea Rail that rates all available characters by their characters by their performance.
                    </p>
                </div>

                <div className='flex items-center justify-center xl:flex-row flex-col w-full gap-4 xl:gap-10'>
                    <input
                        type="text"
                        placeholder="Search characters by name or element..."
                        className='items-center w-full md:w-2/3 px-4 py-2 bg-[#1A2435] text-white rounded border border-[#161E2E] focus:outline-none focus:border-[#00D2EF]'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className='flex gap-10'>
                        <div className='flex items-center border-[#161E2E]'>
                            <button 
                                onClick={() => setElementButton('all')}
                                className=
                                    {elementButton == 'all' ? 'w-12 h-10.5 px-4 py-2 border bg-[#00CEE0] text-white font-black border-[#161E2E]' : 'cursor-pointer w-12 h-10.5 px-4 py-2 border font-black bg-[#1A2435] border-[#161E2E]'}
                            >
                                ✶
                            </button>
                            <button 
                                onClick={() => setElementButton('fire')}
                                className=
                                    {elementButton == 'fire' ? 'px-4 py-2 border bg-[#00CEE0] text-white font-black border-[#161E2E]' : 'cursor-pointer px-4 py-2 border font-black bg-[#1A2435] border-[#161E2E]'}
                            >
                                <img
                                    src={fireIcon}
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button 
                                onClick={() => setElementButton('water')}
                                className=
                                    {elementButton == 'water' ? 'px-4 py-2 border bg-[#00CEE0] text-white font-black border-[#161E2E]' : 'cursor-pointer px-4 py-2 border font-black bg-[#1A2435] border-[#161E2E]'}
                            >
                                <img
                                    src={waterIcon}
                                    width={24}
                                    height={24}
                                />
                            </button>
                            <button 
                                onClick={() => setElementButton('earth')}
                                className=
                                    {elementButton == 'earth' ? 'px-4 py-2 border bg-[#00CEE0] text-white font-black border-[#161E2E]' : 'cursor-pointer px-4 py-2 border font-black bg-[#1A2435] border-[#161E2E]'}
                            >
                                <img
                                    src={earthIcon}
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                        <div className='flex items-center border-[#161E2E]'>
                            <button 
                                onClick={() => setStarButton(0)}
                                className=
                                    {starButton == 0 ? 'w-12 h-10.5 px-4 py-2 border bg-[#00CEE0] text-white font-black border-[#161E2E]' : 'cursor-pointer w-12 h-10.5 px-4 py-2 border font-black bg-[#1A2435] border-[#161E2E]'}
                            >
                                ✶
                            </button>
                            <button 
                                onClick={() => setStarButton(4)}
                                className=
                                    {starButton == 4 ? 'px-4 py-2 border bg-[#00CEE0] text-white font-black border-[#161E2E]' : 'cursor-pointer px-4 py-2 border font-black bg-[#1A2435] border-[#161E2E]'}
                            >
                                4★
                            </button>
                            <button 
                                onClick={() => setStarButton(5)}
                                className=
                                    {starButton == 5 ? 'px-4 py-2 border bg-[#00CEE0] text-white font-black border-[#161E2E]' : 'cursor-pointer px-4 py-2 border font-black bg-[#1A2435] border-[#161E2E]'}
                            >
                                5 ★
                            </button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className='py-16 text-center text-slate-300'>Loading tier list...</div>
                )}

                {error && (
                    <div className='py-16 text-center text-red-400'>Error: {error}</div>
                )}

                {!loading && !error && (
                    <div className='mt-6 space-y-2'>
                        {Object.keys(tierMeta).map((tierKey) => {
                            const tierCharacters = tieredCharacters[tierKey] || [];
                            const meta = tierMeta[tierKey];

                            return (
                                <section key={tierKey} className='flex overflow-hidden border border-white/10 bg-[#151c2d]'>
                                    <div className={`max-w-24 flex flex-col justify-center gap-4 border-b border-white/10 bg-gradient-to-r ${meta.bg} px-5 py-4`}> 
                                        <div className='flex h-12 w-12 items-center justify-center text-4xl font-black text-[#0B1020]'>
                                            {meta.label}
                                        </div>
                                    </div>

                                    <div className='grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
                                        {tierCharacters.length > 0 ? (
                                            tierCharacters.map(renderCharacterCard)
                                        ) : (
                                            <div className='col-span-full py-10 text-center text-slate-400'>No characters match these filters.</div>
                                        )}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default TierList;
