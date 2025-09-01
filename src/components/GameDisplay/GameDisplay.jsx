import './GameDisplay.css'
import badges from '../../assets/badges.json'
import { terminal } from 'virtual:terminal'
import React from 'react'


export default function GameDisplay({ game }) {
    const [selectedImage, setSelectedImage] = React.useState(0);

    const badgeElements = badges.map(badge => {
        return (
            game.technologies.includes(badge.name.toLowerCase()) && <div className='tooltip' key={badge.name}>
                <img className='badge-icon' src={badge.src} key={badge.name} name={badge.name} alt={`${badge.name} logo`}> 
                </img>
                <p className='tooltip-text'>{badge.name}</p>    
            </div>
        )
    })

    function updateDisplayedImage(index) {
        setSelectedImage(index)
    }
    
    const gameplayImages = game.gameplayImages.map((image, index) => {
        return (
            <button onClick={() => updateDisplayedImage(index)}>
                <img 
                src={image} 
                alt={`${game.name} image`} 
                key={image}
                className={selectedImage === index ? "img-selected": null}
                ></img>
            </button>
        )
    })

    return (
        <>
            <h1 className='game-name'>{game.name}</h1>
            <div className='game-display'>
                <div className='game-display-images'>
                    <img className='main-image' src={game.gameplayImages[selectedImage]} alt={`${game.name} logo`}></img>
                    <div className='game-display-image-slider'>
                        {gameplayImages}
                    </div>
                </div>
                <div className='game-display-data'>
                    <img src={game.src} alt={`${game.name} logo`}></img>
                    <p>{game.description}</p>
                    <p>Total Ratings</p>
                    <span>Stars go here</span>
                </div>
                
            </div>
            <div className='game-display-technologies'>
                <h2>Technologies Used</h2>
                <div className='badge-list'>
                    {badgeElements}
                </div>
            </div>
        </>
    )
}