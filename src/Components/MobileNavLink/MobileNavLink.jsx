// styles
import './MobileNavLink.css';
// routing
import { Link } from 'react-router-dom';
import useGlobalContext from '../../Hooks/useGlobalContext';
export default function MobileNavLink() {
    const { setIsToggleMenuOpened } = useGlobalContext();
    return (
        <div className='mobileViewNavLink'>
            {/* user info */}
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/About">About</Link></li>
                <li><Link to="/More">More</Link></li>
            </ul>

        </div>
    )
}
