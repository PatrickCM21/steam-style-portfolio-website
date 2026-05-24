import React from 'react'
import { NavLink, Link } from 'react-router'

export default function Header() {
    const [navOpen, setNavOpen] = React.useState(false);

    function changeSideNav() {
        setNavOpen(prev => !prev);
    }
    return (
        <>
            {/* Top Bar for Desktop */}
            <div className="header-top-bar">
                <div className="header-top-bar-content">
                    <div className="header-top-bar-right">
                        <a 
                            href="/Resume_Patrick_Crown-Milliss.pdf" 
                            className="install-resume-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src="/logo_small.svg" className="install-icon" alt="install icon" />
                            Install Resume
                        </a>
                    </div>
                </div>
            </div>

            <div className={`sidebar ${navOpen ? 'is-open' : ""}`}>
                <div id='sidebar-profile'>
                    <Link to='profile' onClick={changeSideNav}>
                        <img src="/CodingCockatoo.jpg" alt='profile picture'></img>
                        <p>Coding Cockatoo</p>
                    </Link>
                </div>
                <NavLink 
                    to='store'
                    className={({isActive}) => isActive ? "side-selected" : null}
                    onClick={changeSideNav}
                    end
                >STORE</NavLink>
                <NavLink 
                    to='store/wishlist'
                    className={({isActive}) => isActive ? "side-selected" : null}
                    onClick={changeSideNav}
                >WISHLIST</NavLink>
                <NavLink 
                    to='community'
                    className={({isActive}) => isActive ? "side-selected" : null}
                    onClick={changeSideNav}
                >COMMUNITY</NavLink>
                <NavLink 
                    to='profile'
                    className={({isActive}) => isActive ? "side-selected" : null}
                    onClick={changeSideNav}
                >PROFILE</NavLink>
                <a 
                    href="/Resume_Patrick_Crown-Milliss.pdf" 
                    style={{color: '#a3d200', fontWeight: 'bold'}}
                    onClick={(e) => e.stopPropagation()}
                >
                    INSTALL RESUME
                </a>
            </div>
            { navOpen && <button className='grey-out' onClick={changeSideNav}></button>}
            <header>
                <div className="header-nav-container">
                    <button onClick={changeSideNav} className="sidebar-btn" >
                        <img src='/header_menu_hamburger.png' alt='side bar nav'></img>
                    </button>
                    <Link to='store' className="logo-container">
                        <img src="/logo.svg" alt="logo" id='maets-logo'></img>
                    </Link>
                    <nav>
                        <ul>
                            <li className="dropdown">
                                <NavLink 
                                    to="store"
                                    className={({isActive}) => isActive ? "selected" : null}
                                    end
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
                                    <Link to="community">Videos & Guides</Link>
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
                    <div className="header-profile-link">
                        <Link to="profile">
                            <img src="/CodingCockatoo.jpg" id='profile' alt='profile picture'></img>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}