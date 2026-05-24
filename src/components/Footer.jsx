import { Link } from 'react-router'

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-divider"></div>
                <div className="footer-main-row">
                    <img src="/logo.svg" className="footer-logo" alt="Steam Logo" />
                    <div className="footer-text">
                        <p>© Patrick Crown-Milliss. All rights reserved. All trademarks are property of their respective owners in Australia and other countries.
                        Rest easy knowing this site does not mine or collect any of your spatial data. :)</p>
                    </div>
                </div>
                <div className="footer-divider"></div>
                <div className="footer-links">
                    <Link to="/store">Store</Link>
                    <span>|</span>
                    <Link to="/store/wishlist">Wishlist</Link>
                    <span>|</span>
                    <Link to="/community">Community</Link>
                    <span>|</span>
                    <Link to="/profile">Profile</Link>
                    <span>|</span>
                    <a href="https://www.linkedin.com/in/patrick-crown-milliss-34537a191/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <span>|</span>
                    <a href="mailto:patrickcrownmilliss@gmail.com">Email</a>
                </div>
            </div>
        </footer>
    )
}