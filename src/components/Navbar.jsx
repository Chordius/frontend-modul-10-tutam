import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logoSBD.png';

export default function Navbar() {
    const [cookies, setCookies] = useCookies(["username", "isLoggedIn", "score"]);
    
    const handleLogout = () => {
        setCookies('score', 0, { path: '/' });
        setCookies('isLoggedIn', false, { path: '/' });
    };

    const navLinkClass = ({ isActive }) => 
      `px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
        isActive 
          ? "bg-neonAccent/20 text-neonAccent shadow-[0_0_10px_rgba(62,180,137,0.3)]" 
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`;

    return (
        <div className="sticky top-0 z-50 w-full mb-8">
            <div className="glass-panel mx-auto max-w-5xl mt-4 px-6 flex justify-between items-center h-20">
                <div className="flex items-center gap-8">
                    <NavLink to="/" className="flex items-center gap-3">
                        <img src={logo} alt="logo" className="w-10 h-10" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-neonAccent to-cyan-400 bg-clip-text text-transparent tracking-wide">
                            Jesaya Hamonangan
                        </span>
                    </NavLink>
                </div>
                <div className="flex items-center gap-6">
                    <div className='hidden md:flex items-center gap-2'>
                        <NavLink to='/' className={navLinkClass}>Home</NavLink>
                        <NavLink to='/login' className={navLinkClass}>Login</NavLink>
                        <NavLink to='/characters' className={navLinkClass}>Characters</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
