import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

function Main() {
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
            link: "tier-list"
        },
        {
            id: 4,
            title: "Equipment",
            image: "https://picsum.photos/500",
            link: "/"
        },
        {
            id: 5,
            title: "Banners",
            image: "https://picsum.photos/500",
            link: "/"
        },
        {
            id: 6,
            title: "Boss Guide",
            image: "https://picsum.photos/500",
            link: "/"
        }
    ]

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
                        <div className='flex flex-row gap-x-2 text-xl pb-2'> 
                            <i
                                className="fa-solid fa-square pt-1"
                                style={{color: '#02C4BE'}}
                            ></i>
                            SHORTCUTS
                        </div>
                        <hr className='py-3'/>
                        <div className='grid grid-cols-3 grid-rows-1 gap-3'>
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
