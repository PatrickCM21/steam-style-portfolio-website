import React from 'react'
export default function Header() {
    const [navOpen, setNavOpen] = React.useState(false);
    const sideNavbar = React.useRef(null);

    function changeSideNav() {
        setNavOpen(prev => !prev);
    }

    return (
        <>
            <div className={`sidebar ${navOpen ? 'is-open' : ""}`}>
                <div id='sidebar-profile'>
                    <img src="CodingCockatoo.jpg" alt='profile picture'></img>
                </div>
                <a>Store</a>
                <a>Community</a>
            </div>
            { navOpen && <button className='grey-out' onClick={changeSideNav}></button>}
            <header>
                <button onClick={changeSideNav} className="sidebar-btn" >
                    <img src='header_menu_hamburger.png' alt='side bar nav'></img>
                </button>
                <img src="logo.svg" alt="logo" id='maets-logo'></img>
                    <nav>
                        <ul>
                            <li className="dropdown">
                                <span>STORE</span>
                                <div className="dropdown-content">
                                    <a>Home</a>
                                    <a>Wishlist</a>
                                </div>
                            </li>
                            <li className="dropdown">
                                <span>COMMUNITY</span>
                                <div className="dropdown-content">
                                    <a>Comments</a>
                                </div>
                            </li>
                            <li className="dropdown selected" ><a>PROFILE</a> <hr></hr></li>
                        </ul>
                    </nav>
                <img src="CodingCockatoo.jpg" id='profile' alt='profile picture'></img>
            </header>
        </>
    )
}