import { useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import badges from '../assets/badges.json'

import Showcase from './Showcase'
import ShowcaseHeader from './ShowcaseHeader'
import ShowcaseContent from './ShowcaseContent'
import ShowcaseContentText from './ShowcaseContentText'
import './Showcase.css'

export default function Profile() {
    const [level, setLevel] = useState(42)
    function increaseLevel() {
        setLevel(prevLevel => prevLevel + 1);
    }

    const badgeElements = badges.map(badge => {
        return (
            <img src={badge.src} key={badge.name} name={badge.name} alt={`${badge.name} logo`}></img>
        )
    })
    
    const { width, height } = useWindowSize()
    const confettiAdapted = <Confetti width={width} height={height}/>
    
    return (
        <main>
            <section id='profile-block'>
                {level == 69 && confettiAdapted}
                <section className="profile-header">
                    <img src='CodingCockatoo.jpg' alt='profile icon'></img>
                    <section className="name-description">
                        <h2>Coding Cockatoo</h2>
                        <p class='name'>Patrick Crown-Milliss <img src="au.gif" alt='aus flag'></img> Sydney, Australia </p>
                        <p>Welcome to my profile! Have a great day friendo.</p>
                    </section>
                    <section className="level">
                        <div>Level <button onClick={increaseLevel}><span class="dot">{level}</span></button></div>
                        <div id='badge'>
                            <img src='UNSW.png' alt='UNSW Logo'></img>
                            <p>
                                Computer Science
                                <p class='xp'>222 XP</p>
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

                        </ShowcaseContent>
                    </Showcase>
                    <Showcase>
                        <ShowcaseHeader>Achievement Showcase</ShowcaseHeader>
                        <ShowcaseContent>

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
                </div>
            </div>
        </main>
    )
}