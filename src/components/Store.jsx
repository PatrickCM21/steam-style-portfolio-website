import projects from '../assets/projects.json'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useCallback, useRef, useState } from 'react'
import { Link } from 'react-router'
import { MdNavigateNext } from "react-icons/md";
import { DotButton, useDotButton } from './Carousel/CarouselButton'


export default function Store() {
    const autoplay = useRef(
        Autoplay(
        { delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true },
        // root node is set later by Embla; no need to pass here unless using a custom root
        )
    );
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [autoplay.current])
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
        autoplay.current.reset();  
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
        autoplay.current.reset();  
    }, [emblaApi])

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const mobileMode = windowSize.width < 800 ? true : false

    const gameElements = projects.map(project => {
        if (!project.featured) return null
        const featuredImages = project.gameplayImages.map((image, index) => {
            if (index > 3) return
            return <img src={image} alt={`${project.name} gameplay - ${index}`}></img>
        })
        return (
            <Link to={`/store/${project.id}`} className='embla__slide'>
                <img src={project.src} alt={project.name} className='slide-main-img'></img>
                <div className='slide-data'>
                    <h2>{project.name}</h2>
                    <div className='slide-gameplay-showcase'>
                        {featuredImages}
                    </div>
                </div>
            </Link>
        )
    })

    const mobileGameElements = projects.map(project => {
        if (!project.featured) return null
        return (
            <Link to={`/store/${project.id}`} className='embla__slide'>
                <img src={project.src} alt={project.name} className='slide-main-img'></img>
            </Link>
        )
    })

    const nonFeaturedGames = projects.map(project => {
        if (project.featured) return null
        return (
            <Link to={`/store/${project.id}`} className='games-list-game'>
                <img src={project.src} alt={project.name} className='game-main-img'></img>
                <div className='slide-data'>
                    <h2>{project.name}</h2>
                </div>
            </Link>
        )
    })


    const dotElements = scrollSnaps.map((el, index) => {
        return (
            <DotButton key={index} className={`embla__dot ${index === selectedIndex ? "embla__dot_selected" : ''}`} onClick={() => onDotButtonClick(index)}></DotButton>
        )

    })

    return (
        <main className='store'>
            <section className='featured'>
                <h3>Featured & Recommended</h3>
                <div id='embla' className="embla" >
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className='embla__container'>
                            {mobileMode ? mobileGameElements : gameElements}
                        </div>  
                    </div>
                    {!mobileMode && <>
                    <button className="embla_button embla__prev" onClick={scrollPrev} key="btn-1"><MdNavigateNext size="70px" color="white" style={{ transform: "rotate(180deg)" }}/></button>
                    <button className="embla_button embla__next" onClick={scrollNext} key="btn-2"><MdNavigateNext size="70px" color="white"/></button>
                    </>}
                </div>
                <div className="embla__dots">
                    {dotElements}
                </div>
            </section>
            <div className='games-list-background'>
                <section className='games-list'>
                    <h3>Other Projects</h3>
                    {nonFeaturedGames}
                </section>
            </div>
        </main>
    )
}