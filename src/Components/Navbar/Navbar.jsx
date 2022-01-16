// styles
import './Navbar.css'
// svg
import burgerMenuSVG from '../../assets/svg/icons8-menu.svg'
// routing
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useGlobalContext from '../../Hooks/useGlobalContext';
export default function Navbar() {
    const { isMobileView, setIsToggleMenuOpened } = useGlobalContext();
    const mobileNavLink = () => {
        return(
            <div className='burgerToggle'>
                <img onClick={() => setIsToggleMenuOpened(true)} src={burgerMenuSVG} alt="menu" />
            </div>
        )
    }
    const defaultNavLink = () => {
        return(
            <ul className="linkscontainer">
                <li className="links-text"><Link to="/">Home</Link></li>
                <li className="links-text"><Link to="/About">About</Link></li>
                <li className="links-text"><Link to="/More">More</Link></li>
            </ul>
        )
    }
    return (
        <header className='main-header'>
            <nav>
                <div style={{cursor: 'pointer'}} className="logo-container">
                    <h1><Link style={{color: 'black'}} to="/">Gallery</Link></h1>
                </div>
                <div className="link-container">
                    {isMobileView ? mobileNavLink() : defaultNavLink()}
                </div>
            </nav>
            
        </header>
    )
}
