import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../config/env';

function Shop() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

            <div className='flex-1 max-w-5xl w-full mx-auto px-4 pb-12'>
                <h1 className='text-3xl font-bold text-center mb-8'>Shop Items</h1>

                {loading && <p className='text-center text-slate-400'>Loading items...</p>}

                {error && <p className='text-center text-red-400'>{error}</p>}

                {!loading && !error && items.length === 0 && (
                    <p className='text-center text-slate-400'>No items available.</p>
                )}

                {!loading && !error && items.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {items.map((item) => (
                            <div key={item.id} className='rounded-xl border border-slate-700 bg-slate-900/40 p-4'>
                                <p className='text-lg font-semibold text-white'>{item.name}</p>
                                <p className='text-slate-300'>Price: {item.price}</p>
                                <p className='text-slate-300'>Stock: {item.stock}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop;
