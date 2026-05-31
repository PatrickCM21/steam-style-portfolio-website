import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { Link } from 'react-router'
import { useCookies } from 'react-cookie'

import badges from '../assets/badges.json'
import featureProjects from '../assets/projects.json'
import socials from '../assets/contacts.json'
import skills from '../assets/skills.json'
import work from '../assets/work.json'
import education from '../assets/education.json'
import achievements from '../assets/achievements.json'

import Showcase from './Showcase/Showcase'
import ShowcaseHeader from './Showcase/ShowcaseHeader'
import ShowcaseContent from './Showcase/ShowcaseContent'
import ShowcaseContentText from './Showcase/ShowcaseContentText'
import ShowcaseSlide from './Showcase/ShowcaseSlide';
import ShowcaseGrid from './Showcase/ShowcaseGrid'
import ShowcaseGridItem from './Showcase/ShowcaseGridItem'
import './Showcase/Showcase.css'

export default function Profile() {
    const [level, setLevel] = useState(42)
    const [cookies] = useCookies(['gameStars'])
    const starsByGame = cookies.gameStars ?? {}
    const profileRef = useRef(null)
    const tooltips = useRef([])
    const tooltipsLen = useRef(0)
    const { width, height } = useWindowSize()
 
    tooltips.current = [];
    tooltipsLen.current = 0;
 
    function increaseLevel() {
        setLevel(prevLevel => prevLevel + 1);
    }
 
    useLayoutEffect(() => {
        const profileEl = profileRef.current
        if (!profileEl) return
        const profileRect = profileEl.getBoundingClientRect()

        tooltips.current.filter(Boolean).forEach((itemRef) => {
            const rect = itemRef.getBoundingClientRect()
            if (rect.right > profileRect.right) {
                itemRef.dataset.flip = "right"
            } else if (rect.left < profileRect.left) {
                itemRef.dataset.flip = "left"
            } else {
                delete itemRef.dataset.flip;
            }
        })
    }, [width])

    // Get level background class based on number (Steam style)
    function getLevelClass(lvl) {
        if (lvl < 10) return 'lvl-0'
        if (lvl < 20) return 'lvl-10'
        if (lvl < 30) return 'lvl-20'
        if (lvl < 40) return 'lvl-30'
        if (lvl < 50) return 'lvl-40' // Level 42 starts here (green)
        if (lvl < 60) return 'lvl-50' // Blue
        if (lvl < 70) return 'lvl-60' // Purple
        return 'lvl-70' // Gold
    }

    const badgeElements = badges.map(badge => {
        return (
            <div className='tooltip profile-badge-item' key={badge.name}>
                <img className='badge-icon' src={badge.src} name={badge.name} alt={`${badge.name} logo`} />
                <div className='tooltip-text' ref={(el) => (tooltips.current[tooltipsLen.current++] = el)}>
                    <strong>{badge.name}</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '11px', fontWeight: 'normal' }}>{badge.description}</p>
                </div>
            </div>
        )
    })

    const featuredProjectElements = featureProjects.filter(proj => proj.featured === true)
        .map(project => {
            const rating = starsByGame[project.id];
            return (
                <div key={project.id} className="profile-featured-game-card">
                    <Link to={`/store/${project.id}`} >
                        <img className='showcase-image' src={project.src} alt={project.name}></img>
                    </Link>
                    <div className="game-card-hover-overlay">
                        <span>{project.name}</span>
                        {rating !== undefined && rating !== -1 && (
                            <span className="user-rating-badge">Rated {rating + 1}/5 ★</span>
                        )}
                    </div>
                </div>
            )
        })

    const socialsElements = socials.map(social => {
        return <a href={social.link} key={social.type} target="_blank" rel="noopener noreferrer" className="social-icon-wrapper">
            <img className="social-img" src={social.src} alt={social.type} ></img>
        </a>
    })

    // Skills represented like Steam Friends List!
    const skillsElements = skills.map((skill, index) => {
        // Distribute mock statuses
        const statuses = ['Online', 'In-Game', 'Away', 'Online', 'In-Game']
        const status = statuses[index % statuses.length]
        const statusClass = status.toLowerCase().replace(' ', '-')

        return (
            <div className='profile-friend-row' key={skill.name}>
                <div className={`friend-avatar-wrapper ${statusClass}`}>
                    <img className='friend-avatar' src={skill.src} alt={`${skill.name} icon`} />
                </div>
                <div className="friend-details">
                    <span className="friend-name">{skill.name}</span>
                    <span className={`friend-status ${statusClass}`}>
                        {status === 'In-Game' ? 'In-Game (Coding)' : status}
                    </span>
                </div>
            </div>
        )
    })

    const achievementsElements = achievements.map(achievement => {
        return (
            <div className='tooltip achievement-showcase-item' key={achievement.name}>
                <img className='achievement-icon' src={achievement.src} name={achievement.name} alt={`${achievement.name} icon`}></img>
                <div className='tooltip-text' style={{ fontSize: "14px", maxWidth: "240px", width: "auto" }} ref={(el) => tooltips.current[tooltipsLen.current++] = el}>
                    <strong style={{ fontSize: '15px' }}>Achievement Unlocked</strong>
                    <p style={{ margin: '6px 0 0 0', fontSize: '13px', fontWeight: 'normal' }}>{achievement.name}</p>
                </div>
            </div>
        )
    })

    const workElements = work.map(job => {
        return (
            <ShowcaseGridItem job={job} key={job.role} />
        )
    })

    const educationElements = education.map(degree => {
        return (
            <ShowcaseGridItem job={degree} key={degree.role} />
        )
    })

    const confettiAdapted = <Confetti width={width} height={height} />
    const levelClass = getLevelClass(level)

    return (
        <main className='profile' ref={profileRef}>
            {level === 69 && confettiAdapted}

            {/* Upper Profile Container (Header Banner overlay) */}
            <section id='profile-block'>
                <section className="profile-header">
                    <div className={`profile-pic-container ${levelClass}`}>
                        <img src='/CodingCockatoo.jpg' alt='profile icon' className="profile-main-avatar"></img>
                    </div>
                    <section className="name-description">
                        <h2 className="profile-user-name">Coding Cockatoo</h2>
                        <p className='name'>
                            Patrick Crown-Milliss
                            <img src="/au.gif" alt='aus flag' className="flag-icon" ></img>
                            <span className="location-text">Sydney, Australia</span>
                        </p>
                        <p className="profile-summary"> Hey! I'm an AI-first full-stack developer with a passion for building cool, interactive web experiences, game environments, and everything in between.
                            <br></br>
                            Feel free to contact me anywhere below :)</p>
                        <div className='social-links'>
                            {socialsElements}
                        </div>
                    </section>
                    <section className="level">
                        <div className='level-lbl'>
                            Level
                            <button onClick={increaseLevel} className="level-btn" title="Click to level up!">
                                <span className={`dot ${levelClass}`}>{level}</span>
                            </button>
                        </div>
                        <div id='badge'>
                            <img src='/UNSW.png' alt='UNSW Logo'></img>
                            <div className="badge-info">
                                <span className="badge-title">Computer Science</span>
                                <div className='xp'>2027 Grad</div>
                            </div>
                        </div>
                    </section>
                </section>
            </section>

            {/* Profile Content Columns */}
            <div className='content-block'>
                {/* Left Columns (Showcases) */}
                <section className='showcases'>
                    <Showcase>
                        <ShowcaseHeader>Project Showcase</ShowcaseHeader>
                        <ShowcaseContent>
                            <ShowcaseContentText>
                                {width < 800 ? "Highlights from my projects, tap them for details!" : "Highlights from my projects, click them for details!"}
                            </ShowcaseContentText>
                            <ShowcaseSlide>
                                {featuredProjectElements}
                            </ShowcaseSlide>
                        </ShowcaseContent>
                    </Showcase>

                    <Showcase>
                        <ShowcaseHeader>Work and Volunteering Experience</ShowcaseHeader>
                        <ShowcaseContent>
                            <ShowcaseGrid>
                                {workElements}
                            </ShowcaseGrid>
                        </ShowcaseContent>
                    </Showcase>

                    <Showcase>
                        <ShowcaseHeader>Educational History</ShowcaseHeader>
                        <ShowcaseContent>
                            <ShowcaseGrid>
                                {educationElements}
                            </ShowcaseGrid>
                        </ShowcaseContent>
                    </Showcase>

                    <Showcase>
                        <ShowcaseHeader>Achievements Showcase</ShowcaseHeader>
                        <ShowcaseContent>
                            <div className="profile-achievements-showcase">
                                <div className="achievement-unlocked-grid">
                                    {achievementsElements}
                                </div>
                            </div>
                        </ShowcaseContent>
                    </Showcase>
                </section>

                {/* Right Column (Side-info bar widgets) */}
                <div className='side-info-bar'>
                    <div className="status-widget">
                        <span className="status-indicator"></span>
                        <label className='work-status'>Currently Enjoying Life</label>
                    </div>

                    <div className='badges profile-widget-panel'>
                        <h4 className='side-info-bar-title'>
                            Technologies <span className='side-info-bar-num'>{badges.length}</span>
                        </h4>
                        <div className='profile-badge-list'>
                            {badgeElements}
                        </div>
                    </div>

                    <div className='skills profile-widget-panel'>
                        <h4 className='side-info-bar-title'>
                            Skills & Interests <span className='side-info-bar-num'>{skills.length}</span>
                        </h4>
                        <div className='profile-friends-list'>
                            {skillsElements}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}