import './GameDisplay.css'
import badges from '../../assets/badges.json'
import { terminal } from 'virtual:terminal'
import React from 'react'
import { IoTriangle } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";


export default function GameDisplay({ game }) {
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [leftButtonHover, setLeftButtonHover] = React.useState(false)
    const [rightButtonHover, setRightButtonHover] = React.useState(false)
    const [starCount, setStarCount] = React.useState(-1)
    const [stars, setStars] = React.useState(Array(5).fill({filled: "none"}))
    const [savedStarState, setSavedStarState] = React.useState({})
    const scrollerRef = React.useRef(null);

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

    React.useEffect(() => {
        setStars(prev => {
            return prev.map((star, index) => {
                if (index <= starCount) {
                    return {filled: "full"}
                } else {
                    return {filled: "none"}
                }
            })
        })
    }, [starCount])

    
    const gameplayImages = game.gameplayImages.map((image, index) => {
        return (
            <button onClick={() => updateDisplayedImage(index)}>
                <img 
                src={image} 
                alt={`${game.name} image`} 
                key={index}
                className={selectedImage === index ? "img-selected": null}
                ></img>
            </button>
        )
    })

    function updateStars(index) {
        setStarCount(index)
        setSavedStarState(index)
    }

    function starSectionHover() {
        setSavedStarState(starCount)
    }

    function starHover(index) {
        setStarCount(index)
    }

    function endStarSectionHover() {
        updateStars(savedStarState)
    }

    const starsElements = stars.map((star, index) => {
        if (star.filled === "none") {
            return <button className="star" 
                onClick={() => updateStars(index)} 
                onMouseEnter={() => starHover(index)}
                key={index}
                >
                    <IoStarOutline size={35} color={"white"}/></button>
        } else if (star.filled === "half") {
            return <IoStarHalf size={35} color={"gold"}/>
        } else {
            return <button className="star" 
                onClick={() => updateStars(index)} 
                onMouseEnter={() => starHover(index)} 
                key={index}
                >
                    <IoStar size={35} color={"gold"}/></button>
        }
    })

    function buttonHoverEnter(btn) {
        if (btn === 'left') {
            setLeftButtonHover(true)
        } else if (btn === 'right') {
            setRightButtonHover(true)
        }
    }

    function buttonHoverEnd(btn) {
        if (btn === 'left') {
            setLeftButtonHover(false)
        } else if (btn === 'right') {
            setRightButtonHover(false)
        }
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function updateImageByButton(dir) {
        setSelectedImage(prevIndex => clamp(prevIndex + dir, 0, game.gameplayImages.length - 1))
        const el = scrollerRef.current;
        if (!el) return;
        const first = el.children[0];
        const rect = first.getBoundingClientRect();
        const styles = getComputedStyle(el);
        const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;

        const step = rect.width + gap; // one image block
        el.scrollBy({ left: dir * step, behavior: "smooth" });
    }

    return (
        <>
            <h1 className='game-name'>{game.name}</h1>
            <div className='game-display'>
                <div className='game-display-images'>
                    <img className='main-image' src={game.gameplayImages[selectedImage]} alt={`${game.name} logo`}></img>
                    <div className='game-display-image-slider' ref={scrollerRef} tabIndex={0} >
                        {gameplayImages}
                    </div>
                    <div className='game-display-image-scroll' >
                        <button className='game-slide-btn game-slide-btn-left'
                            onMouseEnter={() => buttonHoverEnter('left')}
                            onMouseLeave={() => buttonHoverEnd('left')}
                            onClick={() => updateImageByButton(-1)}
                            aria-label="Scroll left"
                        >
                            <IoTriangle size={10} color={!leftButtonHover ? "#407899" : "#c7e9fdff"} style={{transform:"rotate(90deg)"}}/>
                        </button>
                        <span className='scroll'></span>
                        <button className='game-slide-btn game-slide-btn-right'
                            onMouseEnter={() => buttonHoverEnter('right')}
                            onMouseLeave={() => buttonHoverEnd('right')}
                            onClick={() => updateImageByButton(1)}
                            aria-label="Scroll right"
                        >
                            <IoTriangle size={10} color={!rightButtonHover ? "#407899" : "#c7e9fdff"} style={{transform:"rotate(90deg)"}}/></button>
                    </div>
                </div>
                <div className='game-display-data'>
                    <img src={game.src} alt={`${game.name} logo`}></img>
                    <p>{game.description}</p>
                    <h3>Total Ratings</h3>
                    <div className="star-holder" onMouseEnter={starSectionHover} onMouseLeave={endStarSectionHover}>{starsElements}</div>
                    <a href={game.link} className='game-link' aria-label='link to live version of project'>Play Here!</a>
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