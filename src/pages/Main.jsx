import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { API_BASE_URL } from '../config/env';

function Main() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const card = [
        {
            id: 1,
            title: "Introduction to the game",
            image: "https://picsum.photos/500",
            link: "/"
        },
        {
            id: 2,
            title: "Characters",
            image: "https://picsum.photos/500",
            link: "characters"
        },
        {
            id: 3,
            title: "Tier List",
            image: "https://picsum.photos/500",
            link: "/"
        }
    ]

    useEffect(() => {
        const loadItems = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/items`);
                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.message || 'Failed to fetch items');
                }

                setItems(Array.isArray(data.payload) ? data.payload : []);
            } catch (err) {
                setError(err.message || 'Failed to fetch items');
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            
            {/* Contents */}
            <div className='flex flex-col w-full px-10'>
                {/* Title */}

                <div className='flex flex-col text-center gap-y-2'>
                    <div className='text-2xl font-bold'>
                        PirateWiki - Pirates: Sea Rail wiki and database
                    </div>
                    <div>
                        PiratesWiki is a wiki and database for Pirates: Sea Rail, an OOP Turn-Based RPG Project. Check out our guides, character reviews, tier list, and more!
                    </div>
                </div>

                <div className='py-5'/>

                <div className='flex flex-col'>
                    <div className='font-bold'>
                        🟦 SHORTCUTS
                        <hr className='py-3'/>
                        <div className='grid grid-cols-3 grid-rows-1 gap-x-3'>
                            {card.map((item) => (
                                <Card key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer/>

        </div>
    );
}

export default Main;
