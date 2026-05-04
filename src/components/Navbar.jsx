import { useCookies } from 'react-cookie';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logoSBD.png';

export default function Navbar() {
    const [cookies, , removeCookies] = useCookies(["username", "isLoggedIn", "userId", "email"]);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        removeCookies('username', { path: '/' });
        removeCookies('isLoggedIn', { path: '/' });
        removeCookies('userId', { path: '/' });
        removeCookies('email', { path: '/' });
        navigate('/');
    };

    const isLoggedIn = cookies.isLoggedIn === 'true' || cookies.isLoggedIn === true;

    const navLinkClass = ({ isActive }) => 
        `px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
        isActive 
            ? "bg-neonAccent/20 text-neonAccent shadow-[0_0_10px_rgba(62,180,137,0.3)]" 
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    const navLinkLogClass = ({ isActive }) => 
    `px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
    isActive 
        ? "bg-[rgba(180,137,62,0.3)] text-[#D8B2B3] shadow-[0_0_10px_rgba(180,137,62,0.3)]" 
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

    return (
        <div className="sticky top-0 z-50 w-full mb-8">
            <div className="glass-panel mx-auto max-w-5xl mt-4 px-6 flex justify-between items-center h-20">
                <div className="flex items-center gap-8">
                    <NavLink to="/" className="flex items-center gap-3">
                        <span className="text-2xl font-bold bg-gradient-to-r from-neonAccent to-cyan-400 bg-clip-text text-transparent tracking-wide">
                            PiratesWiki
                        </span>
                    </NavLink>
                </div>
                <div className="flex items-center gap-6">
                    <div className='hidden md:flex items-center gap-2'>
                        <NavLink to='/' className={navLinkClass}>Home</NavLink>
                        <NavLink to='/tier-list' className={navLinkClass}>Tier List</NavLink>
                        <NavLink to='/characters' className={navLinkClass}>Characters</NavLink>
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className={navLinkLogClass}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink to='/login' className={navLinkClass}>Login</NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
