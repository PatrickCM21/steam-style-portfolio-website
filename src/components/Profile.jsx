import { useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
export default function Profile() {
    const [level, setLevel] = useState(42)
    function increaseLevel() {
        setLevel(prevLevel => prevLevel + 1);
    }

    
    const { width, height } = useWindowSize()
    const confettiAdapted = <Confetti width={width} height={height}/>
    
    return (
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
    )
}