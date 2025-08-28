export default function Header() {
    return (
        <header>
            <img src="logo.svg" alt="logo" id='maets-logo'></img>
            <navbar>
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
                        <li className="dropdown"><a>PROFILE</a></li>
                    </ul>
                </nav>
            </navbar>
            <img src="CodingCockatoo.jpg" id='profile'></img>
        </header>
    )
}