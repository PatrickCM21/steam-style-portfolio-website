import './GameDisplay.css'
import badges from '../../assets/badges.json'
import React from 'react'
import { IoTriangle, IoStar, IoStarOutline } from "react-icons/io5"
import { useCookies } from 'react-cookie'
import { Link } from 'react-router'

export default function GameDisplay({ game }) {
    // Map from lowercase technology name (in JSON) to display category name used in Store filter
    const techToCategoryMap = {
        'react': 'React',
        'react native': 'React Native',
        'javascript': 'JavaScript',
        'python': 'Python',
        'sqlite': 'SQLite',
        'chatgpt api': 'ChatGPT API',
        'html': 'HTML/CSS',
        'css': 'HTML/CSS',
    }
    const [cookies, setCookie] = useCookies(['gameStars', 'wishlist'])
    const starsByGame = cookies.gameStars ?? {}
    const wishlistIds = cookies.wishlist ?? []

    const initialGameStars = starsByGame[game.id] ?? -1
    const isWishlisted = wishlistIds.includes(game.id)

    const [selectedImage, setSelectedImage] = React.useState(0)
    const [leftButtonHover, setLeftButtonHover] = React.useState(false)
    const [rightButtonHover, setRightButtonHover] = React.useState(false)
    const [starCount, setStarCount] = React.useState(initialGameStars)
    const [hoverStarCount, setHoverStarCount] = React.useState(0)
    const [starHovering, setStarHovering] = React.useState(false)
    const scrollerRef = React.useRef(null)

    const badgeElements = badges.map(badge => {
        return (
            game.technologies.includes(badge.name.toLowerCase()) && (
                <div className='tech-badge-card' key={badge.name}>
                    <img className='tech-badge-icon' src={badge.src} alt={`${badge.name} logo`} />
                    <div className="tech-badge-info">
                        <span className="tech-badge-title">{badge.name}</span>
                    </div>
                </div>
            )
        )
    })

    function updateDisplayedImage(index) {
        setSelectedImage(index)
    }

    const gameplayImages = game.gameplayImages.map((image, index) => {
        return (
            <button onClick={() => updateDisplayedImage(index)} key={index} className="thumb-btn">
                <img
                    src={image}
                    alt={`${game.name} thumbnail`}
                    className={selectedImage === index ? "img-selected" : ""}
                />
            </button>
        )
    })

    function updateStars(index) {
        setStarCount(index)
        setCookie('gameStars', { ...starsByGame, [game.id]: index }, { path: '/' })
    }

    function toggleWishlist() {
        let updated
        if (isWishlisted) {
            updated = wishlistIds.filter(id => id !== game.id)
        } else {
            updated = [...wishlistIds, game.id]
        }
        setCookie('wishlist', updated, { path: '/' })
    }

    function getReviewLabel(stars) {
        if (stars === -1) return { text: "No User Reviews", class: "none", desc: "Rate this project below to leave a review!" };
        if (stars >= 4) return { text: "Overwhelmingly Positive", class: "overwhelming", desc: "Most users find this project outstanding." };
        if (stars === 3) return { text: "Mostly Positive", class: "positive", desc: "Highly recommended by users." };
        if (stars === 2) return { text: "Mixed", class: "mixed", desc: "Users have varied opinions." };
        return { text: "Mostly Negative", class: "negative", desc: "Users have pointed out issues." };
    }

    const reviewLabel = getReviewLabel(starCount)

    const starsElements = Array(5).fill(0).map((_, index) => {
        const activeIndex = starHovering ? hoverStarCount : starCount
        const isFilled = index <= activeIndex
        return (
            <button
                className="star-btn"
                onClick={() => updateStars(index)}
                onMouseEnter={() => setHoverStarCount(index)}
                key={index}
                aria-label={`Rate ${index + 1} stars`}
            >
                {isFilled ? <IoStar size={24} color={"#ffd700"} /> : <IoStarOutline size={24} color={"#8f98a0"} />}
            </button>
        )
    })

    function updateImageByButton(dir) {
        const nextIndex = Math.min(Math.max(selectedImage + dir, 0), game.gameplayImages.length - 1)
        setSelectedImage(nextIndex)
        const el = scrollerRef.current
        if (!el) return
        const first = el.children[0]
        if (!first) return
        const rect = first.getBoundingClientRect()
        const styles = getComputedStyle(el)
        const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0
        const step = rect.width + gap
        el.scrollBy({ left: dir * step, behavior: "smooth" })
    }

    return (
        <div className="game-details-layout">
            {/* Breadcrumb path */}
            <div className="game-breadcrumbs">
                <Link to="/store">All Projects</Link> &gt; <span>{game.name}</span>
            </div>

            <h1 className='game-name'>{game.name}</h1>

            <div className='game-display-grid'>
                {/* Left Column: Media Player */}
                <div className='game-display-left'>
                    <div className="main-image-container">
                        <img
                            className='main-image'
                            src={game.gameplayImages && game.gameplayImages.length > 0 ? game.gameplayImages[selectedImage] : game.src}
                            alt={`${game.name} gameplay`}
                        />
                    </div>

                    {game.gameplayImages && game.gameplayImages.length > 0 && (
                        <div className="scroller-row-container">
                            <button className='scroll-btn scroll-btn-left'
                                onMouseEnter={() => setLeftButtonHover(true)}
                                onMouseLeave={() => setLeftButtonHover(false)}
                                onClick={() => updateImageByButton(-1)}
                                aria-label="Scroll left"
                            >
                                <IoTriangle size={10} color={leftButtonHover ? "#ffffff" : "#407899"} style={{ transform: "rotate(-90deg)" }} />
                            </button>
                            <div className='game-display-image-slider' ref={scrollerRef} tabIndex={0}>
                                {gameplayImages}
                            </div>
                            <button className='scroll-btn scroll-btn-right'
                                onMouseEnter={() => setRightButtonHover(true)}
                                onMouseLeave={() => setRightButtonHover(false)}
                                onClick={() => updateImageByButton(1)}
                                aria-label="Scroll right"
                            >
                                <IoTriangle size={10} color={rightButtonHover ? "#ffffff" : "#407899"} style={{ transform: "rotate(90deg)" }} />
                            </button>
                        </div>
                    )}

                    {/* Action Block - Play Game Box */}
                    <div className="game-play-block">
                        <div className="play-block-left">
                            <h2>Play {game.name}</h2>
                            <p>Experience the project directly in your browser.</p>
                        </div>
                        <div className="play-block-right">
                            {game.link ? (
                                <a href={game.link} target="_blank" rel="noopener noreferrer" className="play-now-btn">
                                    Play Game
                                </a>
                            ) : (
                                <button className="play-now-btn disabled" disabled>
                                    Coming Soon
                                </button>
                            )}
                        </div>
                    </div>

                    {/* About This Game Section */}
                    <div className="game-about-section">
                        <h2 className="about-section-header">About This Game</h2>
                        <div className="about-section-content">
                            <p>{game.description}</p>
                        </div>
                    </div>

                    {/* System Requirements / Tech Specs */}
                    <div className="system-requirements-section">
                        <h2 className="about-section-header">System Requirements</h2>
                        <div className="sys-req-grid">
                            <div className="sys-req-col">
                                <h3>MINIMUM:</h3>
                                <ul>
                                    <li><strong>OS:</strong> Modern Web Browser (Chrome, Firefox, Safari, Edge)</li>
                                    <li><strong>Processor:</strong> Intel Core i3 or equivalent (Javascript JIT Compiler)</li>
                                    <li><strong>Memory:</strong> 512 MB RAM</li>
                                    <li><strong>Graphics:</strong> WebGL/HTML5 Canvas compatible graphics</li>
                                    <li><strong>Network:</strong> Broadband Internet connection</li>
                                    <li><strong>Storage:</strong> LocalStorage / Cookie support enabled</li>
                                </ul>
                            </div>
                            <div className="sys-req-col">
                                <h3>RECOMMENDED:</h3>
                                <ul>
                                    <li><strong>OS:</strong> Windows 10/11 or macOS Sonoma</li>
                                    <li><strong>Processor:</strong> Apple M1 or Intel Core i5</li>
                                    <li><strong>Memory:</strong> 2 GB RAM</li>
                                    <li><strong>Network:</strong> Broadband Internet connection</li>
                                    <li><strong>Notes:</strong> Enables smooth 60fps animations and full audio support where applicable</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Capsule Metadata */}
                <div className='game-display-right'>
                    <img src={game.src} alt={`${game.name} capsule`} className="right-capsule-img" />

                    <div className="right-meta-details">
                        <div className="right-meta-row">
                            <span className="right-meta-lbl">All Reviews:</span>
                            <span className={`right-meta-val review-${reviewLabel.class}`} title={reviewLabel.desc}>
                                {reviewLabel.text}
                            </span>
                        </div>

                        <div className="right-meta-row">
                            <span className="right-meta-lbl">Release Date:</span>
                            <span className="right-meta-val text-white">Available Now</span>
                        </div>

                        <div className="right-meta-row">
                            <span className="right-meta-lbl">Developer:</span>
                            <span className="right-meta-val text-blue">Patrick Crown-Milliss</span>
                        </div>

                        <div className="right-meta-row">
                            <span className="right-meta-lbl">Publisher:</span>
                            <span className="right-meta-val text-blue">Patrick Crown-Milliss</span>
                        </div>

                        {/* Popular Tags */}
                        <div className="right-tags-block">
                            <span className="right-meta-lbl block mb-6">Popular user-defined tags for this product:</span>
                            <div className="right-tags-list">
                                {game.technologies.map(tech => {
                                    const category = techToCategoryMap[tech.toLowerCase()]
                                    return category ? (
                                        <Link
                                            to={`/store?category=${encodeURIComponent(category)}`}
                                            className="right-tag"
                                            key={tech}
                                            title={`Browse ${category} projects`}
                                        >
                                            {tech}
                                        </Link>
                                    ) : (
                                        <span className="right-tag" key={tech}>{tech}</span>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Wishlist Button Toggle */}
                        <button
                            className={`wishlist-toggle-btn ${isWishlisted ? "in-wishlist" : ""}`}
                            onClick={toggleWishlist}
                        >
                            {isWishlisted ? "✓ In Wishlist" : "+ Add to Wishlist"}
                        </button>
                    </div>

                    {/* Review Ratings Box */}
                    <div className="rating-box-widget">
                        <h3>Would you recommend this project?</h3>
                        <p>Share your rating by clicking on the stars below to simulate leaving a Steam review.</p>
                        <div
                            className="stars-widget-row"
                            onMouseEnter={() => setStarHovering(true)}
                            onMouseLeave={() => {
                                setStarHovering(false)
                                setHoverStarCount(0)
                            }}
                        >
                            {starsElements}
                        </div>
                        {starCount !== -1 && (
                            <div className="rating-status-text">
                                Rating: <strong className={`review-${reviewLabel.class}`}>{reviewLabel.text} ({starCount + 1}/5 ★)</strong>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Technologies Badges list */}
            <div className='game-display-technologies'>
                <h2 className="about-section-header">Steam Badges (Technologies Used)</h2>
                <div className='tech-badge-list'>
                    {badgeElements}
                </div>
            </div>
        </div>
    )
}