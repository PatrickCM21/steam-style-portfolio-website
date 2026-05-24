import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router'
import projects from '../assets/projects.json'
import './Wishlist.css'

export default function Wishlist() {
    const [cookies, setCookie] = useCookies(['wishlist', 'gameStars'])
    const wishlistIds = cookies.wishlist ?? []
    const starsByGame = cookies.gameStars ?? {}

    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [filterTech, setFilterTech] = useState('All')

    // Find projects in wishlist
    const wishlistedProjects = projects.filter(project => wishlistIds.includes(project.id))

    // Handle Remove from Wishlist
    function removeFromWishlist(id) {
        const updatedWishlist = wishlistIds.filter(item => item !== id)
        setCookie('wishlist', updatedWishlist, { path: '/' })
    }

    // Get all unique technologies for filtering
    const allTechs = ['All', ...new Set(projects.flatMap(p => p.technologies))]

    // Get review rating label
    function getReviewLabel(gameId) {
        const rating = starsByGame[gameId];
        if (rating === undefined || rating === -1) return { text: "Very Positive", class: "positive" };
        if (rating >= 4) return { text: "Overwhelmingly Positive", class: "overwhelming" };
        if (rating === 3) return { text: "Mostly Positive", class: "positive" };
        if (rating === 2) return { text: "Mixed", class: "mixed" };
        return { text: "Mostly Negative", class: "negative" };
    }

    // Filter and Sort
    const processedProjects = wishlistedProjects
        .filter(project => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesTech = filterTech === 'All' || project.technologies.includes(filterTech.toLowerCase())
            return matchesSearch && matchesTech
        })
        .sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name)
            } else if (sortBy === 'id') {
                return a.id - b.id
            } else if (sortBy === 'rating') {
                const ratingA = starsByGame[a.id] ?? 3
                const ratingB = starsByGame[b.id] ?? 3
                return ratingB - ratingA
            }
            return 0
        })

    return (
        <main className="wishlist-page">
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <img src="/CodingCockatoo.jpg" className="wishlist-user-avatar" alt="user avatar" />
                    <div className="wishlist-title-block">
                        <h2>Coding Cockatoo's Wishlist</h2>
                        <p>{wishlistedProjects.length} items on wishlist</p>
                    </div>
                </div>

                {/* Filter and Sort Bar */}
                <div className="wishlist-filter-bar">
                    <div className="filter-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by name..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="wishlist-search"
                        />
                    </div>
                    <div className="filter-selects">
                        <div className="filter-group">
                            <label>Sort by:</label>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="wishlist-select">
                                <option value="name">Name</option>
                                <option value="id">Date Added</option>
                                <option value="rating">Your Rating</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Technology:</label>
                            <select value={filterTech} onChange={(e) => setFilterTech(e.target.value)} className="wishlist-select">
                                {allTechs.map(tech => (
                                    <option key={tech} value={tech}>{tech.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Wishlist Items List */}
                <div className="wishlist-items-list">
                    {processedProjects.length > 0 ? (
                        processedProjects.map(project => {
                            const review = getReviewLabel(project.id)
                            const userRating = starsByGame[project.id] !== undefined ? starsByGame[project.id] + 1 : null;
                            return (
                                <div className="wishlist-item" key={project.id}>
                                    <Link to={`/store/${project.id}`} className="wishlist-item-img-link">
                                        <img src={project.src} alt={project.name} className="wishlist-item-img" />
                                    </Link>
                                    <div className="wishlist-item-details">
                                        <Link to={`/store/${project.id}`} className="wishlist-item-title-link">
                                            <h3>{project.name}</h3>
                                        </Link>
                                        <div className="wishlist-item-meta">
                                            <span className="wishlist-meta-label">Release Date:</span>
                                            <span className="wishlist-meta-value">Available Now</span>
                                        </div>
                                        <div className="wishlist-item-meta">
                                            <span className="wishlist-meta-label">Overall Reviews:</span>
                                            <span className={`wishlist-meta-value review-${review.class}`}>{review.text}</span>
                                            {userRating && (
                                                <span className="wishlist-user-rating-note"> (You: {userRating}/5 ★)</span>
                                            )}
                                        </div>
                                        <div className="wishlist-item-tags">
                                            {project.technologies.map(tech => (
                                                <span className="wishlist-item-tag" key={tech}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="wishlist-item-actions">
                                        <div className="wishlist-item-price-tag">
                                            <div className="price-tag free">
                                                <div className="discount-pct">-100%</div>
                                                <div className="price-details">
                                                    <span className="original-price">$19.99</span>
                                                    <span className="discounted-price">Free</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wishlist-action-buttons">
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="wishlist-btn-play">
                                                    Play Now
                                                </a>
                                            )}
                                            <Link to={`/store/${project.id}`} className="wishlist-btn-details">
                                                Store Page
                                            </Link>
                                            <button onClick={() => removeFromWishlist(project.id)} className="wishlist-btn-remove">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="wishlist-empty">
                            <p>No projects match your criteria or your wishlist is empty.</p>
                            <Link to="/store" className="wishlist-btn-play" style={{ display: 'inline-block', textDecoration: 'none' }}>
                                Go to Store
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}