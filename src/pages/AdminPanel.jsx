import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../config/env';

function Admin() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['isLoggedIn', 'userId', 'email']);
    const [activeTab, setActiveTab] = useState('forum');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Forum form states
    const [forumTitle, setForumTitle] = useState('');
    const [forumIntroduction, setForumIntroduction] = useState('');
    const [forumContent, setForumContent] = useState('');
    const [forumAuthor, setForumAuthor] = useState('');

    // Character form states
    const [charName, setCharName] = useState('');
    const [charElement, setCharElement] = useState('');
    const [charRarity, setCharRarity] = useState(4);
    const [charPage, setCharPage] = useState('');
    const [charSkills, setCharSkills] = useState([{ skill_name: '', skill_detail: '' }]);

    // Lists
    const [forums, setForums] = useState([]);
    const [characters, setCharacters] = useState([]);

    // Redirect if not logged in
    useEffect(() => {
        if (!cookies.isLoggedIn) {
            navigate('/login');
        } else if (cookies.userId && !forumAuthor) {
            // Auto-fill author field with logged-in user ID
            setForumAuthor(cookies.userId);
        }
    }, [cookies.isLoggedIn, cookies.userId, navigate]);

    // Load forums and characters
    useEffect(() => {
        const loadData = async () => {
            try {
                const [forumsRes, charsRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/forums/`),
                    axios.get(`${API_BASE_URL}/characters/`)
                ]);

                let forumsArray = [];
                const forumsData = forumsRes.data;
                if (Array.isArray(forumsData)) {
                    forumsArray = forumsData;
                } else if (forumsData && Array.isArray(forumsData.data)) {
                    forumsArray = forumsData.data;
                } else if (forumsData && Array.isArray(forumsData.search)) {
                    forumsArray = forumsData.search;
                } else {
                    console.warn('Unexpected forums response:', forumsData);
                }
                setForums(forumsArray);

                const charsData = charsRes.data;
                setCharacters(Array.isArray(charsData.data) ? charsData.data : []);
            } catch (err) {
                console.error('Failed to load data:', err);
            }
        };

        loadData();
    }, []);

    const handleCreateForum = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await axios.post(`${API_BASE_URL}/forums/create`, {
                title: forumTitle,
                introduction: forumIntroduction,
                content: forumContent,
                author: forumAuthor
            });

            setMessage('Forum created successfully!');
            setForumTitle('');
            setForumIntroduction('');
            setForumContent('');
            setForumAuthor('');

            // Reload forums
            const forumsRes = await axios.get(`${API_BASE_URL}/forums/`);
            let forumsArray = [];
            const forumsData = forumsRes.data;
            if (Array.isArray(forumsData)) {
                forumsArray = forumsData;
            } else if (forumsData && Array.isArray(forumsData.data)) {
                forumsArray = forumsData.data;
            } else if (forumsData && Array.isArray(forumsData.search)) {
                forumsArray = forumsData.search;
            } else {
                console.warn('Unexpected forums response:', forumsData);
            }
            setForums(forumsArray);
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCharacter = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await axios.post(`${API_BASE_URL}/characters/create`, {
                name: charName,
                element: charElement,
                rarity: parseInt(charRarity),
                page: charPage,
                skills: charSkills.filter(s => s.skill_name && s.skill_detail)
            });

            setMessage('Character created successfully!');
            setCharName('');
            setCharElement('');
            setCharRarity(4);
            setCharSkills([{ skill_name: '', skill_detail: '' }]);
            setCharPage('');

            // Reload characters
            const charsRes = await axios.get(`${API_BASE_URL}/characters/`);
            const charsData = charsRes.data;
            setCharacters(Array.isArray(charsData.data) ? charsData.data : []);
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCharacter = async (charId) => {
        if (!window.confirm('Are you sure you want to delete this character?')) {
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/characters/${charId}`);

            setMessage('Character deleted successfully!');

            // Reload characters
            const charsRes = await axios.get(`${API_BASE_URL}/characters/`);
            const charsData = charsRes.data;
            setCharacters(Array.isArray(charsData.data) ? charsData.data : []);
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        }
    };

    const handleSkillChange = (index, field, value, isCharacter = false) => {
        if (isCharacter) {
            const newSkills = [...charSkills];
            newSkills[index][field] = value;
            setCharSkills(newSkills);
        }
    };

    const addSkill = (isCharacter = false) => {
        if (isCharacter) {
            setCharSkills([...charSkills, { skill_name: '', skill_detail: '' }]);
        }
    };

    const removeSkill = (index, isCharacter = false) => {
        if (isCharacter) {
            setCharSkills(charSkills.filter((_, i) => i !== index));
        }
    };

    const elements = [
        'Fire', 
        'Water', 
        'Wind', 
        'Earth', 
        'Lightning',
    ];

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />

            <div className='flex flex-col w-full px-10 py-8'>
                {/* Header */}
                <div className='flex flex-col text-center gap-y-2 mb-8'>
                    <div className='text-3xl font-bold'>
                        Admin Panel
                    </div>
                    <div>
                        Create and manage forums and characters for the database
                    </div>
                    {cookies.email && (
                        <div className='text-sm text-gray-400'>
                            Logged in as: <span className='text-cyan-400 font-semibold'>{cookies.email}</span>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className='flex gap-4 mb-8 border-b border-cyan-700'>
                    <button
                        onClick={() => setActiveTab('forum')}
                        className={`px-6 py-3 font-semibold transition ${
                            activeTab === 'forum'
                                ? 'border-b-2 border-cyan-400 text-cyan-400'
                                : 'text-gray-400 hover:text-cyan-300'
                        }`}
                    >
                        Create Forum
                    </button>
                    <button
                        onClick={() => setActiveTab('character')}
                        className={`px-6 py-3 font-semibold transition ${
                            activeTab === 'character'
                                ? 'border-b-2 border-cyan-400 text-cyan-400'
                                : 'text-gray-400 hover:text-cyan-300'
                        }`}
                    >
                        Create Character
                    </button>
                </div>

                {/* Status Message */}
                {message && (
                    <div className={`mb-6 p-4 rounded ${message.startsWith('✓') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {message}
                    </div>
                )}

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Form Section */}
                    <div className='lg:col-span-2'>
                        {activeTab === 'forum' ? (
                            <form onSubmit={handleCreateForum} className='bg-cyan-950 p-6 rounded-lg border border-cyan-800'>
                                <h2 className='text-xl font-bold mb-6'>Forum Details</h2>

                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-sm font-semibold mb-2'>Forum Title/ID *</label>
                                        <input
                                            type="text"
                                            value={forumTitle}
                                            onChange={(e) => setForumTitle(e.target.value)}
                                            placeholder="e.g., Sailor Review"
                                            required
                                            className='w-full px-4 py-2 bg-cyan-900 border border-cyan-700 rounded focus:outline-none focus:border-cyan-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-semibold mb-2'>Author ID * (Auto-filled)</label>
                                        <input
                                            type="text"
                                            value={forumAuthor}
                                            onChange={(e) => setForumAuthor(e.target.value)}
                                            placeholder="MongoDB User ID"
                                            required
                                            className='w-full px-4 py-2 bg-cyan-800 border border-cyan-700 rounded focus:outline-none focus:border-cyan-500'
                                            title="Your user ID (auto-filled from login)"
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-semibold mb-2'>Introduction *</label>
                                        <textarea
                                            value={forumIntroduction}
                                            onChange={(e) => setForumIntroduction(e.target.value)}
                                            placeholder="Write a short introduction paragraph..."
                                            required
                                            rows="3"
                                            className='w-full px-4 py-2 bg-cyan-900 border border-cyan-700 rounded focus:outline-none focus:border-cyan-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-semibold mb-2'>Review Content *</label>
                                        <textarea
                                            value={forumContent}
                                            onChange={(e) => setForumContent(e.target.value)}
                                            placeholder="Write the full review here..."
                                            required
                                            rows="6"
                                            className='w-full px-4 py-2 bg-cyan-900 border border-cyan-700 rounded focus:outline-none focus:border-cyan-500'
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className='w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 py-2 rounded font-semibold transition'
                                    >
                                        {loading ? 'Creating...' : 'Create Forum'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleCreateCharacter} className='bg-cyan-950 p-6 rounded-lg border border-cyan-800'>
                                <h2 className='text-xl font-bold mb-6'>Character Details</h2>

                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-sm font-semibold mb-2'>Character Name *</label>
                                        <input
                                            type="text"
                                            value={charName}
                                            onChange={(e) => setCharName(e.target.value)}
                                            placeholder="e.g., Sailor"
                                            required
                                            className='w-full px-4 py-2 bg-cyan-900 border border-cyan-700 rounded focus:outline-none focus:border-cyan-500'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-semibold mb-2'>Element *</label>
                                        <select
                                            value={charElement}
                                            onChange={(e) => setCharElement(e.target.value)}
                                            required
                                            className='w-full px-4 py-2 bg-cyan-900 border border-cyan-700 rounded focus:outline-none focus:border-cyan-500'
                                        >
                                            <option value="">Select an element</option>
                                            {elements.map(el => (
                                                <option key={el} value={el}>{el}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className='block text-sm font-semibold mb-2'>Rarity (4-5) *</label>
                                        <select
                                            value={charRarity}
                                            onChange={(e) => setCharRarity(e.target.value)}
                                            required
                                            className='w-full px-4 py-2 bg-cyan-900 border border-cyan-700 rounded focus:outline-none focus:border-cyan-500'
                                        >
                                            <option value={4}>Rare</option>
                                            <option value={5}>Super Rare</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className='block text-sm font-semibold mb-2'>Forum Page ID *</label>
                                        <select
                                            value={charPage}
                                            onChange={(e) => setCharPage(e.target.value)}
                                            required
                                            className='w-full px-4 py-2 bg-cyan-900 border border-cyan-700 rounded focus:outline-none focus:border-cyan-500'
                                        >
                                            <option value="">Select a forum</option>
                                            {forums.map(forum => (
                                                <option key={forum._id} value={forum._id}>
                                                    {forum.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <div className='flex justify-between items-center mb-2'>
                                            <label className='block text-sm font-semibold'>Skills *</label>
                                            <button
                                                type="button"
                                                onClick={() => addSkill(true)}
                                                className='text-xs bg-cyan-700 hover:bg-cyan-600 px-2 py-1 rounded'
                                            >
                                                + Add Skill
                                            </button>
                                        </div>
                                        <div className='space-y-2'>
                                            {charSkills.map((skill, index) => (
                                                <div key={index} className='flex gap-2'>
                                                    <input
                                                        type="text"
                                                        value={skill.skill_name}
                                                        onChange={(e) => handleSkillChange(index, 'skill_name', e.target.value, true)}
                                                        placeholder="Skill name"
                                                        className='flex-1 px-3 py-1 bg-cyan-900 border border-cyan-700 rounded text-sm focus:outline-none focus:border-cyan-500'
                                                    />
                                                    <input
                                                        type="text"
                                                        value={skill.skill_detail}
                                                        onChange={(e) => handleSkillChange(index, 'skill_detail', e.target.value, true)}
                                                        placeholder="Skill detail"
                                                        className='flex-1 px-3 py-1 bg-cyan-900 border border-cyan-700 rounded text-sm focus:outline-none focus:border-cyan-500'
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSkill(index, true)}
                                                        className='text-xs bg-red-700 hover:bg-red-600 px-2 py-1 rounded'
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className='w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 py-2 rounded font-semibold transition'
                                    >
                                        {loading ? 'Creating...' : 'Create Character'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* List Section */}
                    <div className='lg:col-span-1'>
                        {activeTab === 'forum' ? (
                            <div className='bg-cyan-950 p-6 rounded-lg border border-cyan-800'>
                                <h2 className='text-xl font-bold mb-6'>Existing Forums ({forums.length})</h2>
                                <div className='space-y-3 max-h-96 overflow-y-auto'>
                                    {forums.length > 0 ? (
                                        forums.map(forum => (
                                            <div key={forum._id} className='bg-cyan-900 p-4 rounded border border-cyan-700'>
                                                <h3 className='font-bold'>{forum.title}</h3>
                                                <p className='text-sm text-gray-400 mt-2 line-clamp-2'>{forum.content}</p>
                                                <div className='text-xs text-gray-500 mt-2'>
                                                    ID: {forum._id}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='text-gray-400'>No forums created yet</div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className='bg-cyan-950 p-6 rounded-lg border border-cyan-800'>
                                <h2 className='text-xl font-bold mb-6'>⚔️ Existing Characters ({characters.length})</h2>
                                <div className='space-y-3 max-h-96 overflow-y-auto'>
                                    {characters.length > 0 ? (
                                        characters.map(char => (
                                            <div key={char._id} className='bg-cyan-900 p-4 rounded border border-cyan-700 flex justify-between items-start gap-4'>
                                                <div className='flex-1'>
                                                    <h3 className='font-bold'>{char.name}</h3>
                                                    <div className='flex gap-2 mt-2'>
                                                        <span className='text-xs bg-blue-700 px-2 py-1 rounded'>{char.element}</span>
                                                        <span className='text-xs bg-yellow-700 px-2 py-1 rounded'>{'★'.repeat(char.rarity)}</span>
                                                    </div>
                                                    <div className='text-xs text-gray-500 mt-2'>
                                                        Forum: {char.page?.title || 'N/A'}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteCharacter(char._id)}
                                                    className='bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-sm font-semibold'
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='text-gray-400'>No characters created yet</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Admin;
