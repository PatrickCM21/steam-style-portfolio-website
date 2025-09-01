import React from 'react'
import { NavLink, Link } from 'react-router'

export default function Header() {
    const [navOpen, setNavOpen] = React.useState(false);

    function changeSideNav() {
        setNavOpen(prev => !prev);
    }
    return (
        <>
            <div className={`sidebar ${navOpen ? 'is-open' : ""}`}>
                <div id='sidebar-profile'>
                    <Link to='profile'>
                        <img src="CodingCockatoo.jpg" alt='profile picture'></img>
                        <p>Coding Cockatoo</p>
                    </Link>
                </div>
                <NavLink 
                    to='store'
                    className={({isActive}) => isActive ? "side-selected" : null}
                >Store</NavLink>
                <NavLink 
                    to='community'
                    className={({isActive}) => isActive ? "side-selected" : null}
                >Community</NavLink>

            </div>
            { navOpen && <button className='grey-out' onClick={changeSideNav}></button>}
            <header>
                <button onClick={changeSideNav} className="sidebar-btn" >
                    <img src='header_menu_hamburger.png' alt='side bar nav'></img>
                </button>
                <Link to='store'>
                    <img src="logo.svg" alt="logo" id='maets-logo'></img>
                </Link>
                    <nav>
                        <ul>
                            <li className="dropdown">
                                <NavLink 
                                    to="store"
                                    className={({isActive}) => isActive ? "selected" : null}
                                >
                                    <span>STORE</span> <hr></hr>
                                    
                                </NavLink>
                                <div className="dropdown-content">
                                    <Link to="store">Home</Link>
                                    <Link to="store/wishlist">Wishlist</Link>
                                </div>
                            </li>
                            <li className="dropdown">
                                <NavLink 
                                    to="community"
                                    className={({isActive}) => isActive ? "selected" : null}
                                >
                                <span>COMMUNITY</span> <hr></hr>
                                
                                </NavLink>
                                <div className="dropdown-content">
                                    <Link to="community">Videos</Link>
                                </div>
                            </li>
                            
                            <li className="dropdown" >
                                <NavLink 
                                    to="profile"
                                    className={({isActive}) => isActive ? "selected" : null}
                                >
                                <span>PROFILE</span> <hr></hr>
                                </NavLink>
                            </li>
                            
                        </ul>
                    </nav>
                <Link to="profile">
                    <img src="CodingCockatoo.jpg" id='profile' alt='profile picture'></img>
                </Link>
            </header>
        </>
    )
}