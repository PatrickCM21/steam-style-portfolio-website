import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import projects from '../assets/projects.json'
import './Community.css'

// Default mock community content
const initialPosts = [
    {
        id: 'post-1',
        type: 'video',
        title: 'Cockatoo Clicker - World Record Speedrun (100% Cages)',
        author: 'SpeedyCocky',
        avatar: '/CodingCockatoo.jpg',
        src: 'https://images.unsplash.com/photo-1551817958-c115383e9ae9?auto=format&fit=crop&q=80&w=400',
        views: '1,240',
        likes: 42,
        comments: 7,
        gameId: 2,
        desc: 'Watch this insane run where we get 1,000,000 cockatoos in under 3 minutes using the optimized Kookaburra click methodology!'
    },
    {
        id: 'post-2',
        type: 'guide',
        title: 'Guide: How to set up Sushi Cat Discord Bot in 5 mins',
        author: 'GuildMasterCats',
        avatar: '/CodingCockatoo.jpg',
        likes: 184,
        comments: 12,
        gameId: 5,
        desc: 'A complete step-by-step guide to installing Sushi Cat bot, configuring the Pomodoro timer, and adding custom dad jokes.'
    },
    {
        id: 'post-3',
        type: 'review',
        title: 'John Searle would approve!',
        author: 'PhilosophyGrad99',
        avatar: '/CodingCockatoo.jpg',
        recommended: true,
        likes: 56,
        comments: 3,
        gameId: 7,
        desc: 'This AI Dinner application is a brilliant gamified representation of the Chinese Room Argument. The AI reactions feel incredibly genuine and the UX is spot on. 10/10 would debate again!'
    },
    {
        id: 'post-4',
        type: 'review',
        title: 'My fingers are literally cramping',
        author: 'ClickerFanatic',
        avatar: '/CodingCockatoo.jpg',
        recommended: true,
        likes: 29,
        comments: 1,
        gameId: 2,
        desc: 'Unbelievably addictive. I have been clicking for 6 hours straight. Kookaburras are overpowered please nerf in next patch!'
    },
    {
        id: 'post-5',
        type: 'guide',
        title: 'Understanding the Chinese Room AI logic',
        author: 'LogicLover',
        avatar: '/CodingCockatoo.jpg',
        likes: 89,
        comments: 5,
        gameId: 7,
        desc: 'A breakdown of Searle\'s argument and how this React app mocks semantic understanding using modern APIs.'
    },
    {
        id: 'post-6',
        type: 'review',
        title: 'Helped me find three gems in my library!',
        author: 'BacklogSlayer',
        avatar: '/CodingCockatoo.jpg',
        recommended: true,
        likes: 14,
        comments: 0,
        gameId: 4,
        desc: 'The Steam Hidden Gem Finder is extremely fast and found games I totally forgot I bought during the Summer Sale. Amazing utility!'
    }
]

export default function Community() {
    const [posts, setPosts] = useState(() => {
        const stored = localStorage.getItem('community_posts')
        return stored ? JSON.parse(stored) : initialPosts
    })

    const [activeTab, setActiveTab] = useState('all') // 'all', 'videos', 'guides', 'reviews'
    const [selectedGameFilter, setSelectedGameFilter] = useState('All')
    
    // Form fields
    const [formGameId, setFormGameId] = useState(projects[0]?.id || '')
    const [formTitle, setFormTitle] = useState('')
    const [formDesc, setFormDesc] = useState('')
    const [formRecommended, setFormRecommended] = useState(true)
    const [formAuthor, setFormAuthor] = useState('')
    const [formType, setFormType] = useState('review') // 'review', 'guide'

    useEffect(() => {
        localStorage.setItem('community_posts', JSON.stringify(posts))
    }, [posts])

    function handleLike(postId) {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                return { ...post, likes: post.likes + 1 }
            }
            return post
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!formTitle || !formDesc) return

        const newPost = {
            id: `post-${Date.now()}`,
            type: formType,
            title: formTitle,
            author: formAuthor || 'Anonymous Guest',
            avatar: '/CodingCockatoo.jpg',
            likes: 0,
            comments: 0,
            gameId: parseInt(formGameId),
            desc: formDesc,
            ...(formType === 'review' ? { recommended: formRecommended } : {})
        }

        setPosts([newPost, ...posts])
        setFormTitle('')
        setFormDesc('')
        setFormAuthor('')
    }

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesTab = activeTab === 'all' || 
            (activeTab === 'videos' && post.type === 'video') ||
            (activeTab === 'guides' && post.type === 'guide') ||
            (activeTab === 'reviews' && post.type === 'review')

        const matchesGame = selectedGameFilter === 'All' || post.gameId === parseInt(selectedGameFilter)

        return matchesTab && matchesGame
    })

    return (
        <main className="community-page">
            <div className="community-container">
                {/* Header */}
                <div className="community-header">
                    <div className="community-header-title">
                        <h2>Community Hub</h2>
                        <p>Explore reviews, guides, and gameplay discussions around Patrick's projects.</p>
                    </div>
                </div>

                {/* Tabs & Filters Bar */}
                <div className="community-nav-bar">
                    <div className="community-tabs">
                        <button className={`community-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
                        <button className={`community-tab ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => setActiveTab('videos')}>Videos</button>
                        <button className={`community-tab ${activeTab === 'guides' ? 'active' : ''}`} onClick={() => setActiveTab('guides')}>Guides</button>
                        <button className={`community-tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</button>
                    </div>
                    
                    <div className="community-filter">
                        <label>Filter by Project:</label>
                        <select 
                            value={selectedGameFilter} 
                            onChange={(e) => setSelectedGameFilter(e.target.value)}
                            className="community-select"
                        >
                            <option value="All">All Projects</option>
                            {projects.map(proj => (
                                <option key={proj.id} value={proj.id}>{proj.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Split layout: Content grid on the left, interactive form on the right */}
                <div className="community-body">
                    <div className="community-content-grid">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map(post => {
                                const matchedProject = projects.find(p => p.id === post.gameId)
                                return (
                                    <div className="community-card" key={post.id}>
                                        <div className="card-top">
                                            <div className="author-info">
                                                <img src={post.avatar} className="author-avatar" alt="avatar" />
                                                <div>
                                                    <span className="author-name">{post.author}</span>
                                                    <span className="post-game-tag">
                                                        posted in {matchedProject ? matchedProject.name : 'General'}
                                                    </span>
                                                </div>
                                            </div>
                                            {post.type === 'review' && (
                                                <div className={`rec-badge ${post.recommended ? 'yes' : 'no'}`}>
                                                    <span className="thumb-icon">{post.recommended ? '👍' : '👎'}</span>
                                                    <span>{post.recommended ? 'Recommended' : 'Not Recommended'}</span>
                                                </div>
                                            )}
                                            {post.type === 'guide' && (
                                                <div className="rec-badge guide">
                                                    <span>📖 Guide</span>
                                                </div>
                                            )}
                                            {post.type === 'video' && (
                                                <div className="rec-badge video">
                                                    <span>🎥 Video</span>
                                                </div>
                                            )}
                                        </div>

                                        {post.type === 'video' && post.src && (
                                            <div className="card-media">
                                                <img src={post.src} alt={post.title} className="video-thumbnail" />
                                                <span className="play-overlay">▶</span>
                                            </div>
                                        )}

                                        <div className="card-content">
                                            <h3 className="card-title">{post.title}</h3>
                                            <p className="card-desc">{post.desc}</p>
                                        </div>

                                        <div className="card-actions">
                                            <button className="like-btn" onClick={() => handleLike(post.id)}>
                                                💙 {post.likes}
                                            </button>
                                            <span className="comment-count">💬 {post.comments} comments</span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="community-empty">
                                <p>No posts found matching the filters. Be the first to share one!</p>
                            </div>
                        )}
                    </div>

                    {/* Right column: Interactive review/guide writer */}
                    <div className="community-sidebar-form">
                        <div className="form-panel">
                            <h3>Share Your Thoughts</h3>
                            <p>Write a mock Steam review or guide about any project to show it here!</p>
                            
                            <form onSubmit={handleSubmit} className="guestbook-form">
                                <div className="form-group">
                                    <label>Your Name:</label>
                                    <input 
                                        type="text" 
                                        value={formAuthor} 
                                        onChange={(e) => setFormAuthor(e.target.value)}
                                        placeholder="GamerCockatoo"
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Select Project:</label>
                                    <select 
                                        value={formGameId} 
                                        onChange={(e) => setFormGameId(e.target.value)}
                                        className="form-select"
                                    >
                                        {projects.map(proj => (
                                            <option key={proj.id} value={proj.id}>{proj.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Post Type:</label>
                                    <div className="form-radio-row">
                                        <label>
                                            <input 
                                                type="radio" 
                                                checked={formType === 'review'} 
                                                onChange={() => setFormType('review')} 
                                            /> Review
                                        </label>
                                        <label>
                                            <input 
                                                type="radio" 
                                                checked={formType === 'guide'} 
                                                onChange={() => setFormType('guide')} 
                                            /> Guide
                                        </label>
                                    </div>
                                </div>

                                {formType === 'review' && (
                                    <div className="form-group">
                                        <label>Do you recommend this project?</label>
                                        <div className="form-rec-btns">
                                            <button 
                                                type="button" 
                                                className={`rec-btn thumbs-up ${formRecommended ? 'active' : ''}`}
                                                onClick={() => setFormRecommended(true)}
                                            >
                                                👍 Yes
                                            </button>
                                            <button 
                                                type="button" 
                                                className={`rec-btn thumbs-down ${!formRecommended ? 'active' : ''}`}
                                                onClick={() => setFormRecommended(false)}
                                            >
                                                👎 No
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Title:</label>
                                    <input 
                                        type="text" 
                                        value={formTitle} 
                                        onChange={(e) => setFormTitle(e.target.value)}
                                        placeholder={formType === 'review' ? 'e.g. Addictive and fun!' : 'e.g. Guide: 10 tips to beat stage 3'}
                                        required
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description / Review Content:</label>
                                    <textarea 
                                        value={formDesc} 
                                        onChange={(e) => setFormDesc(e.target.value)}
                                        placeholder="Write your review or guide details here..."
                                        required
                                        rows={4}
                                        className="form-textarea"
                                    />
                                </div>

                                <button type="submit" className="form-submit-btn">
                                    Publish to Community
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}