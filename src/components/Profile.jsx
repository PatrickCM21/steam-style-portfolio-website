import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { Link } from 'react-router'

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
    function increaseLevel() {
        setLevel(prevLevel => prevLevel + 1);
    }

    const badgeElements = badges.map(badge => {
        return (
            <div className='tooltip' key={badge.name}>
                <img className='badge-icon' src={badge.src} key={badge.name} name={badge.name} alt={`${badge.name} logo`}> 
                </img>
                <p className='tooltip-text'>{badge.name}</p>    
            </div>
        )
    })
    const featuredProjectElements = featureProjects.filter(proj => proj.featured === true)
    .map(project => {
        return <div key={project.id}>
            <Link to={`/store/${project.id}`} >
                <img className='showcase-image' src={project.src}></img>
            </Link>
        </div>
    })

    const socialsElements = socials.map(social => {
        return <a href={social.link} key={social.type}>
            <img className="social-img" src={social.src} alt={social.type} ></img>
        </a>
    })

    const skillsElements = skills.map(skill => {
        return (
            <div className='tooltip' key={skill.name}>
                <img className='badge-icon' src={skill.src} key={skill.name} name={skill.name} alt={`${skill.name} icon`}></img>
                <p className='tooltip-text'>{skill.name}</p>    
            </div>
        )
    })

    const achievementsElements = achievements.map(achievement => {
        return (
            <div className='tooltip' key={achievement.name}>
                <img className='achievement-icon' src={achievement.src} key={achievement.name} name={achievement.name} alt={`${achievement.name} icon`}></img>
                <p className='tooltip-text' style={{fontSize: "8px"}}>{achievement.name}</p>    
            </div>
        )
    })

    const workElements = work.map(job => {
        return (
            <ShowcaseGridItem job={job}/>
        )
    })

    const educationElements = education.map(degree => {
        return (
            <ShowcaseGridItem job={degree}/>
        )
    })
    
    const { width, height } = useWindowSize()
    const confettiAdapted = <Confetti width={width} height={height}/>
    
    return (
        <main className='profile'>
            <section id='profile-block'>
                {level == 69 && confettiAdapted}
                <section className="profile-header">
                    <img src='CodingCockatoo.jpg' alt='profile icon'></img>
                    <section className="name-description">
                        <h2>Coding Cockatoo</h2>
                        <p className='name'>Patrick Crown-Milliss <img src="au.gif" alt='aus flag'></img> Sydney, Australia </p>
                        <p>Welcome to my profile! You can contact me anywhere below :)</p>
                        <div className='social-links'>
                            {socialsElements}
                        </div>
                    </section>
                    <section className="level">
                        <div>Level <button onClick={increaseLevel}><span class="dot">{level}</span></button></div>
                        <div id='badge'>
                            <img src='UNSW.png' alt='UNSW Logo'></img>
                            <p>
                                Computer Science
                                <p className='xp'>2027 Grad</p>
                            </p>
                            
                        </div>
                    </section>
                </section>
            </section>
            <div className='content-block'>
                <section className='showcases'>
                    <Showcase>
                        <ShowcaseHeader>Project Showcase</ShowcaseHeader>
                        <ShowcaseContent>
                            <ShowcaseContentText>Some highlights from my projects, click them for more details!</ShowcaseContentText>
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
                            <ShowcaseContent>
                                <ShowcaseGrid>
                                    {educationElements}
                                </ShowcaseGrid>
                        </ShowcaseContent>
                        </ShowcaseContent>
                    </Showcase>
                    <Showcase>
                        <ShowcaseHeader>Achievements</ShowcaseHeader>
                        <ShowcaseContent>
                            <ShowcaseContent>
                                <ShowcaseGrid>
                                    {achievementsElements}
                                </ShowcaseGrid>
                        </ShowcaseContent>
                        </ShowcaseContent>
                    </Showcase>
                </section>
                <div className='side-info-bar'>
                    <label className='work-status'>Currently Looking For Work</label>
                    <div className='badges'>
                        <h4 className='side-info-bar-title'>Technologies <span className='side-info-bar-num'>{badges.length}</span></h4>
                        <div className='badge-list'>
                            {badgeElements}
                        </div>
                    </div>
                    <div className='skills'>
                        <h4 className='side-info-bar-title'>Skills and Interests<span className='side-info-bar-num'>{skills.length}</span></h4>
                        <div className='badge-list'>
                            {skillsElements}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}